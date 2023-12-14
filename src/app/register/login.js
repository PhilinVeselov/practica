"use client";
import React, { useState, useEffect } from 'react';
import LogoutMenu from '../mainpage/main'; // Предполагаем, что LogoutMenu - это ваш новый компонент меню

function Loginnform() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://77.73.69.213:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      if (data.access_token) { // Измените здесь на access_token
        localStorage.setItem('token', data.access_token); // И здесь на access_token
        localStorage.setItem('userID', data.user.ID_участника); // Сохранение ID_участника
        console.log('Token and User ID saved in localStorage');
        setLoginSuccess(true);
      } else {
        console.error('Token not received in response');
        setError('Token not received. Please try again.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null);
  };

  return (
    <div className="section__regis section">
      <div className="container">
        {!loginSuccess ? (
          // Форма входа
          <div className='bloc'>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
              <button type="submit">Войти</button>
            </form>
            {error && <p>{error}</p>}
          </div>
        ) : (
          // Новое меню после успешного входа
          <LogoutMenu />
        )}
      </div>
    </div>

  );
}

export default Loginnform;