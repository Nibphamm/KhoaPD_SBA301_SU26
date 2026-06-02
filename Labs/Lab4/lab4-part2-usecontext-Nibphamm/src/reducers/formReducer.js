/**
 * formReducer.js – Reducer quản lý form đăng ký (Bài 3)
 *
 * Import: import { validateField } from '../utils/validators'
 *
 * TODO 1: Khai báo initialState
 *         {
 *           values:  { fullName: '', email: '', password: '', confirmPassword: '' },
 *           errors:  { fullName: '', email: '', password: '', confirmPassword: '' },
 *           touched: { fullName: false, email: false, password: false, confirmPassword: false },
 *           status: 'idle'   // 'idle' | 'submitting' | 'success' | 'error'
 *         }
 *
 * TODO 2: Viết formReducer(state, action) xử lý 4 action:
 *
 *   'CHANGE' – { field, value }
 *     → Cập nhật values[field]
 *     → Nếu touched[field] === true: validate lại field đó
 *     → Nếu field === 'password' và touched.confirmPassword: validate lại confirmPassword
 *
 *   'BLUR' – { field }
 *     → Đánh dấu touched[field] = true
 *     → Validate field đó và cập nhật errors[field]
 *
 *   'VALIDATE_ALL'
 *     → Validate tất cả fields, cập nhật errors và touched
 *     → Nếu có lỗi: status = 'error'
 *
 *   'SET_STATUS' – { status }
 *     → Cập nhật status
 *
 *   'RESET'
 *     → Trả về initialState
 *
 * Export: formReducer (default hoặc named), initialState
 */

import { validateField } from "../utils/validators"

export const initialState = {
	values: { fullName: "", email: "", password: "", confirmPassword: "" },
	errors: { fullName: "", email: "", password: "", confirmPassword: "" },
	touched: {
		fullName: false,
		email: false,
		password: false,
		confirmPassword: false,
	},
	status: "idle",
}

export function formReducer(state, action) {
	switch (action.type) {
		case "CHANGE": {
			const { field, value } = action
			const values = { ...state.values, [field]: value }
			const errors = { ...state.errors }

			if (state.touched[field]) {
				errors[field] = validateField(field, value, values)
			}

			if (field === "password" && state.touched.confirmPassword) {
				errors.confirmPassword = validateField(
					"confirmPassword",
					values.confirmPassword,
					values
				)
			}

			return { ...state, values, errors }
		}

		case "BLUR": {
			const { field } = action
			const touched = { ...state.touched, [field]: true }
			const errors = {
				...state.errors,
				[field]: validateField(field, state.values[field], state.values),
			}
			return { ...state, touched, errors }
		}

		case "VALIDATE_ALL": {
			const errors = {
				fullName: validateField("fullName", state.values.fullName, state.values),
				email: validateField("email", state.values.email, state.values),
				password: validateField("password", state.values.password, state.values),
				confirmPassword: validateField(
					"confirmPassword",
					state.values.confirmPassword,
					state.values
				),
			}

			const touched = {
				fullName: true,
				email: true,
				password: true,
				confirmPassword: true,
			}

			const hasError = Object.values(errors).some((error) => error)

			return {
				...state,
				errors,
				touched,
				status: hasError ? "error" : state.status,
			}
		}

		case "SET_STATUS": {
			return { ...state, status: action.status }
		}

		case "RESET":
			return initialState

		default:
			return state
	}
}
