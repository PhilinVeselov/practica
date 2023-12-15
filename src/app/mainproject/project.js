import React, { useState, useEffect } from 'react';
import EditProjectForm from './editprogect';
function ViewProjects() {
  const currentUserID = localStorage.getItem('userID');
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null); // Состояние для отслеживания редактируемого проекта
  const [projectUsers, setProjectUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const updateProjectsWithUsers = async (projectId) => {
    await fetchProjectUsers(projectId);
    setProjects(prevProjects => prevProjects.map(project =>
      project.ID_проекта === projectId
        ? { ...project, users: projectUsers }
        : project
    ));
  };
  
  useEffect(() => {
    fetchProjectsAndRoles();
  }, []);
  useEffect(() => {
    fetchRoles();
    // ... другие вызовы useEffect
  }, []);
  useEffect(() => {
    fetchProjects();
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
        setRoles(data.roles);
      } else {
        throw new Error('Failed to fetch roles');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
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
  const currentUserRole = localStorage.getItem('userRole'); // Пример получения роли пользователя
  const fetchProjectsAndRoles = async () => {
    const token = localStorage.getItem('token');
    try {
      let response = await fetch('http://77.73.69.213:5000/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch projects');
      let projectsData = await response.json();
      const numCurrentUserID = Number(currentUserID);

      // Для каждого проекта запрашиваем роли пользователей
      for (const project of projectsData.projects) {
        response = await fetch(`http://77.73.69.213:5000/project_users/${project.ID_проекта}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch project users');
        const usersData = await response.json();
        project.users = usersData.users;
        // Проверка, является ли текущий пользователь администратором проекта
        project.isAdmin = project.users.some(user =>
          user.Роль === 'Администратор' && Number(user.ID_участника) === numCurrentUserID
        );      }
  
      // Обновите состояние projects с обновленным списком
      setProjects(projectsData.projects);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const deleteProject = async (projectId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://77.73.69.213:5000/delete_project/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete project');
        }

        console.log('Проект удален');
        fetchProjects(); // Обновление списка проектов
    } catch (error) {
        console.error('Error:', error);
    }
};
  const handleStatusChange = (projectId, newStatus) => {
    // Логика для изменения статуса проекта
  };

  const handleProjectSettings = (project) => {
    setEditingProject(project);
    fetchProjectUsers(project.ID_проекта);
  };
  
  
  const handleSaveEditedProject = async (updatedProject) => {
    console.log("Saving project with ID:", updatedProject.ID_проекта); // Добавьте для отладки
    if (!updatedProject.ID_проекта) {
      console.error("Project ID is undefined!");
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://77.73.69.213:5000/edit_project/${updatedProject.ID_проекта}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
  
      // Обновление списка проектов после успешного сохранения
      fetchProjects();
    } catch (error) {
      console.error('Error:', error);
    }
  
    setEditingProject(null); // Закрыть форму после сохранения
  };
  const fetchProjectUsers = async (projectId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://77.73.69.213:5000/project_users/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setProjectUsers(data.users);
        return data.users;
        } else {
        throw new Error('Failed to fetch project users');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
  const removeUserFromProject = async (projectId, userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://77.73.69.213:5000/remove_user_from_project/${projectId}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        console.error('Ошибка удаления пользователя');
    } else {
        console.log('Пользователь удален');
    }
      await updateProjectsWithUsers(projectId);
      fetchProjectUsers(projectId); // Обновление списка пользователей после удаления
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const addUserToProject = async (projectId, userEmail, roleId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://77.73.69.213:5000/add_user_to_project', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              ID_проекта: projectId, 
              Email: userEmail, // Используйте Email вместо ID_пользователя
              ID_роли: roleId 
          })
        });

        if (response.ok) {
          console.log('Пользователь добавлен');
            // Предполагаем, что сервер возвращает обновленный список пользователей
            const result = await response.json();
            setProjectUsers(result.users);
            // Обновление проекта в состоянии с новым списком пользователей
            setProjects(prevProjects => prevProjects.map(p =>
                p.ID_проекта === projectId ? { ...p, users: result.users } : p
            ));
        } else {
            throw new Error('Failed to add user to project');
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
            {project.isAdmin && (
            <button onClick={() => handleProjectSettings(project)}>
              Настроить
            </button>
            
          )}
          </div>
        ))}
        {/* Отображение формы редактирования поверх списка проектов */}
        {editingProject && (
          <>
          <div className="edit-project-modal">
            <EditProjectForm
              project={editingProject}
              users={projectUsers}
              fetchProjectUsers={fetchProjectUsers}
              roles={roles}
              onClose={() => setEditingProject(null)}
              onSave={handleSaveEditedProject}
              removeUserFromProject={removeUserFromProject}
              onAddUser={addUserToProject} // Передача функции addUserToProject
              onDelete={deleteProject} // Передача функции deleteProject

              
            />
          </div>
          <div className="modal-backdrop" onClick={() => setEditingProject(null)} />
  </>
        )}
      </div>
    </div>
  );
  
}

export default ViewProjects;
