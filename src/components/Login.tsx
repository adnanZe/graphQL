import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import AUTH_TOKEN from '../model/constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export default function Login() {
  const navigate = useNavigate();
  // const authToken = localStorage.getItem(AUTH_TOKEN);
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
  });

  const [loginUser] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate('/');
    },
  });

  const [signupUser] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate('/');
    },
  });

  const handleChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        name: e.target.value,
      });
    },
    [formState]
  );

  const handleChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        email: e.target.value,
      });
    },
    [formState]
  );

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        password: e.target.value,
      });
    },
    [formState]
  );

  const handleLogin = useCallback(() => {
    if (formState.login) {
      loginUser();
    } else {
      signupUser();
    }
  }, [formState.login, loginUser, signupUser]);

  const handleToggleLogin = useCallback(() => {
    setFormState({
      ...formState,
      login: !formState.login,
    });
  }, [formState]);

  return (
    <div>
      <h4 className="mv3">{formState.login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={handleChangeName}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={handleChangeEmail}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={handleChangePassword}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          type="button"
          className="pointer mr2 button"
          onClick={handleLogin}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          type="button"
          className="pointer button"
          onClick={handleToggleLogin}
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
}
