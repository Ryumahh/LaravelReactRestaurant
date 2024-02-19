import React, { useState, useEffect } from 'react';
import { AiFillHome, AiOutlineFileText, AiOutlineGift, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  // Verificar si hay un tema guardado en localStorage, de lo contrario, usar el tema predeterminado del sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState(savedTheme ? JSON.parse(savedTheme) : prefersDarkMode);
  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    // Guardar el tema seleccionado en localStorage
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  useEffect(() => {
    const body = document.body;
    const nav = document.querySelector('nav');
    const title = document.querySelector('.titNav');
    const links = document.querySelectorAll('.navLinks a');
    const themeButton = document.querySelector('.navLinks button');

    if (title) {
      title.style.color = darkMode ? '#c4c3c1' : 'black';
    }

    if (body && nav && themeButton) {
      body.style.backgroundColor = darkMode ? 'rgba(20, 22, 23, 255)' : '#c4c3c1';
      body.style.color = darkMode ? '#c4c3c1' : '#000000';
      nav.style.backgroundColor = darkMode ? 'rgba(20, 22, 23, 255)' : '#c4c3c1';
      themeButton.style.color = darkMode ? '#c4c3c1' : 'black';
    }

    if (links) {
      links.forEach(link => {
        // Verifica si la URL del enlace coincide con la ubicación actual
        if (link.getAttribute('href') === location.pathname) {
          // Cambia el color a morado si está en la página correspondiente
          link.style.color = '#8E5492';
        } else if (link.classList.contains('special-link') && ['/Login', '/Register', '/Cuenta'].includes(location.pathname)) {
          // Cambia el color a morado para los enlaces especiales solo en estas páginas
          link.style.color = '#8E5492';
        } else {
          link.style.color = darkMode ? '#c4c3c1' : 'black';
        }
      });
    }
  }, [darkMode, location]);

  return (
    <nav className={`p-7 w-full fixed z-10 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/' className={`text-${darkMode ? 'white' : 'black'} flex items-center titNav`}>
          <h1>
            Restaurante Genérico
          </h1>
        </Link>

        <div className="navLinks flex">
          <Link to='/' className={`text-${darkMode ? 'white' : 'black'} flex items-center`}>
            <p>
              <AiFillHome style={{ marginLeft: '30%' }} /> Inicio
            </p>
          </Link>

          <Link to='/Reservar' className={`text-${darkMode ? 'white' : 'black'} flex items-center`}>
            <p>
              <AiOutlineFileText style={{ marginLeft: '35%' }} /> Reservar
            </p>
          </Link>

          <Link to='/Cuenta' className={`text-${darkMode ? 'white' : 'black'} flex items-center special-link`}>
            <p>
              <AiOutlineUser style={{ marginLeft: '33%' }} /> Cuenta
            </p>
          </Link>

          <button onClick={toggleTheme} className={`text-${darkMode ? 'white' : '#c4c3c1'} flex items-center`}>
            {darkMode ? '⚡️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
