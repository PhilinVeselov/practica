"use client";

import { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    fname: '',
    lname: '',
    password: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState(null); // Состояние для хранения сообщений об ошибках

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://77.73.69.213:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "Почта": formData.email,
          "Имя": formData.fname,
          "Фамилия": formData.lname,
          "Пароль": formData.password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Устанавливаем сообщение об ошибке в состояние
        setError(errorData.message);
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Сбрасываем сообщение об ошибке при изменении данных в форме
    setError(null);
  };

  return (
    <div className="section__regis section">
      <div className="container">
        {!registrationSuccess ? (
          <div className='bloc'>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="Имя" />
              <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Фамилия" />
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
              <button type="submit">Зарегистрироваться</button>
            </form>
            {error && <p>{error}</p>} {/* Отображение сообщения об ошибке */}
          </div>
        ) : (
          <div>
            <p>Регистрация прошла успешно!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
