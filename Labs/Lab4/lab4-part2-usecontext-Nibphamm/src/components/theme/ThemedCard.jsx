/**
 * ThemedCard.jsx – Card tái sử dụng áp dụng màu từ context (Bài 4)
 *
 * Props nhận vào:
 *   - title    : string (optional) – tiêu đề card
 *   - children : ReactNode         – nội dung bên trong
 *
 * TODO: Dùng useTheme() từ ThemeContext để lấy colors.
 *       Áp dụng colors.surface, colors.border lên style của card.
 *       KHÔNG nhận màu sắc qua props.
 */
import { useTheme } from "../../context/ThemeContext"

export default function ThemedCard({ title, children }) {
  const { colors } = useTheme()

  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      {title ? <h3>{title}</h3> : null}
      <div>{children}</div>
    </div>
  )
}
