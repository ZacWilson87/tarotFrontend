"use client";
import { useState } from "react";
import TarotGenForm from "./TarotGenForm.react";
import { ChevronRightIcon } from "@heroicons/react/24/solid"; // Ensure correct import path
import { generateTarotCard } from "../services/tarotGen";

const TarotGenFormWrapper = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [imageURL, setImageURL] = useState<string | null>(null); // Image URL state
  const [loading, setLoading] = useState(false); // To handle loading state

  const toggleForm = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmit = async (formData: any) => {
    // if any of the fields are empty, don't submit
    if (!formData.selectedTarotCard || !formData.color1 || !formData.color2) {
      return;
    }
    setLoading(true); // Set loading to true while fetching
    try {
      const result = await generateTarotCard(formData); // Submit the form
      setImageURL(result.imageUrl); // Set the image URL in the wrapper
    } catch (error) {
      console.error("Error generating tarot card:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-h-screen bg-gray-900 flex flex-row gap-2 relative">
      {/* Left Side - Form */}
      <div
        className={`${
          isExpanded ? "w-1/2" : "w-0"
        } transition-all duration-300 overflow-hidden`}
      >
        <div className="h-full p-4 grid relative">
          {/* Toggle Button Inside the Form */}
          <TarotGenForm onSubmit={handleSubmit} />
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
      </div>

      {/* Right Side - Image */}
      <div
        className={`${
          isExpanded ? "w-1/2" : "w-full"
        } transition-all duration-300 relative m-4 flex`}
      >
        {/* Toggle Button Over the Image When Form is Collapsed */}
        {!isExpanded && (
          <button
            onClick={toggleForm}
            className={` text-gray-300 hover:text-white focus:outline-none rounded-full 
              bg-slate-400 h-8 w-8 justify-center flex items-center absolute top-1/2 transform -translate-y-1/2`}
            aria-label="Expand Form"
            title="Expand Form"
          >
            <ChevronRightIcon
              className={`h-6 w-6 transition-transform duration-300`}
            />
          </button>
        )}
        {/* Display loading state or image */}
        {loading ? (
          <p className="text-gray-300">Generating Tarot Card...</p>
        ) : imageURL ? (
          <img
            src={imageURL}
            alt="Generated Tarot Card"
            className="h-full object-contain"
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
