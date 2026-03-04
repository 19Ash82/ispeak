import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../../hooks/useSettings";
import { SettingContainer } from "../../ui/SettingContainer";
import { Dropdown } from "../../ui/Dropdown";
import { Input } from "../../ui/Input";
import { ToggleSwitch } from "../../ui/ToggleSwitch";

const GROQ_MODELS = [
  { value: "whisper-large-v3-turbo", label: "Whisper Large V3 Turbo" },
  { value: "whisper-large-v3", label: "Whisper Large V3" },
];

export const GroqSettings: React.FC = () => {
  const { t } = useTranslation();
  const { getSetting, updateSetting, isUpdating } = useSettings();

  const apiKey = (getSetting("groq_api_key") as string | undefined) ?? "";
  const currentModel =
    (getSetting("groq_model") as string | undefined) ?? "whisper-large-v3-turbo";
  const preferOnline =
    (getSetting("prefer_online_transcription") as boolean | undefined) ?? true;
  const [localApiKey, setLocalApiKey] = useState(apiKey);

  React.useEffect(() => {
    setLocalApiKey(apiKey);
  }, [apiKey]);

  const handleApiKeyBlur = () => {
    if (localApiKey !== apiKey) {
      updateSetting("groq_api_key", localApiKey || null);
    }
  };

  return (
    <>
      <ToggleSwitch
        checked={preferOnline}
        onChange={(value) => updateSetting("prefer_online_transcription", value)}
        isUpdating={isUpdating("prefer_online_transcription")}
        label={t("settings.groq.preferOnline")}
        description={t("settings.groq.preferOnlineDescription")}
        descriptionMode="tooltip"
        grouped={true}
      />

      <SettingContainer
        title={t("settings.groq.apiKey")}
        description={t("settings.groq.description")}
        descriptionMode="tooltip"
        layout="horizontal"
        grouped={true}
      >
        <div className="flex items-center justify-end gap-2">
          <Input
            type="password"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            onBlur={handleApiKeyBlur}
            placeholder={t("settings.groq.apiKeyPlaceholder")}
            variant="compact"
            className="flex-1 w-[280px]"
          />
        </div>
      </SettingContainer>

      <SettingContainer
        title={t("settings.groq.model")}
        description={t("settings.groq.modelDescription")}
        descriptionMode="tooltip"
        layout="horizontal"
        grouped={true}
      >
        <div className="flex items-center justify-end gap-2">
          <Dropdown
            options={GROQ_MODELS}
            selectedValue={currentModel}
            onSelect={(value) => updateSetting("groq_model", value)}
            className="w-[280px]"
          />
        </div>
      </SettingContainer>
    </>
  );
};
