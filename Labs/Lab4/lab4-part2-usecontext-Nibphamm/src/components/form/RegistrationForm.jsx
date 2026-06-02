/**
 * RegistrationForm.jsx – Form đăng ký với validation (Bài 3)
 *
 * TODO: Dùng useFormContext() từ FormContext để lấy state và dispatch.
 *
 *       Render 4 FormField:
 *         - fullName        label="Họ và tên"
 *         - email           label="Email"           type="email"
 *         - password        label="Mật khẩu"        type="password"
 *         - confirmPassword label="Xác nhận mật khẩu" type="password"
 *
 *       Khi submit (handleSubmit):
 *         1. Dispatch VALIDATE_ALL để hiện toàn bộ lỗi
 *         2. Kiểm tra xem còn lỗi không – nếu có thì return sớm
 *         3. Dispatch SET_STATUS 'submitting'
 *         4. Giả lập API call (setTimeout 1000ms)
 *         5. Dispatch SET_STATUS 'success'
 *
 *       Khi status === 'success': hiển thị thông báo thành công và nút "Đăng ký lại"
 *         - Nút "Đăng ký lại": dispatch RESET
 *
 *       Khi status === 'error': hiển thị banner lỗi phía trên nút submit.
 *
 *       Nút submit: disabled khi status === 'submitting'.
 */
import { useFormContext } from "../../context/FormContext"
import { validateField } from "../../utils/validators"
import FormField from "./FormField"

export default function RegistrationForm() {
  const { state, dispatch } = useFormContext()

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch({ type: "VALIDATE_ALL" })

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

    const hasError = Object.values(errors).some((error) => error)
    if (hasError) return

    dispatch({ type: "SET_STATUS", status: "submitting" })

    setTimeout(() => {
      dispatch({ type: "SET_STATUS", status: "success" })
    }, 1000)
  }

  if (state.status === "success") {
    return (
      <div>
        <p>Đăng ký thành công!</p>
        <button type="button" onClick={() => dispatch({ type: "RESET" })}>
          Đăng ký lại
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField name="fullName" label="Họ và tên" placeholder="Nhập họ và tên" />
      <FormField name="email" label="Email" type="email" placeholder="Nhập email" />
      <FormField
        name="password"
        label="Mật khẩu"
        type="password"
        placeholder="Nhập mật khẩu"
      />
      <FormField
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        type="password"
        placeholder="Nhập lại mật khẩu"
      />

      {state.status === "error" ? <p>Vui lòng kiểm tra lại thông tin.</p> : null}

      <button type="submit" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Đang xử lý..." : "Đăng ký"}
      </button>
    </form>
  )
}
