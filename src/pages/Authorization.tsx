import React, { useState } from 'react';
import '../assets/Authorization.scss'

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleAuthMode = (): void => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className='auth-card-title'>PARKING</h2>
        <div className="auth-tabs">
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
        <div className="auth-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Пароль" />
          <button className="auth-button">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;