import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, FormHelperText, CircularProgress } from "@mui/material";
import PrimeNumbers from "./FindPrime";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]*$/, "Only alphabets and spaces are allowed")
    .required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  address: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(/^[1-9][0-9]{9}$/, "Phone number is not valid")
    .required("Required"),
  dob: Yup.date().required("Required").nullable(),
});

const MyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    axios
      .post("https://taskserver-production.up.railway.app/users", values)
      .then((response) => {
        console.log(response);
        alert(response.data.name + "'s data stored successfully");
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <h2>Task 1:</h2>
        <PrimeNumbers />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <h2>Task 2:</h2>
        <Formik
          initialValues={{ name: "", email: "", address: "", phone: "", dob: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "500px",
              }}
            >
              <Field name="name">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    error={
                      getIn(form.touched, field.name) &&
                      !!getIn(form.errors, field.name)
                    }
                    helperText={<ErrorMessage name={field.name} />}
                    label="Name"
                  />
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    error={
                      getIn(form.touched, field.name) &&
                      !!getIn(form.errors, field.name)
                    }
                    helperText={<ErrorMessage name={field.name} />}
                    label="Email"
                  />
                )}
              </Field>
              <Field name="address">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    error={
                      getIn(form.touched, field.name) &&
                      !!getIn(form.errors, field.name)
                    }
                    helperText={<ErrorMessage name={field.name} />}
                    label="Address"
                  />
                )}
              </Field>
              <Field name="phone">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    error={
                      getIn(form.touched, field.name) &&
                      !!getIn(form.errors, field.name)
                    }
                    helperText={<ErrorMessage name={field.name} />}
                    label="Phone"
                  />
                )}
              </Field>
              <Field name="dob">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    type="date"
                    error={
                      getIn(form.touched, field.name) &&
                      !!getIn(form.errors, field.name)
                    }
                    helperText={<ErrorMessage name={field.name} />}
                    label="Date of Birth"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              </Field>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
              >
                Submit
              </Button>
              {isSubmitting && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                  <CircularProgress />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
              } 
  
export default MyForm;
  
                        
