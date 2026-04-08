import React from "react";
import { useTranslation } from "react-i18next";
import { type } from "@tauri-apps/plugin-os";
import { Slider } from "../ui/Slider";
import { useSettings } from "../../hooks/useSettings";

interface LargeTextThresholdProps {
  descriptionMode?: "tooltip" | "inline";
  grouped?: boolean;
}

export const LargeTextThreshold: React.FC<LargeTextThresholdProps> = ({
  descriptionMode = "tooltip",
  grouped = false,
}) => {
  const { t } = useTranslation();
  const { settings, updateSetting } = useSettings();

  if (type() !== "linux") return null;

  const handleChange = (value: number) => {
    updateSetting("large_text_threshold", value);
  };

  return (
    <Slider
      value={settings?.large_text_threshold ?? 2000}
      onChange={handleChange}
      min={0}
      max={5000}
      step={500}
      label={t("settings.advanced.largeTextThreshold.title")}
      description={t("settings.advanced.largeTextThreshold.description")}
      descriptionMode={descriptionMode}
      grouped={grouped}
      formatValue={(v) => (v === 0 ? t("common.off") : `${v}`)}
    />
  );
};
