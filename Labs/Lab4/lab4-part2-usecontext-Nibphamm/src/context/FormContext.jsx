/**
 * FormContext.jsx – Context quản lý form đăng ký (Bài 3)
 *
 * Import: import { formReducer, initialState } from '../reducers/formReducer'
 *
 * TODO 1: Tạo FormContext bằng createContext()
 *
 * TODO 2: Tạo FormProvider component
 *         - Dùng useReducer(formReducer, initialState)
 *         - Truyền { state, dispatch } vào value của Provider
 *         - Bọc children bên trong Provider
 *
 * TODO 3: Tạo custom hook useFormContext()
 *         - Gọi useContext(FormContext)
 *         - Ném lỗi nếu context là null
 *
 * Export: FormProvider, useFormContext
 */

import { createContext, useContext, useReducer } from "react"
import { formReducer, initialState } from "../reducers/formReducer"

const FormContext = createContext(null)

export function FormProvider({ children }) {
	const [state, dispatch] = useReducer(formReducer, initialState)

	return (
		<FormContext.Provider value={{ state, dispatch }}>
			{children}
		</FormContext.Provider>
	)
}

export function useFormContext() {
	const context = useContext(FormContext)
	if (!context) {
		throw new Error("useFormContext must be used within a FormProvider")
	}
	return context
}
