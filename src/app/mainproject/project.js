import React, { useState, useEffect } from 'react';

function ViewProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const response = await fetch('http://77.73.69.213:5000/projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStatusChange = (projectId, newStatus) => {
    // Логика для изменения статуса проекта
  };

  const handleProjectSettings = (projectId) => {
    // Логика для открытия настроек проекта
  };
// Добавляем функцию для изменения статуса проекта
const updateProjectStatus = async (projectId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://77.73.69.213:5000/change_project_status/${projectId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Статус: newStatus }),
      });
  
      if (response.ok) {
        // Здесь вы можете обновить статус в вашем состоянии projects,
        // чтобы он отражал изменения без перезагрузки страницы
        fetchProjects(); // или обновить конкретный проект в массиве
      } else {
        throw new Error('Failed to update project status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // В вашем компоненте отображения проектов
return (
    <div className='project__section section'>
        <div className='container'>
            <h2>Проекты</h2>
      {projects.map(project => (
        <div key={project.ID_проекта} className="project-card">
          <h3>{project.Название_проекта}</h3>
          <p>{project.Описание}</p>
          <select
            value={project.Статус}
            onChange={(e) => updateProjectStatus(project.ID_проекта, e.target.value)}
          >
            <option value="на рассмотрение">На рассмотрение</option>
            <option value="в процессе">В процессе</option>
            <option value="выполнен">Выполнен</option>
            <option value="заморожен">Заморожен</option>
          </select>
          {/* Кнопка для открытия настроек проекта */}
          <button onClick={() => handleProjectSettings(project.ID_проекта)}>
            Настроить
          </button>
        </div>
      ))}
        </div>
      
    </div>
  );
}

export default ViewProjects;
