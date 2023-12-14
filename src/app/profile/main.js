import React, { useState, useEffect } from 'react';

function ProfileEdit() {
  const [profileData, setProfileData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    // Удалите пароль, если он не должен редактироваться здесь
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    loadProfileData(); 
  }, []);

  const loadProfileData = async () => {
    try {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage
      if (!token) {
        // Если токен отсутствует, перенаправляем пользователя на страницу входа
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://77.73.69.213:5000/my_profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Добавляем токен в заголовок запроса
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setProfileData({
        email: data.user.Почта,
        firstName: data.user.Имя,
        lastName: data.user.Фамилия,
      });
    } catch (error) {
      console.error(error.message);
      setError('Ошибка загрузки данных профиля');
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const response = await fetch('http://77.73.69.213:5000/edit_profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: profileData.email,
          Имя: profileData.firstName,
          Фамилия: profileData.lastName,
          // Убедитесь, что вы отправляете пароль только если он был изменён
          Пароль: profileData.password ? profileData.password : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setError(null);
    } catch (error) {
      console.error(error.message);
      setSuccessMessage(null);
      setError('Ошибка при редактировании профиля');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div>
      <h2>Редактирование профиля</h2>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleEditProfile}>
        <input type="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="firstName" value={profileData.firstName} onChange={handleChange} placeholder="Имя" />
        <input type="text" name="lastName" value={profileData.lastName} onChange={handleChange} placeholder="Фамилия" />
        <input type="password" name="password" value={profileData.password} onChange={handleChange} placeholder="Пароль" />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
