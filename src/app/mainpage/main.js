import React from 'react';

function LogoutMenu() {
  const handleLogout = () => {
    localStorage.clear(); // Очистка данных сессии
    window.location.href = '/'; // Редирект на страницу входа
  };

  return (
        <><div className="section__main section">
      <div className="container">
        <div className="menu">
          <nav><a className="nav_main" href="/mainpage">237#</a></nav>
          <nav><a className="nav" href="/mainproject">Проекты</a></nav>
          <nav><a className="nav" href="/profile">Профиль</a></nav>
          <nav><a className="nav" onClick={handleLogout}>Выйти</a></nav>
        </div>
      </div>
    </div><div className="section__content section">
        <div className="container">
          <div className="testblock">
            <div className="block1">
              <h1>Lorem ipsum dolor sit</h1>
              <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h2>
            </div>
            <div className="block2">
              <img src="/images/image1.png" alt="" />
            </div>
          </div>
        </div>
      </div><div className="section__cat section">
        <div className="container">
          <div className="card">
            <div className="cards">1</div>
            <div className="cards">1</div>
            <div className="cards">1</div>
          </div>
        </div>
      </div></>
);
}

export default LogoutMenu;



