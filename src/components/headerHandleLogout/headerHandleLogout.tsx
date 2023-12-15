import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function HeaderHandleLogout() {
  const handleLogout = () => {
    localStorage.clear(); // Очистка данных сессии
    window.location.href = '/'; // Редирект на страницу входа
  };

  return (
    <header className="section__header">
        <a className="header__logo" href="/">237#</a>
        <nav className="header__menu">
            <a href="/mainproject"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>Проекты</a>
            <a href="/profile">Профиль</a>
            <a onClick={handleLogout}>Выйти</a>
        </nav>
    </header>
  );
}

export default HeaderHandleLogout;
