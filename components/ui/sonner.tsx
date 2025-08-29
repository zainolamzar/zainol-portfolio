"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()
  const isDark = theme === "dark"

  // Define colors for light and dark mode
  const colors = {
    successBg: isDark ? "#22c55e" : "#16a34a", // green shades
    successText: "#ffffff",
    errorBg: isDark ? "#f87171" : "#dc2626",   // red shades
    errorText: "#ffffff",
    infoBg: isDark ? "#60a5fa" : "#3b82f6",   // blue shades
    infoText: "#ffffff",
    normalBg: isDark ? "#1e293b" : "#f9fafb", // default popover bg
    normalText: isDark ? "#f1f5f9" : "#111827",
    normalBorder: isDark ? "#334155" : "#d1d5db",
  }

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--success-bg": colors.successBg,
          "--success-text": colors.successText,
          "--error-bg": colors.errorBg,
          "--error-text": colors.errorText,
          "--info-bg": colors.infoBg,
          "--info-text": colors.infoText,
          "--normal-bg": colors.normalBg,
          "--normal-text": colors.normalText,
          "--normal-border": colors.normalBorder,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }