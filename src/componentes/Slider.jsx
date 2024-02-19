import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomSlider = ({ numImages, imagePaths }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Tiempo en milisegundos entre transiciones automáticas
  };

  return (
    <Slider {...settings}>
      {Array.from({ length: numImages }).map((_, index) => (
        <div key={index}>
          <img src={imagePaths[index]} alt={`slide-${index}`} />
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
