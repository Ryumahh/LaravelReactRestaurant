import React, { useState, useEffect } from 'react';

const ScrollButton = () => {
  // Estado para realizar un seguimiento de la sección actual
  const [currentSection, setCurrentSection] = useState(1);

  // Función para desplazarse suavemente hacia arriba y establecer la sección actual en 1
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentSection(1);
  };

  // Función para desplazarse suavemente a una sección específica
  const scrollToSection = (section) => {
    // Obtener el elemento de la sección mediante su clase
    const sectionElement = document.querySelector(`.Section${section}`);
    
    if (sectionElement) {
      // Calcular la posición de destino
      let targetPosition = sectionElement.offsetTop;

      // Ajustar la posición de destino para la sección 2
      if (section === 2) {
        const pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        targetPosition -= pageHeight * 0.07;
      }

      // Desplazarse suavemente hacia la posición de destino y establecer la sección actual
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      setCurrentSection(section);
    }
  };

  useEffect(() => {
    // Manejar el evento de desplazamiento para determinar la sección actual
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;

      // Determinar la sección actual basada en la posición de desplazamiento
      if (scrollPosition < 0.76 * window.innerHeight) {
        setCurrentSection(1);
      } else if (scrollPosition < 1.72 * window.innerHeight) {
        setCurrentSection(2);
      } else {
        setCurrentSection(3);
      }
    };

    // Adjuntar el event listener al evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Desadjuntar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Renderizar los botones de desplazamiento
  return (
    <div className="scroll-buttons">
      {currentSection > 1 && (
        <button onClick={scrollToTop}>
          ⇱
        </button>
      )}

      {currentSection > 1 && currentSection !== 2 && (
        <button onClick={() => scrollToSection(currentSection - 1)}>
          🠉
        </button>
      )}

      {currentSection < 3 && (
        <button onClick={() => scrollToSection(currentSection + 1)}>
          🠋
        </button>
      )}
    </div>
  );
};

export default ScrollButton;
