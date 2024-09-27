import { useState, useEffect, useCallback } from "react";
import { TarotFormData } from "./types/tarotFormData";
import { TarotCard } from "./types/tarotCard";
import { getPlaceholderDeck } from "@/app/services/deck";

const TartotGenForm = ({
  onSubmit,
  loading,
}: {
  onSubmit: (formData: TarotFormData) => void;
  loading: boolean;
}) => {
  const [placeholderDeck, setPlaceholderDeck] = useState<TarotCard[]>([]);
  const [formData, setFormData] = useState<TarotFormData>({
    tarotCard: "",
    color1: "#000000",
    theme: "",
  });

  // Fetch tarot cards on component mount
  useEffect(() => {
    const fetchPlaceholderDeck = async () => {
      try {
        const cards = await getPlaceholderDeck();
        setPlaceholderDeck(cards);
      } catch (error) {
        console.error("Failed to fetch tarot cards:", error);
      }
    };

    fetchPlaceholderDeck();
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the field based on the input's name attribute
    });
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(formData); // Pass the form data back to the wrapper component
    },
    [formData, onSubmit]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg max-h-1/2"
    >
      <div className="mb-4 max-h-1/2">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Card Selection
        </label>
        <select
          name="tarotCard" // Added name attribute
          value={formData.tarotCard}
          onChange={handleChange}
          className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:bg-gray-600"
        >
          <option value="" disabled>
            Select an option
          </option>
          {placeholderDeck.map((card, index) => (
            <option key={index} value={card.name} className="bg-gray-800">
              {card.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Use Color 1
          </label>
          <input
            type="color"
            name="color1" // Added name attribute
            value={formData.color1}
            onChange={handleChange}
            className="w-full h-10 p-0 bg-transparent border-0 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Theme
        </label>
        <input
          type="text"
          name="theme" // Added name attribute
          value={formData.theme}
          onChange={handleChange}
          maxLength={40}
          className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:bg-gray-600"
        />
        <p className="text-gray-500 text-xs mt-1">
          {formData.theme.length}/40 characters
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none flex items-center justify-center`}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default TartotGenForm;
