"use client";

import { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
    password_dub: '',
    fname: '',
    lname: '',
    city: '',
    mobile: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://77.73.69.213:5000/register', {
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

      const data = await response.json();
      // Обработка успешной регистрации
      console.log(data);
       // Если регистрация успешна, устанавливаем состояние успешной регистрации
       setRegistrationSuccess(true);
    } catch (error) {
      // Обработка ошибок при регистрации
      console.error(error.message);
    }
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
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
              <input type="password" name="password_dub" value={formData.password_dub} onChange={handleChange} placeholder="Повторите пароль" />
              <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="Имя" />
              <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Фамилия" />
              <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Город" />
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Номер телефона" />
              <button type="submit">Зарегистрироваться</button>
            </form>
          </div>
          
        ) : (
          <div>
            <p>Регистрация прошла успешно!</p>
            {/* Дополнительные действия после успешной регистрации */}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;