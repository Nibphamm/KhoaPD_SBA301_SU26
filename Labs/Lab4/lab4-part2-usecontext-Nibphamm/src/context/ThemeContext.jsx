/**
 * ThemeContext.jsx – Context quản lý theme (Bài 4)
 *
 * Import: import { themes, STORAGE_KEY } from '../data/themeConfig'
 *
 * TODO 1: Tạo ThemeContext bằng createContext()
 *
 * TODO 2: Tạo ThemeProvider component
 *         State:
 *         - mode : 'light' | 'dark' | 'system'
 *           → Đọc từ localStorage (STORAGE_KEY) khi khởi tạo, mặc định 'system'
 *         - systemPrefersDark : boolean
 *           → Đọc từ window.matchMedia('(prefers-color-scheme: dark)').matches
 *
 *         useEffect: lắng nghe sự thay đổi OS theme (addEventListener 'change')
 *         Nhớ cleanup (removeEventListener) khi component unmount.
 *
 *         resolvedTheme : tính từ mode
 *           → Nếu mode === 'system' → dùng systemPrefersDark ? 'dark' : 'light'
 *           → Ngược lại → dùng mode
 *
 *         colors : themes[resolvedTheme]
 *
 *         changeMode(newMode):
 *           → setMode(newMode)
 *           → Lưu vào localStorage (STORAGE_KEY)
 *
 *         Dùng useMemo cho value để tránh re-render không cần thiết.
 *         Truyền { mode, resolvedTheme, colors, changeMode } vào Provider.
 *
 * TODO 3: Tạo custom hook useTheme()
 *         - Gọi useContext(ThemeContext)
 *         - Ném lỗi nếu context là null
 *
 * Export: ThemeProvider, useTheme
 */

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { themes, STORAGE_KEY } from "../data/themeConfig"

const ThemeContext = createContext(null)

const getInitialMode = () => {
	if (typeof window === "undefined") return "system"
	return localStorage.getItem(STORAGE_KEY) || "system"
}

const getInitialSystemPrefersDark = () => {
	if (typeof window === "undefined" || !window.matchMedia) return false
	return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function ThemeProvider({ children }) {
	const [mode, setMode] = useState(getInitialMode)
	const [systemPrefersDark, setSystemPrefersDark] = useState(
		getInitialSystemPrefersDark
	)

	useEffect(() => {
		if (!window.matchMedia) return

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
		const handleChange = (event) => setSystemPrefersDark(event.matches)

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", handleChange)
		} else {
			mediaQuery.addListener(handleChange)
		}

		return () => {
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener("change", handleChange)
			} else {
				mediaQuery.removeListener(handleChange)
			}
		}
	}, [])

	const resolvedTheme = mode === "system" ? (systemPrefersDark ? "dark" : "light") : mode
	const colors = themes[resolvedTheme]

	const changeMode = (newMode) => {
		setMode(newMode)
		if (typeof window !== "undefined") {
			localStorage.setItem(STORAGE_KEY, newMode)
		}
	}

	const value = useMemo(
		() => ({ mode, resolvedTheme, colors, changeMode }),
		[mode, resolvedTheme, colors]
	)

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return context
}
