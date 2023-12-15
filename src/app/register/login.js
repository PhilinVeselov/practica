// LoginForm.js
import { useState } from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function LoginForm({ setLoginSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://77.73.69.213:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        throw new Error(errorData.message);
      }

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userID', data.user.ID_участника);
        setLoginSuccess(true); // Обновление состояния в компоненте Page
      } else {
        setError('Token not received. Please try again.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="section__reg">
      <form className='reg__form' onSubmit={handleSubmit}>
        <FontAwesomeIcon className="card__icon" icon={faUser}></FontAwesomeIcon>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
        <div className='form__buttons'>
          <button type="submit">Войти</button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginForm;
