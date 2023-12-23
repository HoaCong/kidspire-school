import slider1 from "assets/images/slider1.jpg";
import slider2 from "assets/images/slider2.jpg";
import slider3 from "assets/images/slider3.jpg";
import { useState } from "react";
import { Carousel } from "react-bootstrap";

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src={slider1} className="d-block w-100" alt="..." />
        <div className="caption ">
          <h3 className="title text-info">The best school</h3>
          <h3 className=" text-danger sub-title fw-bold">for your kids</h3>
          <p className="desc text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            fugit id cum ad? Consectetur praesentium dolorem totam tenetur.
            Minus, doloremque?
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img src={slider2} className="d-block w-100" alt="..." />
        <div className="caption">
          <h3 className="title text-info">The best school</h3>
          <h3 className="sub-title text-danger fw-bold">for your kids</h3>
          <p className="desc text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            fugit id cum ad? Consectetur praesentium dolorem totam tenetur.
            Minus, doloremque?
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img src={slider3} className="d-block w-100" alt="..." />
        <div className="caption caption-left ">
          <h3 className="title text-info">The best school</h3>
          <h3 className="sub-title text-danger fw-bold">for your kids</h3>
          <p className="desc text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            fugit id cum ad? Consectetur praesentium dolorem totam tenetur.
            Minus, doloremque?
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
