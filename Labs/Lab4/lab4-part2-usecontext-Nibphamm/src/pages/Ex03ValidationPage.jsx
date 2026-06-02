/**
 * Ex03ValidationPage.jsx – Trang bài 3: Validation Form
 *
 * TODO: Import FormProvider từ '../context/FormContext'
 *       Import RegistrationForm từ '../components/form/RegistrationForm'
 *
 *       Bọc toàn bộ nội dung trang trong <FormProvider>.
 *       Render <RegistrationForm /> bên trong Provider.
 */
import { FormProvider } from "../context/FormContext"
import RegistrationForm from "../components/form/RegistrationForm"

export default function Ex03ValidationPage() {
  return (
    <FormProvider>
      <RegistrationForm />
    </FormProvider>
  )
}
