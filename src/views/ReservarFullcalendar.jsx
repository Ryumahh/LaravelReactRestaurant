import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import NavBar from '../componentes/NavBar';
import Footer from '../componentes/Footer';

const Reservar = () => {
  const [datos, setDatos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [tarjetas, setTarjetas] = useState([]);
  const [selectedTarjeta, setSelectedTarjeta] = useState('');
  const [refReservar, inViewReservar] = useInView({ triggerOnce: true });

  const fetchHorariosDisponibles = async () => {
    try {
      const response = await axios.get('http://localhost:9090/FullCalendar/public/api/horarios-disponibles');
      if (response.status !== 200) {
        throw new Error('No se pudo obtener los datos de horarios disponibles');
      }
      const data = response.data;
      if (data.length > 0) {
        setEventos(data.map(horario => ({
          title: horario.hora.substr(0, 5), // Mostrar solo las primeras 5 letras de la hora (horas y minutos)
          date: `${horario.fecha}T${horario.hora}`,
        })));
        setMostrarCalendario(true); // Activa la transición al mostrar el calendario
      } else {
        console.log('No hay horarios disponibles');
      }
    } catch (error) {
      console.error('Error al obtener los horarios disponibles:', error.message);
    }
  };

  useEffect(() => {
    fetchHorariosDisponibles();
  }, []);

  useEffect(() => {
    if (inViewReservar) {
      document.querySelector('.divreserv').style.opacity = 1;
    }
  }, [inViewReservar]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setNombre(user.name);
      setEmail(user.email);
      // Obtener las tarjetas del usuario
      obtenerTarjetasUsuario(user.id);
    }
  }, []);

  const obtenerTarjetasUsuario = async () => {
    try {
      // Obtener la información del usuario actual desde el almacenamiento local
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        console.error('No se encontró información del usuario en el almacenamiento local');
        return;
      }
      const userId = userData.id;
      
      // Obtener todas las tarjetas
      const response = await axios.get('http://localhost:9090/FullCalendar/public/api/tarjetas');
      if (response.status === 200) {
        // Filtrar las tarjetas para mostrar solo las asociadas al usuario actual
        const userTarjetas = response.data.filter(tarjeta => tarjeta.user_id === userId);
        setTarjetas(userTarjetas);
        // Si el usuario tiene tarjetas, seleccionar la primera tarjeta por defecto
        if (userTarjetas.length > 0) {
          setSelectedTarjeta(userTarjetas[0].id);
        }
      }
    } catch (error) {
      console.error('Error al obtener las tarjetas del usuario:', error.message);
    }
  };
  

  const handleEventDidMount = (eventInfo) => {
    eventInfo.el.style.cursor = 'pointer'; // Cambiar cursor a pointer
    eventInfo.el.addEventListener('click', () => abrirModal(eventInfo.event.startStr)); // Agregar evento click para abrir modal
  };

  const abrirModal = (fecha) => {
    setSelectedDate(fecha);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setSelectedDate('');
    setNombre('');
    setEmail('');
    setSelectedTarjeta('');
  };

  const hacerReserva = async () => {
    try {
      let userId = null; // Inicializar userId como null
  
      // Obtener la información del usuario actual desde el almacenamiento local
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        userId = userData.id; // Asignar el userId si se encuentra información en el almacenamiento local
      }
      
      // Obtener los valores de los inputs
      const nombreInput = nombre;
      const emailInput = email;
      const tarjetaInput = tarjetas.length > 0 ? selectedTarjeta : document.querySelector('input[type="number"]').value;
      
      const response = await axios.post('http://localhost:9090/FullCalendar/public/api/insertar-datos', {
        fecha: selectedDate,
        nombre: nombreInput,
        email: emailInput,
        userId: userId, // Enviar el userId al servidor
        tarjetaCredito: tarjetaInput,
      });
      if (response.status === 200 && response.data.status) {
        alert('Reserva realizada exitosamente.');
        // Actualizar el estado para marcar el horario como ocupado
        const updatedEventos = eventos.map(evento => {
          if (evento.date === selectedDate) {
            evento.color = 'red'; 
          }
          return evento;
        });
        setEventos(updatedEventos);
        cerrarModal();
        location.reload();
      } else {
        throw new Error('Error al hacer la reserva');
      }
    } catch (error) {
      console.error('Error al hacer la reserva:', error.message);
      // Imprimir el mensaje de error completo devuelto por el servidor, si está disponible
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Detalles adicionales del servidor:', error.response.data.message);
      }
      alert('Error al hacer la reserva. Por favor, inténtelo de nuevo más tarde.');
    }
  };
  

  return (
    <>
      <NavBar />
      <br/><br/><br/><br/><br/><br/><br/>

      <div className={`divreserv ${mostrarCalendario ? 'mostrar' : ''}`} ref={refReservar}>
        <h1>Seleccione cuándo desea realizar su reserva</h1>
        <br/><br/>

        <div className="mx-auto max-w-2xl">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={eventos}
            eventDidMount={handleEventDidMount}
            eventContent={renderEventContent}
            locale="es"
            themeSystem="tailwind"
          />
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Reservar para {selectedDate}</h2>
            <form onSubmit={(e) => { e.preventDefault(); hacerReserva(); }}>
              <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
              {tarjetas.length > 0 ? (
                <select value={selectedTarjeta} onChange={(e) => setSelectedTarjeta(e.target.value)}>
                  {tarjetas.map(tarjeta => (
                    <option key={tarjeta.id} value={tarjeta.id}>{tarjeta.numero}</option>
                  ))}
                </select>
              ) : (
                <input type="number" placeholder="Tarjeta de Crédito" value={selectedTarjeta} onChange={(e) => setSelectedTarjeta(e.target.value)} required />
              )}
              <button type="submit" style={{ backgroundColor: '#8E5492', width: '100%' }}>Hacer Reserva</button>
              <button className="close-btn" onClick={cerrarModal} style={{ backgroundColor: '#8E5492', width: '100%' }}>Cerrar</button>
            </form>
          </div>
        </div>
      )}

      <br/><br/>

      <Footer />
    </>
  );
};

// Función para renderizar el contenido del evento
const renderEventContent = (eventInfo) => {
  return (
    <>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </>
  );
};

export default Reservar;
