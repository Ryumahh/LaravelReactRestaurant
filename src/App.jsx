import React, { useEffect, useRef } from 'react';
import NavBar from './componentes/NavBar';
import Footer from './componentes/Footer';
import Slider from './componentes/Slider';
import ScrollButton from './componentes/ScrollButton';
import { useInView } from 'react-intersection-observer';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  // Refs para las secciones
  const [ref1, inView1] = useInView({ triggerOnce: true });
  const [ref2, inView2] = useInView({ triggerOnce: true });
  const [ref3, inView3] = useInView({ triggerOnce: true });

  // Imágenes para los sliders
  const images = ['./src/imgs/ImagenMuestra.jpeg', './src/imgs/imgmuestr2.jpeg', './src/imgs/imgmtr3.jpeg'];
  const images2 = ['./src/imgs/imgplato1.jpg', './src/imgs/imgplato2.jpg', './src/imgs/imgplato3.jpg'];
  const images3 = ['./src/imgs/cocin1.jpg', './src/imgs/cocin2.jpg', './src/imgs/cocin3.jpeg'];

  // Efecto para cambiar la opacidad cuando las secciones son visibles
  useEffect(() => {
    if (inView1) {
      document.querySelector('.Section1').style.opacity = 1;
    }
    if (inView2) {
      document.querySelector('.Section2').style.opacity = 1;
    }
    if (inView3) {
      document.querySelector('.Section3').style.opacity = 1;
    }
  }, [inView1, inView2, inView3]);

  return (
    <>

      <NavBar />
      <ScrollButton />
      <div className='PageCont'>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <section ref={ref1} className='Section1'>
          <p className='infomain1'>
            ¡<b>Bienvenidos</b> a nuestro <b>restaurante</b>, un santuario culinario donde los <b>sabores</b> se entrelazan para crear una
            experiencia única! En nuestro <b>establecimiento</b>, nos enorgullecemos de ofrecer a nuestros <b>comensales</b> un viaje
            gastronómico que despierta los <b>sentidos</b> y deleita el <b>paladar</b>.
            Nuestro <b>restaurante</b> es más que un <b>lugar</b> para comer; es un espacio diseñado para celebrar la <b>pasión</b> por la
            buena <b>comida</b> y la <b>hospitalidad</b>.
            Desde el <b>momento</b> en que cruza nuestras <b>puertas</b>, será recibido por un <b>ambiente</b> acogedor y <b>elegante</b>, donde la <b>luz</b> tenue y 
            la <b>música</b> ambiental crean un <b>ambiente</b> relajado y <b>placentero</b>.
          </p>
          <Slider numImages={images.length} imagePaths={images} />
        </section>

        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        <section ref={ref2} className='Section2'>
          <p className='infomain2'>
            Nuestra <b>carta</b> es un reflejo de nuestra dedicación a la <b>excelencia culinaria</b>.
            Cada <b>plato</b> está cuidadosamente elaborado por nuestros talentosos <b>chefs</b>, quienes seleccionan los <b>ingredientes</b> más frescos y de la 
            más alta <b>calidad</b> para ofrecerle <b>sabores auténticos</b> y <b>exquisitos</b>. Ya sea que prefiera
            clásicos reconfortantes o aventurarse con <b>sabores innovadores</b>, tenemos algo para todos los <b>gustos</b>.
          </p>
          <Slider numImages={images.length} imagePaths={images2} />
        </section>

        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        <section ref={ref3} className='Section3'>
          <p className='infomain3'>
            Nuestro <b>equipo de servicio</b> está aquí para garantizar que su experiencia sea <b>excepcional</b> en cada visita.
            Desde el conocimiento detallado de nuestro <b>menú</b> hasta la atención personalizada, estamos comprometidos a
            brindarle un <b>servicio impecable</b> que lo haga sentirse <b>especial</b> y <b>atendido</b>.
            En nuestro <b>restaurante</b>, valoramos la <b>satisfacción</b> de nuestros <b>clientes</b> y nos esforzamos por superar sus <b>expectativas</b> en 
            cada <b>comida</b>. Esperamos que disfrute de esta <b>experiencia culinaria</b> y que regrese para
            deleitarse con nuestros <b>deliciosos platillos</b> en futuras ocasiones. ¡<b>Gracias</b> por elegirnos y permitirnos ser
            parte de sus <b>momentos gastronómicos memorables</b>!
          </p>
          <Slider numImages={images.length} imagePaths={images3} />
        </section>

      </div>

      <br/><br/><br/>

      <Footer />
    </>
  );
}

export default App;
