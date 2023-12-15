import React, { useState, useEffect } from 'react';
import fetchProjectUsers from "./project"
function EditProjectForm({ project, users, roles, onClose, onSave, onAddUser, removeUserFromProject, onDelete }) {
  const [editedProject, setEditedProject] = useState({
    Название_проекта: '',
    Описание: '',
    Статус: ''
  });
  const handleDeleteProject = () => {
    onDelete(project.ID_проекта);
    onClose(); // Закрыть форму после удаления проекта
  };
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  useEffect(() => {
    if (project) {
      setEditedProject({ ...project });
      const fetchUsers = async () => {
        const fetchedUsers = await fetchProjectUsers(project.ID_проекта);
        // Обновление состояния пользователей (если fetchedUsers является валидным массивом)
        if (Array.isArray(fetchedUsers)) {
          setProjectUsers(fetchedUsers);
        }
      };
      fetchUsers();
    }
  }, [project, fetchProjectUsers]);
  useEffect(() => {
    console.log("Received users:", users); // Для отладки
    // ... остальной код
  }, [users]); 
  useEffect(() => {
    if (project) {
      setEditedProject({
        ...project
      });
    }
  }, [project]);

  const handleChange = (e) => {
    setEditedProject({ ...editedProject, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserRole) {
      console.error("Role ID is undefined or incorrect");
      return;
    }
    await onAddUser(project.ID_проекта, newUserEmail, parseInt(newUserRole, 10));
    // Опционально: очистите поля ввода
    setNewUserEmail('');
    setNewUserRole('');
    // Возможно, здесь вам нужно вызвать updateProjectsWithUsers из ViewProjects
  };
  

  

  const handleRemoveUser = async (userId) => {
    await removeUserFromProject(project.ID_проекта, userId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(editedProject);
  };

  return (
    <div className="edit-project-form">
      <h3>Редактирование проекта</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Название_проекта"
          value={editedProject.Название_проекта}
          onChange={handleChange}
          placeholder="Название проекта"
        />
        <textarea
          name="Описание"
          value={editedProject.Описание}
          onChange={handleChange}
          placeholder="Описание проекта"
        />
        <select
          name="Статус"
          value={editedProject.Статус}
          onChange={handleChange}
        >
          <option value="на рассмотрение">На рассмотрение</option>
          <option value="в процессе">В процессе</option>
          <option value="выполнен">Выполнен</option>
          <option value="заморожен">Заморожен</option>
        </select>
        
        <button type="submit">Сохранить изменения</button>
        <button type="button" onClick={onClose}>Отмена</button>
      </form>
      {/* Форма для добавления пользователя */}
      <form onSubmit={handleAddUser}>
        <input 
          type="email" 
          value={newUserEmail} 
          onChange={(e) => setNewUserEmail(e.target.value)} 
          placeholder="Email пользователя"
        />
        <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)}>
          {roles.map(role => (
            <option key={role.ID_роли} value={role.ID_роли}>{role.Название}</option>
          ))}
        </select>
        <button type="submit">Добавить пользователя</button>
        <button type="button" onClick={handleDeleteProject}>Удалить проект</button>
      </form>

      {/* Список пользователей */}
      <ul>
      {users && Array.isArray(users) && users.map(user => (
          <li className='test22' key={user.ID_участника}>
            {user.Имя} {user.Фамилия} - {user.Роль}
            <button onClick={() => handleRemoveUser(user.ID_участника)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditProjectForm;
