import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

Swiper.use([Autoplay]);
var swiper = new Swiper(".certsSwiper", {
    slidesPerView: "auto",
    autoplay: {
        delay: 5000,
    },
    breakpoints: {
      // sm
      0: {
        spaceBetween: 20,
        slidesPerView: 2.3,
      },
      // when window width is >= 576px
      576: {
        slidesPerView: 2.3,
        spaceBetween: 10
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 3.3,
        spaceBetween: 10
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      // when window width is >= 1400px
      1400: {
        slidesPerView: 6,
        spaceBetween: 20
      }
    }
  });