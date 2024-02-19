import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../componentes/NavBar';
import Footer from '../componentes/Footer';

function Account() {
  const [datos, setDatos] = useState([]);
  const [name, setName] = useState('');
  const [tarjetas, setTarjetas] = useState([]);
  const [nuevaTarjeta, setNuevaTarjeta] = useState({ numero: '', tipo: '' });

  const obtenerTarjetas = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        console.error('No se encontró información del usuario en el almacenamiento local');
        return;
      }
      const userId = userData.id;
      
      const response = await axios.get('http://localhost:9090/FullCalendar/public/api/tarjetas');
      if (response.status === 200) {
        const userTarjetas = response.data.filter(tarjeta => tarjeta.user_id === userId);
        setTarjetas(userTarjetas);
        if (userTarjetas.length > 0) {
          setSelectedTarjeta(userTarjetas[0].id);
        }
      }
    } catch (error) {
      console.error('Error al obtener las tarjetas del usuario:', error.message);
    }
  };

  const handleLogout = () => {
    // Eliminar el usuario del almacenamiento local
    localStorage.removeItem('user');
    // Redireccionar al usuario a la página de inicio de sesión
    window.location.href = '/Login';
  };

  
  const obtenerReservas = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        console.error('No se encontró información del usuario en el almacenamiento local');
        return;
      }
      const userId = userData.id;
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:9090/FullCalendar/public/api/mostrar');
      if (response.status === 200) {
        // Accede a la propiedad 'user' del objeto 'response.data'
        const reservas = response.data.user;
        
        // Filtra las reservas por 'user_id'
        const userReservas = reservas.filter(reserva => reserva.user_id === userId);
        
        // Actualiza el estado con las reservas filtradas
        setDatos(userReservas);
      }
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };
  
  
  const [mostrarCuenta, setMostrarCuenta] = useState(false);
  useEffect(() => {
    // Verificar si hay una sesión activa
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      // Si hay una sesión activa, redirigir al usuario a la página de cuenta
      window.location.href = '/Login';
    }

    // Simulación de carga o transición para mostrar el componente
    setTimeout(() => {
        setMostrarCuenta(true);
      }, 0); // Tiempo de espera en milisegundos

    const obtenerNombreUsuario = () => {
      const nombre = localStorage.getItem('name');
      setName(nombre);
    };

    
    obtenerNombreUsuario();
    obtenerReservas();
    obtenerTarjetas();
  }, []);

  const BorrarReserva = (id) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:9090/FullCalendar/public/api/borrar?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => obtenerReservas())
      .catch((error) => {
        console.error('Error al eliminar la reserva:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarjeta({ ...nuevaTarjeta, [name]: value });
  };

  const agregarTarjeta = () => {
    // Obtener el usuario del almacenamiento local
    const userString = localStorage.getItem('user');
    const userObject = JSON.parse(userString);
  
    // Verificar si se encontró el usuario en el almacenamiento local
    if (userObject && userObject.id) {
      // Obtener el token del almacenamiento local
      const token = localStorage.getItem('token');
  
      // Agregar el user_id al objeto de nuevaTarjeta
      const nuevaTarjetaConUserId = {
        ...nuevaTarjeta,
        user_id: userObject.id // Agregar el id del usuario
      };
  
      // Realizar la solicitud POST para crear la tarjeta
      axios
        .post('http://localhost:9090/FullCalendar/public/api/tarjetas', nuevaTarjetaConUserId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => obtenerTarjetas())
        .catch((error) => {
          console.error('Error al agregar la tarjeta:', error);
        });
    } else {
      console.error('No se encontró el ID del usuario en el almacenamiento local');
    }
  };
  

  const eliminarTarjeta = (id) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:9090/FullCalendar/public/api/tarjetas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => obtenerTarjetas())
      .catch((error) => {
        console.error('Error al eliminar la tarjeta:', error);
      });
  };

  return (
    <>
      <NavBar />
      <br/><br/><br/><br/><br/><br/>
      <div className={`divCuenta ${mostrarCuenta ? 'mostrar' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <div>
          
          <div className="text-center mb-4">
            <p className="text-2xl font-semibold">Bienvenido, aquí puedes ver tus reservas:</p>
          </div>
          
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
            Cerrar Sesión
          </button>

          <br/><br/>

          {datos.length === 0 ? (
            <div className="text-center bg-red-300 bg-opacity-60 rounded-3xl p-4">
              <p className="text-3xl font-bold overflow-hidden">¡Vaya! Parece que aún no has realizado ninguna reserva</p>
              <Link to="/Reservar" className="text-purple-400 underline">Haz clic aquí para hacer una</Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full">
                <thead className="rounded-t-lg">
                  <tr>
                    <th className="px-4 py-2 border-5 border-white">Fecha</th>
                    <th className="px-4 py-2 border-5 border-white">Nombre</th>
                    <th className="px-4 py-2 border-5 border-white">Email</th>
                    <th className="px-4 py-2 border-5 border-white">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.map((user, index) => (
                    <tr key={index}>
                      <td className="border-5 border-white px-4 py-2">{user.fecha}</td>
                      <td className="border-5 border-white px-4 py-2">{user.Nombre}</td>
                      <td className="border-5 border-white px-4 py-2">{user.Email}</td>
                      <td>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => BorrarReserva(user.id)}
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className='divtarjetas'>
          <br/><br/><hr/><br/>

          <p className='text-2xl mb-5'>Añadir nueva tarjeta:</p>
          <div>
            <input
              type="number"
              name="numero"
              placeholder="Número de Tarjeta"
              value={nuevaTarjeta.numero}
              onChange={handleChange}
              className="border border-gray-400 rounded-md px-3 py-2 mr-2 text-center"
            />
            <select
              name="tipo"
              value={nuevaTarjeta.tipo}
              onChange={handleChange}
              className="border border-gray-400 rounded-md px-3 py-2 mr-2 text-center"
            >
              <option value="">Seleccionar tipo</option>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
            </select>
            <button
              onClick={agregarTarjeta}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Añadir Tarjeta
            </button>
          </div>

          <br/><br/>

          <p className='text-2xl mb-5'>Mis tarjetas guardadas:</p>
          {tarjetas.length > 0 ? (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full">
                <thead className="rounded-t-lg">
                  <tr>
                    <th className="px-4 py-2 border-5 border-white">Número de Tarjeta</th>
                    <th className="px-4 py-2 border-5 border-white">Tipo</th>
                    <th className="px-4 py-2 border-5 border-white">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tarjetas.map((tarjeta, index) => (
                    <tr key={index}>
                      <td className="border-5 border-white px-4 py-2">{tarjeta.numero}</td>
                      <td className="border-5 border-white px-4 py-2">{tarjeta.tipo}</td>
                      <td className="border-5 border-white px-4 py-2">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => eliminarTarjeta(tarjeta.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center bg-red-300 bg-opacity-60 rounded-3xl p-4">
              <p className="text-3xl font-bold overflow-hidden">No hay tarjetas actualmente</p>
            </div>
          )}
        </div>
      </div>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer />
    </>
  );
}

export default Account;
