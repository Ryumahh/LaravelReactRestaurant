import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../componentes/NavBar';
import Footer from '../componentes/Footer';

const Register = () => {
  const [mostrarRegister, setMostrarRegister] = useState(false);

  useEffect(() => {
    // Verificar si hay una sesión activa
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // Si hay una sesión activa, redirigir al usuario a la página de cuenta
      window.location.href = '/Cuenta';
    }

    // Simulación de carga o transición para mostrar el componente
    setTimeout(() => {
      setMostrarRegister(true);
    }, 0); // Tiempo de espera en milisegundos
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar el comportamiento por defecto de enviar el formulario
    const nombre = event.target.nombre.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:9090/FullCalendar/public/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Usuario registrado correctamente');
        window.location.href = '/Login'; // Redirige a la vista de inicio de sesión
      } else {
        alert(data.message || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('El correo electrónico que desea utilizar ya se encuentra en uso.');
    }
  };

  return (
    <>
      <NavBar />
      <br/><br/><br/><br/><br/><br/><br/><br/>

      <div className={`divregister ${mostrarRegister ? 'mostrar' : ''}`}>
        <p className="text-2xl">Registrarse</p>
        <br/><br/><br/><br/>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                  Nombre:
                </label>
                <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" id="nombre" type="text" placeholder="Introduce aquí tu Nombre" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email:
                </label>
                <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" id="email" type="email" placeholder="Introduce aquí tu Email" required />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Contraseña:
                </label>
                <input className="shadow appearance-none border border-red rounded-xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-center" id="password" type="password" placeholder="Introduce aquí tu contraseña" required minLength="8" />
              </div>
              <div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-5 px-4 rounded-xl focus:outline-none focus:shadow-outline" type="submit">
                  Registrarse
                </button>
                <Link className="inline-block align-baseline font-bold text-sm text-purple-600 hover:text-purple-700 ml-4" to="/Login">
                  ¿Ya tienes cuenta? <br/> Inicia sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <br/><br/><br/><br/><br/><br/><br/>
      <Footer />
    </>
  );
};

export default Register;
