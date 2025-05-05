import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/auth';
import '../assets/Authorization.scss';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const toggleAuthMode = (): void => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = isLogin
        ? await loginUser(email, password)
        : await registerUser(email, password);

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/parking');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Произошла ошибка');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h2 className='auth-card-title'>PARKING</h2>
        <div className='auth-tabs'>
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Вход
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </button>
        </div>
        <form className='auth-form' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className='auth-error'>{error}</div>}
          <button type='submit' className='auth-button'>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
