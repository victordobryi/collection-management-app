import React, { useEffect, useContext } from 'react';
import * as Yup from 'yup';
import { Button, FormGroup, Spinner } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { userLogin, userSignup } from '../../store/action-creators/users';
import { authSlice } from '../../store/reducers/auth';
import { useTranslation, Trans } from 'react-i18next';
import SocketContext from '../../context/SocketContext';
import { ILogin } from '../../models';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import { RegistrationFormItem } from '../../components';

const RegistrationForm = ({ type }: ILogin) => {
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
          <Spinner animation="border" role="status" />
        ) : (
          <>
            <Trans i18nKey={type.toUpperCase()}>
              <h2>{type.toUpperCase()}</h2>
            </Trans>
            <Form>
              <RegistrationFormItem name="username" placeholder="Username" />
              <RegistrationFormItem
                name="password"
                placeholder="Password"
                type="password"
              />
              {type === 'signup' && (
                <RegistrationFormItem
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                />
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
            {error && (
              <ErrorAlert
                errorMessage={error}
                setError={() => dispatch(authSlice.actions.setError(''))}
              />
            )}
          </>
        )
      }
    </Formik>
  );
};

export default RegistrationForm;
