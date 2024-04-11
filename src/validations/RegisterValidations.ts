import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).max(12).required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Please retype your password")
    .oneOf([yup.ref("password")], "passwords do not match."),
});
