import React, { useEffect, useContext } from 'react';
import * as Yup from 'yup';
import { Alert, Button, FormGroup, Spinner } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { userLogin, userSignup } from '../../store/action-creators/users';
import { authSlice } from '../../store/reducers/auth';
import { useTranslation, Trans } from 'react-i18next';
import SocketContext from '../../context/SocketContext';

interface ILogin {
  type: 'login' | 'signup';
}

const FormComponent = ({ type }: ILogin) => {
  const { error, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { setError } = authSlice.actions;
  const { t } = useTranslation();
  const { socket } = useContext(SocketContext).SocketState;

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

  useEffect(() => {
    window.setTimeout(() => {
      dispatch(setError(''));
    }, 5000);
  }, [error]);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validationSchema}
      onSubmit={({ password, username }) => {
        if (socket) {
          type === 'login'
            ? dispatch(userLogin(username, password, socket))
            : dispatch(userSignup(username, password, socket));
        }
      }}
    >
      {() =>
        isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <Trans i18nKey={type.toUpperCase()}>
              <h2>{type.toUpperCase()}</h2>
            </Trans>
            <Form>
              <FormGroup className="mt-3">
                <Field
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder={t('Username')}
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
                  placeholder={t('Password')}
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
                    placeholder={t('Confirm Password')}
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
                  <Trans i18nKey={type[0].toUpperCase() + type.slice(1)}>
                    {type[0].toUpperCase() + type.slice(1)}
                  </Trans>
                </Button>
                <Button type="reset" variant="warning">
                  {t('Reset')}
                </Button>
              </FormGroup>
            </Form>
            {error ? (
              <Alert
                variant="danger"
                onClose={() => dispatch(authSlice.actions.setError(''))}
                dismissible
                className="overlay"
              >
                <Alert.Heading>{t('Oh snap! You got an error!')}</Alert.Heading>
                <p>{error}</p>
              </Alert>
            ) : (
              <></>
            )}
          </>
        )
      }
    </Formik>
  );
};

export default FormComponent;
