"use client";

import { useCallback, useState } from "react";
import { generateThreeCardReading } from "../services/threeCardReading";
import { TarotCard } from "../components/tarot_form/types/tarotCard";
import { Button } from "@headlessui/react";

type ThreeCardReading = {
  id: number;
  past_card_id: number;
  past_card: TarotCard;
  past_card_is_reversed: boolean;
  present_card_id: number;
  present_card: TarotCard;
  present_card_is_reversed: boolean;
  future_card_id: number;
  future_card: TarotCard;
  future_card_is_reversed: boolean;
  reading: string;
  date: string;
};

// return a placeholder page
export default function Readings() {
  const [reading, setReading] = useState<ThreeCardReading | null>(null);
  const getThreeCardReading = useCallback(async () => {
    try {
      const response = await generateThreeCardReading({});
      console.log(response);
      setReading(response);
    } catch (error) {
      console.error("Error generating three card reading:", error);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <Button
        className="btn bg-gray-500 p-2 rounded-md"
        onClick={() => getThreeCardReading()}
      >
        Three Card Reading
      </Button>

      {reading && (
        <div className="flex flex-col items-center justify-center">
          <p className="p-2">{reading.reading}</p>
        </div>
      )}
    </div>
  );
}
