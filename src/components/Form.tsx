import React from 'react';
import * as Yup from 'yup';
import { Button, FormGroup } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';

interface ILogin {
  type: 'login' | 'signup';
}

const FormComponent = ({ type }: ILogin) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Lastname is required')
      .min(3, 'Lastname must be at least 3 characters')
      .max(20, 'Lastname must not exceed 20 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword:
      type !== 'login'
        ? Yup.string()
            .required('Confirm Password is required')
            .oneOf(
              [Yup.ref('password'), null],
              'Confirm Password does not match'
            )
        : Yup.string()
  });

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <>
          <h2>{type.toUpperCase()}</h2>
          <Form>
            <FormGroup className="mt-3">
              <Field
                name="username"
                type="text"
                className="form-control"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </FormGroup>
            <FormGroup className="mt-3">
              <Field
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </FormGroup>
            {type === 'signup' ? (
              <FormGroup className="mt-3">
                <Field
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger"
                />
              </FormGroup>
            ) : (
              <></>
            )}
            <FormGroup className="mt-3 d-flex justify-content-between">
              <Button type="submit" variant="dark">
                {type[0].toUpperCase() + type.slice(1)}
              </Button>
              <Button type="reset" variant="warning">
                Reset
              </Button>
            </FormGroup>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default FormComponent;
