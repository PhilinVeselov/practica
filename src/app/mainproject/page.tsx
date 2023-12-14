"use client";

import React from 'react';
import LogoutMenu from './main'; // Путь к компоненту LogoutMenu
import CreateProjectForm from './create_project'
import ViewProjects from './project'
export default function Page() {
  // ... ваш код
  
  return (

        <div className="div">
        <LogoutMenu />
        <CreateProjectForm/>
        <ViewProjects/>
        </div>
    
  );
}
