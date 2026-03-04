use anyhow::Result;
use hound::{WavSpec, WavWriter};
use log::debug;
use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION};
use serde::Deserialize;
use std::io::Cursor;

const GROQ_API_BASE: &str = "https://api.groq.com/openai/v1";

#[derive(Deserialize)]
struct TranscriptionResponse {
    text: String,
}

fn encode_samples_to_wav(samples: &[f32]) -> Result<Vec<u8>> {
    let spec = WavSpec {
        channels: 1,
        sample_rate: 16000,
        bits_per_sample: 16,
        sample_format: hound::SampleFormat::Int,
    };

    let mut buffer = Vec::new();
    {
        let cursor = Cursor::new(&mut buffer);
        let mut writer = WavWriter::new(cursor, spec)?;
        for sample in samples {
            let sample_i16 = (sample * i16::MAX as f32) as i16;
            writer.write_sample(sample_i16)?;
        }
        writer.finalize()?;
    }

    Ok(buffer)
}

pub async fn transcribe_audio(
    api_key: &str,
    model: &str,
    audio_samples: &[f32],
    language: Option<&str>,
) -> Result<String> {
    if api_key.is_empty() {
        return Err(anyhow::anyhow!("Groq API key is empty"));
    }

    let wav_bytes = encode_samples_to_wav(audio_samples)?;

    debug!(
        "Groq transcribe: {} samples, {} bytes WAV",
        audio_samples.len(),
        wav_bytes.len()
    );

    let url = format!("{}/audio/transcriptions", GROQ_API_BASE);

    let mut headers = HeaderMap::new();
    headers.insert(
        AUTHORIZATION,
        HeaderValue::from_str(&format!("Bearer {}", api_key))
            .map_err(|_| anyhow::anyhow!("Invalid API key format"))?,
    );

    let file_part = reqwest::multipart::Part::bytes(wav_bytes)
        .file_name("audio.wav")
        .mime_str("audio/wav")?;

    let mut form = reqwest::multipart::Form::new()
        .part("file", file_part)
        .text("model", model.to_string())
        .text("response_format", "json");

    if let Some(lang) = language {
        if lang != "auto" {
            form = form.text("language", lang.to_string());
        }
    }

    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(120))
        .build()?;
    let response = client
        .post(&url)
        .headers(headers)
        .multipart(form)
        .send()
        .await
        .map_err(|e| anyhow::anyhow!("Groq API request failed: {}", e))?;

    let status = response.status();
    if !status.is_success() {
        let error_text = response
            .text()
            .await
            .unwrap_or_else(|_| "Failed to read error response".to_string());
        return Err(anyhow::anyhow!(
            "Groq API error ({}): {}",
            status,
            error_text
        ));
    }

    let resp: TranscriptionResponse = response
        .json()
        .await
        .map_err(|e| anyhow::anyhow!("Failed to parse Groq response: {}", e))?;

    debug!("Groq transcription result: {}", resp.text);
    Ok(resp.text.trim().to_string())
}
