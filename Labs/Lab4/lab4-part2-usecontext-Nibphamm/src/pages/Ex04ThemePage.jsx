/**
 * Ex04ThemePage.jsx – Trang bài 4: Theme Switcher
 *
 * TODO: Import ThemeProvider từ '../context/ThemeContext'
 *       Import ThemeNavbar từ '../components/theme/ThemeNavbar'
 *       Import ThemedCard   từ '../components/theme/ThemedCard'
 *       Import ThemedButton từ '../components/theme/ThemedButton'
 *       Import ThemedInput  từ '../components/theme/ThemedInput'
 *
 *       Bọc toàn bộ trang trong <ThemeProvider>.
 *       Render:
 *         <ThemeNavbar />
 *         Một số ThemedCard chứa ThemedButton và ThemedInput để demo giao diện.
 *
 *       Lưu ý: ThemeProvider nên bọc một <div> áp dụng
 *       background = colors.background và color = colors.text từ useTheme().
 *       Tạo component nội bộ ThemePageContent để đọc colors từ context.
 */
import { ThemeProvider, useTheme } from "../context/ThemeContext"
import ThemeNavbar from "../components/theme/ThemeNavbar"
import ThemedButton from "../components/theme/ThemedButton"
import ThemedCard from "../components/theme/ThemedCard"
import ThemedInput from "../components/theme/ThemedInput"

function ThemePageContent() {
  const { colors } = useTheme()

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.background,
        color: colors.text,
        padding: "16px",
      }}
    >
      <ThemeNavbar />
      <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
        <ThemedCard title="Thao tác">
          <div style={{ display: "flex", gap: "8px" }}>
            <ThemedButton>Primary</ThemedButton>
            <ThemedButton variant="outline">Outline</ThemedButton>
          </div>
        </ThemedCard>
        <ThemedCard title="Nhập liệu">
          <ThemedInput placeholder="Nhập nội dung..." />
        </ThemedCard>
        <ThemedCard title="Thông tin">
          <p>Giao diện sẽ thay đổi theo theme bạn chọn.</p>
        </ThemedCard>
      </div>
    </div>
  )
}

export default function Ex04ThemePage() {
  return (
    <ThemeProvider>
      <ThemePageContent />
    </ThemeProvider>
  )
}
