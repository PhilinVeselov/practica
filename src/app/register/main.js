"use client";
import { useState } from 'react';
import RegistrationForm from './register.js'; // Импортируем RegistrationForm из файла register.js
import LoginForm from './login.js'; // Импортируем LoginForm из файла login.js

export default function Page() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleShowRegistration = () => {
    setShowRegistrationForm(true);
  };

  const handleShowLogin = () => {
    setShowRegistrationForm(false);
  };

  return (
    <div className="section__main section">
      <div className="container">
            <button onClick={handleShowLogin}>Войти</button>
            <button onClick={handleShowRegistration}>Зарегистрироваться</button>
      </div>
      {showRegistrationForm ? <RegistrationForm /> : <LoginForm />}
    </div>
  );
}
