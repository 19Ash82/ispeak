use tauri::AppHandle;

#[tauri::command]
#[specta::specta]
pub fn change_groq_api_key_setting(app: AppHandle, api_key: String) -> Result<(), String> {
    let mut settings = crate::settings::get_settings(&app);
    settings.groq_api_key = if api_key.is_empty() {
        None
    } else {
        Some(api_key)
    };
    crate::settings::write_settings(&app, settings);
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn change_groq_model_setting(app: AppHandle, model: String) -> Result<(), String> {
    let mut settings = crate::settings::get_settings(&app);
    settings.groq_model = model;
    crate::settings::write_settings(&app, settings);
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn change_prefer_online_transcription_setting(
    app: AppHandle,
    value: bool,
) -> Result<(), String> {
    let mut settings = crate::settings::get_settings(&app);
    settings.prefer_online_transcription = value;
    crate::settings::write_settings(&app, settings);
    Ok(())
}
