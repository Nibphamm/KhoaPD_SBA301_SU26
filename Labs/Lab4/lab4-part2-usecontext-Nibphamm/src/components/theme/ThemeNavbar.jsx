/**
 * ThemeNavbar.jsx – Thanh chọn theme (Bài 4)
 *
 * Import: import { THEME_MODES, THEME_LABELS } from '../../data/themeConfig'
 *
 * TODO: Dùng useTheme() từ ThemeContext để lấy mode, resolvedTheme, colors, changeMode.
 *       Render 3 nút tương ứng THEME_MODES (light / dark / system).
 *       Highlight nút đang active (mode hiện tại).
 *       Hiển thị resolvedTheme đang được áp dụng.
 *       Áp dụng màu nền và màu chữ từ colors.
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { THEME_LABELS, THEME_MODES } from "../../data/themeConfig"
import { useTheme } from "../../context/ThemeContext"

export default function ThemeNavbar() {
  const { mode, resolvedTheme, colors, changeMode } = useTheme()

  const resolvedIcon =
    resolvedTheme === "dark" ? "🌙" : resolvedTheme === "light" ? "☀️" : "💻"
  const resolvedLabel = resolvedTheme === "dark" ? "Tối" : "Sáng"

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        padding: "12px",
        background: colors.surface,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      {THEME_MODES.map((themeMode) => (
        <button
          key={themeMode}
          type="button"
          onClick={() => changeMode(themeMode)}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: `1px solid ${colors.border}`,
            background: mode === themeMode ? colors.primary : "transparent",
            color: mode === themeMode ? colors.primaryText : colors.text,
            cursor: "pointer",
          }}
        >
          {THEME_LABELS[themeMode]}
        </button>
      ))}
      <span style={{ marginLeft: "auto", color: colors.textMuted }}>
        Đang dùng: {resolvedLabel} {resolvedIcon}
      </span>
    </div>
  )
}
