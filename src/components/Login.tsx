import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AUTH_TOKEN from '../model/constants';

export default function Login() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
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

  const handleLogin = useCallback(() => {}, []);

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
