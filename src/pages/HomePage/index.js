import slider1 from "assets/images/slider1.jpg";
import slider2 from "assets/images/slider2.jpg";
import slider3 from "assets/images/slider3.jpg";
import { useState } from "react";
import { Carousel } from "react-bootstrap";

function HomePage(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel className="m-0 p-0" activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img src={slider1} class="d-block w-100" alt="..." />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={slider2} class="d-block w-100" alt="..." />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={slider3} class="d-block w-100" alt="..." />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default HomePage;
