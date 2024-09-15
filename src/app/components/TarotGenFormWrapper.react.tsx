"use client";
import { useState } from "react";
import TarotGenForm from "./TarotGenForm.react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { generateTarotCard } from "../services/tarotGen";
import { TarotFormData } from "./types/tarotFormData";
import TarotPlaceholder from "./TarotPlaceholder.react";

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
      className={`bg-gray-900 grid relative transition-all duration-300 gap-2 h-[50vh] ${
        isExpanded
          ? "grid-cols-1 md:grid-cols-[1fr_2fr]"
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
          className={`flex items-center justify-center text-gray-300 hover:text-white mb-4 
            focus:outline-none absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full 
            bg-slate-400`}
          aria-label={isExpanded ? "Collapse Form" : "Expand Form"}
          title={isExpanded ? "Collapse Form" : "Expand Form"}
        >
          <ChevronRightIcon
            className={`h-6 w-6 transition-transform duration-300 ${
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
            className="h-full rounded-md pb-8"
          />
        ) : (
          <p className="text-gray-300">
            Submit the form to generate a tarot card.
          </p>
        )}
      </div>
    </div>
  );
};

export default TarotGenFormWrapper;
