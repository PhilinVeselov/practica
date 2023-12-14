import React, { useState, useEffect } from 'react';

function CreateProjectForm() {
  const [projectData, setProjectData] = useState({
    Название_проекта: '',
    Описание: '',
    ID_роли: '', // ID выбранной роли
  });
  const [availableRoles, setAvailableRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);
  const fetchRoles = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://77.73.69.213:5000/roles', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableRoles(data.roles);
      } else {
        console.error('Failed to fetch roles');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };
  const handleChangeRole = (e) => {
    setProjectData({ ...projectData, ID_роли: e.target.value });
  };
  // Добавьте логику для изменения roles_data здесь, если необходимо

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    const userID = localStorage.getItem('userID');
    if (!token || !userID) {
        // Обработка отсутствия токена или ID пользователя
        return;
      }
    
// Формируем данные проекта, включая roles_data
  const dataToSend = {
    ...projectData,
    roles_data: [
      { ID_роли: projectData.ID_роли, ID_пользователя: userID } // Использование реального ID пользователя
    ]
  };
  try {
    const response = await fetch('http://77.73.69.213:5000/create_project', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

      if (!response.ok) {
        // Обработка ошибок ответа
        const errorData = await response.json();
        console.error('Error creating project:', errorData.message);
        return;
      }

      const data = await response.json();
      console.log('Project created:', data);
      // Дальнейшие действия после успешного создания проекта
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
   <div className='projectcrete__section section'>
     <div className='container'>
        <form onSubmit={handleSubmit}>
      {/* ... другие поля формы */}
      <input
        type="text"
        name="Название_проекта"
        value={projectData.Название_проекта}
        onChange={handleChange}
        placeholder="Название проекта"
      />
      <textarea
        name="Описание"
        value={projectData.Описание}
        onChange={handleChange}
        placeholder="Описание проекта"
      />
      <select
        name="ID_роли"
        value={projectData.ID_роли}
        onChange={handleChangeRole}
      >
        <option value="">Выберите роль</option>
        {availableRoles.map(role => (
          <option key={role.ID_роли} value={role.ID_роли}>{role.Название}</option>
        ))}
      </select>
      <button type="submit">Создать проект</button>
    </form>
     </div>
   </div>
  );
}

export default CreateProjectForm;
