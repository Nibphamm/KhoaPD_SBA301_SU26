/**
 * ThemedButton.jsx – Nút bấm áp dụng màu từ context (Bài 4)
 *
 * Props nhận vào:
 *   - children : ReactNode               – nội dung nút
 *   - onClick  : function (optional)
 *   - variant  : 'primary' | 'outline'   – mặc định 'primary'
 *
 * TODO: Dùng useTheme() từ ThemeContext để lấy colors.
 *       variant='primary'  → background = colors.primary, color = colors.primaryText
 *       variant='outline'  → background = transparent,    color = colors.primary
 *       KHÔNG nhận màu sắc qua props.
 */
import { useTheme } from "../../context/ThemeContext"

export default function ThemedButton({ children, onClick, variant = 'primary' }) {
  const { colors } = useTheme()
  const isPrimary = variant === "primary"

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: "6px",
        border: `1px solid ${colors.primary}`,
        background: isPrimary ? colors.primary : "transparent",
        color: isPrimary ? colors.primaryText : colors.primary,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  )
}
