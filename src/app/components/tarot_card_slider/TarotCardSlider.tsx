import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCards,
  EffectCoverflow,
  Navigation,
  Pagination,
  Keyboard,
  Mousewheel,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

import styles from "./TarotCardSlider.module.css";
import { PlaceholderTarotCardData } from "@/app/page";

interface TarotCardSliderProps {
  images: PlaceholderTarotCardData[];
}

const TarotCardSlider: React.FC<TarotCardSliderProps> = ({ images }) => {
  const activeCard = useMemo(() => images[0], [images]);
  return (
    <Swiper
      modules={[
        EffectCoverflow,
        Navigation,
        Pagination,
        Keyboard,
        Mousewheel,
        EffectCards,
      ]}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      loop={true}
      effect={"cards"}
      cardsEffect={{
        slideShadows: false,
        rotate: true,
      }}
      keyboard={{ enabled: true }}
      mousewheel={{ forceToAxis: true }}
      slideToClickedSlide={true}
      className={styles.tarotSlider}
      style={{ height: "100%" }}
      onSlideChange={(item) => console.log(item.activeIndex)}
    >
      {images.map((imageItem, index) => (
        <SwiperSlide key={index} className={styles.tarotSlide}>
          <p className={`text-white text-center ${styles.cardType}`}>
            {imageItem.cardType}
          </p>
          {/* <p className="text-white absolute opacity-50 z-10 -rotate-45 top-1/2 left-1/4 text-center text-xl bg-black p-2 rounded-lg font-bold">
            EXAMPLE
          </p> */}
          <img
            src={imageItem.src}
            alt={`Tarot Card ${imageItem.cardName}`}
            className={`${styles.tarotImage} cursor-pointer border border-gray-300 overflow-hidden`}
          />
          <p className={`text-white text-center ${styles.cardName}`}>
            {imageItem.cardName}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TarotCardSlider;
