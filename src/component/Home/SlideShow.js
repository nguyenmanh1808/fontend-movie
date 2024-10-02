import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import slide1 from '../../assets/SlideImage/marvel.png';
import slide2 from '../../assets/SlideImage/thien-nga-bong-dem.jpg';
import slide3 from '../../assets/SlideImage/tuy-xuan-phong.jpg';
const fadeImages = [
  {
    url: slide1,
    caption: 'First Slide'
  },
  {
    url: slide2,
    caption: 'Second Slide'
  },
  {
    url:slide3,
    caption: 'Third Slide'
  },
];

const SlideShow = () => {
  return (
    <>
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: '100%',height:'554px' }} src={fadeImage.url} />
          </div>
        ))}
      </Fade>
    </>
  )
}

export default SlideShow;