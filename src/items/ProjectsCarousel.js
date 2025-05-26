import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import randPic2 from '../imgs/rand_2.png'
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function ProjectsCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          src={randPic2}
          alt="Lorenzo Fezza"
          style={{
            width: '80vw', opacity: 0.1,}}
        />
        {/* <h1>First slide</h1> */}
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={randPic2}
          alt="Lorenzo Fezza"
          style={{
            width: '80vw', opacity: 0.1,}}
        />
        {/* <ExampleCarouselImage text="Second slide" /> */}
        {/* <h1>Second slide</h1> */}
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={randPic2}
          alt="Lorenzo Fezza"
          style={{
            width: '80vw', opacity: 0.1,}}
        />
        {/* <ExampleCarouselImage text="Third slide" /> */}
        {/* <h1>Third slide</h1> */}
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ProjectsCarousel;