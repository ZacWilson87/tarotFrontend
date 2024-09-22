import { useState } from "react";
import TarotGenForm from "./TarotGenForm.react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { generateTarotCard } from "../../services/tarotGen";
import { TarotFormData } from "./types/tarotFormData";
import TarotPlaceholder from "./TarotPlaceholder.react";
import TarotCardSlider from "../tarot_card_slider/TarotCardSlider";
import { PlaceholderTarotCardData } from "@/app/page";

// all image paths
const sliderImagePaths: Array<PlaceholderTarotCardData> = [
  {
    src: "/images/3-of-cups.webp",
    cardName: "3 of Cups",
    cardType: "Minor Acanas",
  },
  {
    src: "/images/5-of-wands.webp",
    cardName: "5 of Wands",
    cardType: "Minor Acanas",
  },
  {
    src: "/images/ace_of_pentacles.webp",
    cardName: "Ace of Pentacles",
    cardType: "Minor Acanas",
  },
  {
    src: "/images/japaneseDeathTarot.png",
    cardName: "Death",
    cardType: "Major Acanas",
  },
];

const TarotGenFormWrapper = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmit = async (formData: TarotFormData) => {
    setLoading(true);
    try {
      const result = await generateTarotCard(formData);
      setImageURL(result.design); // Use 'design' key to set the image URL
    } catch (error) {
      console.error("Error generating tarot card:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-gray-900 grid relative transition-all duration-300 gap-2 h-auto rounded-md ${
        isExpanded
          ? "grid-cols-1 md:grid-cols-[1fr_1fr]"
          : "grid-cols-1 md:grid-cols-[3rem_1fr]"
      }`}
    >
      {/* Left Side - Form */}
      <div className="relative h-full">
        {isExpanded && (
          <div className="h-full p-4 grid relative">
            {/* Pass handleSubmit and loading to the form */}
            <TarotGenForm onSubmit={handleSubmit} loading={loading} />
          </div>
        )}
        <button
          onClick={toggleForm}
          className={`hiden md:flex items-center justify-center text-gray-300 hover:text-white mb-4 
            focus:outline-none absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full 
            bg-slate-400`}
          aria-label={isExpanded ? "Collapse Form" : "Expand Form"}
          title={isExpanded ? "Collapse Form" : "Expand Form"}
        >
          <ChevronRightIcon
            className={`h-6 w-6 transition-transform duration-300 hidden md:block ${
              isExpanded ? "transform rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Right Side - Image or Loading Card */}
      <div className="relative m-4 flex justify-start h-full overflow-hidden">
        {loading ? (
          <TarotPlaceholder />
        ) : imageURL ? (
          <img
            src={imageURL}
            alt="Generated Tarot Card"
            className="h-1/2 rounded-md pb-8"
          />
        ) : (
          <div className="w-full h-full">
            <TarotCardSlider images={sliderImagePaths} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TarotGenFormWrapper;
