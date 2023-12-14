"use client";
import { useState } from 'react';

function Loginnform() {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://77.73.69.213:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Обработка успешной регистрации
      setRegistrationSuccess(true);

      // Редирект на другую страницу
      window.location.href = '/mainpage'; // Поменяйте '/otherPage' на нужный адрес
    } catch (error) {
      // Обработка ошибок при регистрации
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    // Очистка данных сессии
    localStorage.clear();
    // Редирект на страницу входа
    window.location.href = '/login'; // Поменяйте '/login' на страницу входа
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="section__regis section">
      <div className="container">
        {!registrationSuccess ? (
          <div className='bloc'>
            <form onSubmit={handleSubmit}>
              <input type="text" name="login" value={formData.login} onChange={handleChange} placeholder="Логин" />
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
              <button type="submit">Войти</button>
            </form>
          </div>
        ) : (
          <div>
            <p>Вход успешно выполнен!</p>
            <button onClick={handleLogout}>Выйти</button>
            {/* Дополнительные действия после успешной регистрации */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Loginnform;