/**
 * ThemedInput.jsx – Input áp dụng màu từ context (Bài 4)
 *
 * Props nhận vào:
 *   - placeholder : string (optional)
 *
 * TODO: Dùng useTheme() từ ThemeContext để lấy colors.
 *       Áp dụng colors.background, colors.border, colors.text lên input.
 *       KHÔNG nhận màu sắc qua props.
 */
import { useTheme } from "../../context/ThemeContext"

export default function ThemedInput({ placeholder }) {
  const { colors } = useTheme()

  return (
    <input
      placeholder={placeholder}
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        border: `1px solid ${colors.border}`,
        background: colors.background,
        color: colors.text,
      }}
    />
  )
}
