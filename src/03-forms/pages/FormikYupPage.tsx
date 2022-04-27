import { useFormik } from "formik";
import * as Yup from "yup";

import "../styles/styles.css";

export const FormikYupPage = () => {
  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Debe tener 15 caracteres o menos")
        .required("Este campo es requerido"),
      lastName: Yup.string()
        .max(10, "Debe tener 10 caracteres o menos")
        .required("Este campo es requerido"),
      email: Yup.string()
        .email("El correo no tiene un formato válido")
        .required("Este campo es requerido"),
    }),
  });

  return (
    <div>
      <h1>Formik Yup</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="firstName">First Name</label>
        <input type="text" {...getFieldProps("firstName")}></input>
        {touched.firstName && errors.firstName && (
          <span>{errors.firstName}</span>
        )}

        <label htmlFor="lastName">Last Name</label>
        <input type="text" {...getFieldProps("lastName")}></input>
        {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}

        <label htmlFor="email">Email Adress</label>
        <input type="email" {...getFieldProps("email")}></input>
        {touched.email && errors.email && <span>{errors.email}</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
