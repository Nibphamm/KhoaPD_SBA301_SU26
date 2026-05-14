import Carousel from 'react-bootstrap/Carousel';
import { banners } from '../data/banner';

function BannerCarousel() {
  return (
    <Carousel className="mb-5 rounded overflow-hidden shadow-sm" interval={3000}>
      {banners.map((banner, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={banner.url}
            alt={banner.title}
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2 mb-3">
            <h3>{banner.title}</h3>
            <p className="mb-0">{banner.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerCarousel;
