import { Formik, Form } from "formik";
import { MySelect, MyTextInput } from "../components";
import formJson from "../data/custom-form.json";
import * as Yup from "yup";

const initialValues: { [x: string]: any } = {};
const requiredField: { [x: string]: any } = {};

for (const input of formJson) {
  initialValues[input.name] = input.value;

  if (!input.validations) continue;

  let schema = Yup.string();

  for (const rule of input.validations) {
    if (rule.type === "required") {
      schema = schema.required("Éste campo es requerido.");
    }
    if (rule.type === "minLength") {
      schema = schema.min(
        (rule as any).value || 1,
        `Mínimo de ${(rule as any).value} caracteres.`
      );
    }
    if(rule.type === "email"){
        schema = schema.email("Revise el formato del email.")
    }
  }

  requiredField[input.name] = schema;
}

const validationSchema = Yup.object({ ...requiredField });

export const DynamicForm = () => {
  return (
    <div>
      <h1>Dynamic Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form noValidate>
            {formJson.map(({ type, label, name, placeholder, options }) => {
              if (type === "input" || type === "password" || type === "email") {
                return (
                  <MyTextInput
                    key={name}
                    label={label}
                    name={name}
                    type={type as any}
                    placeholder={placeholder}
                  />
                );
              } else if (type === "select") {
                return (
                  <MySelect key={name} label={label} name={name}>
                    <option value="">Select an option</option>
                    {options?.map(({ id, label }) => {
                      return (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      );
                    })}
                  </MySelect>
                );
              }

              throw new Error(`El type: ${type} no es soportado`);
            })}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
