import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        name: e.target.value,
      });
    },
    [formState]
  );

  return (
    <div>
      <h4 className="mv3">{formState.login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={handleChange}
            type="text"
            placeholder="Your name"
          />
        )}
      </div>
    </div>
  );
}
