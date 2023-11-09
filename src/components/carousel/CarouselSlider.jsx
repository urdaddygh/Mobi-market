import React from "react";

import {
  DotGroup,
  Image,
  Slide,
  Slider
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import styled from "styled-components";

const CarouselSlider = ({ image=[] }) => {
  //pure-react-carousel context
  return (
    <Wrapper>
        <div className="cont_slide">
      <Slider>
        {image.map((el, index) => (
          <Slide index={index} className="slide">
            <Image src={el.image} className="img_slide"/>
          </Slide>
        ))}
        {/* <Slide index={0} className="slide">
            <Image src={image[0]?.image} className="img_slide"/>
          </Slide> */}
      </Slider>
      <div className="controls">
        <DotGroup className="dot-group" />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
.cont_slide{
    position:relative;
}
.img_slide{
    width:532px;
    height:320px;
}
  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    
   

    .dot-group {
      display: flex;
      align-items: center;
      justify-content: center;
        position:absolute;
        bottom:10px;

      .carousel__dot {
        width: 8px;
        height: 8px;
        border: none;
        border-radius: 50%;
        margin: 0 4px;
        padding: 0;
        background-color: #c3c4ca;
      }

      /* This class is found in DotGroup from pure-react-carousel */
      /* We need to override it to add our styles */
      .carousel__dot--selected {
        width: 16px;
        height: 8px;
        border-radius: 10px;
        background-color: #6267a1;
        transition: background 0.4s ease;
      }
    }
  }
`;

export default CarouselSlider;
