import React from 'react';

function LogoutMenu() {
  const handleLogout = () => {
    localStorage.clear(); // Очистка данных сессии
    window.location.href = '/'; // Редирект на страницу входа
  };

  return (
        <div className="section__main section">
      <div className="container">
        <div className="menu">
          <nav><a className="nav_main" href="/mainpage">237#</a></nav>
          <nav><a className="nav" href="/mainproject">Проекты</a></nav>
          <nav><a className="nav" href="/profile">Профиль</a></nav>
          <nav><a className="nav" onClick={handleLogout}>Выйти</a></nav>
        </div>
      </div>
    </div>
    
);
}

export default LogoutMenu;
