"use client";

import TarotCardSlider from "./components/tarot_card_slider/TarotCardSlider";
// import Slider from "./components/tarot_card_slider/Slider";
import TarotGenFormWrapper from "./components/tarot_form/TarotGenFormWrapper.react";

export type PlaceholderTarotCardData = {
  src: string;
  cardName: string;
  cardType: string;
};

export default function Home() {
  return (
    <>
      <TarotGenFormWrapper />
    </>
  );
}
