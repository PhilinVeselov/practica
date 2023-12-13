"use client";

import React, { useState } from 'react';
import RegistrationForm from './register.js';
import Loginnform from './login.js';

export default function Page() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleShowRegistration = () => {
    setShowRegistrationForm(true);
  };

  const handleShowLogin = () => {
    setShowRegistrationForm(false);
  };

  const redirectToOtherPage = () => {
    // Ваша логика перенаправления на другую страницу
    // Например:
    // history.push('/otherPage');
    console.log('Redirecting to other page...');
  };

  return (
    <div className="section__main section">
      <div className="container">
        <div className="menu">
          <nav><a className="nav_main" href="/">237#</a></nav>
          <nav><a className="nav" href="">О нас</a></nav>
          <nav><a className="nav" href="">Поиск проекта</a></nav>
          <nav><a className="nav" href="">Войти</a></nav>
        </div>

        {showRegistrationForm ? <RegistrationForm /> : <Loginnform redirectToOtherPage={redirectToOtherPage} />}

        <div className="tests">
          <a className='test' onClick={handleShowLogin}>Войти</a>
          <a className='test' onClick={handleShowRegistration}>Зарегистрироваться</a>
        </div>
      </div>
    </div>
    
  );
}