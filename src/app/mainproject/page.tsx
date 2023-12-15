"use client";

import React from 'react';
import CreateProjectForm from './create_project'
import ViewProjects from './project'
import HeaderHandleLogout from '../../components/headerHandleLogout/headerHandleLogout'; // Путь к компоненту LogoutMenu
export default function Page() {
  // ... ваш код
  
  return (

        <div className="div">
        <HeaderHandleLogout />
        <CreateProjectForm/>
        <ViewProjects/>
        </div>
    
  );
}
