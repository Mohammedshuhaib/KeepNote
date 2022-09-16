import * as yup from "yup";

export const Registerschema = yup.object().shape({
  name: yup.string().required("Name cannot be empty"),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),

});