"use client";

import React from 'react';
import HeaderHandleLogout from '../../components/headerHandleLogout/headerHandleLogout'; // Путь к компоненту LogoutMenu
import ProfileEdit from './main'
export default function Page() {
  // ... ваш код
  
  return (
    <div>
       <HeaderHandleLogout />
        <ProfileEdit />
        
    </div>
      
    
  );
}
