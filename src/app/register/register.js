import React, { useState } from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    fname: '',
    lname: '',
    password: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState(null);

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
        setError(errorData.message);
        throw new Error(errorData.message);
      }

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
    setError(null);
  };

  return (
    <div className="section__reg">
      <div className="container">
        {!registrationSuccess ? (
          <form className='reg__form' onSubmit={handleSubmit}>
            <FontAwesomeIcon className="card__icon" icon={faUserPlus}></FontAwesomeIcon>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="Имя" />
            <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Фамилия" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
            <div className='form__buttons'>
              <button type="submit">Зарегистрироваться</button>
            </div>
          </form>
        ) : (
          <div>
            <p>Регистрация прошла успешно!</p>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default RegistrationForm;
