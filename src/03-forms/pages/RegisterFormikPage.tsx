import { Form, Formik } from "formik";
import * as Yup from "yup";

import "../styles/styles.css";
import { MyTextInput } from "../components/MyTextInput";

export const RegisterFormikPage = () => {
  return (
    <div>
      <h1>Register Formik Page</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password1: "",
          password2: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "El nombre debe ser de tres caracteres o más")
            .max(15, "Máximo 15 caracteres")
            .required("Este campo es requerido"),
          email: Yup.string()
            .email("Revise el formato del correo")
            .required("Este campo es requerido"),
          password1: Yup.string()
            .min(6, "Mínimo 6 caracteres")
            .required("Este campo es requerido"),
          password2: Yup.string()
            .oneOf([Yup.ref("password1")], "Las contraseñas deben ser iguales")
            .required("Este campo es requerido"),
        })}
      >
        {({handleReset}) => (
          <Form>
            <MyTextInput
              label="Nombre"
              name="name"
              type="text"
              placeholder="Joel"
            />
            <MyTextInput
              label="Email Adress"
              name="email"
              type="email"
              placeholder="example@example.com"
            />
            <MyTextInput
              label="Password"
              name="password1"
              type="password"
              placeholder="******"
            />
            <MyTextInput
              label="Repite tu contraseña"
              name="password2"
              type="password"
              placeholder="******"
            />

            <button type="submit">Create</button>
            <button type="button" onClick={handleReset}>
              Reset Form
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
