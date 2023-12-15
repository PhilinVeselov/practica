"use client";
// Page.js
import React, { useState } from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import HeaderHandleLogout from '../../components/headerHandleLogout/headerHandleLogout';
import RegistrationForm from './register.js';
import LoginForm from './login.js';

export default function Page() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleShowRegistration = () => {
    setShowRegistrationForm(true);
  };

  const handleShowLogin = () => {
    setShowRegistrationForm(false);
  };

  return (
    <div>
      {isUserLoggedIn ? <HeaderHandleLogout /> : <Header />}
      {!isUserLoggedIn && (
        <div className="auth-buttons">
          <button onClick={handleShowLogin}>Войти</button>
          <button onClick={handleShowRegistration}>Зарегистрироваться</button>
        </div>
      )}
      {isUserLoggedIn ? (
        <div>Содержимое для авторизованных пользователей</div>
      ) : showRegistrationForm ? (
        <RegistrationForm />
      ) : (
        <LoginForm setLoginSuccess={setIsUserLoggedIn} />
      )}
      <Footer />
    </div>
  );
}
