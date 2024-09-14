import { useState, useEffect } from "react";
import { getTarotCardsList } from "../services/tarotGen"; // API call for fetching tarot cards

const TartotGenForm = ({ onSubmit }: { onSubmit: (formData: any) => void }) => {
  const [tarotCards, setTarotCards] = useState<string[]>([]);
  const [selectedTarotCard, setSelectedTarotCard] = useState<string>("");
  const [color1, setColor1] = useState<string>("#000000");
  const [color2, setColor2] = useState<string>("#000000");
  const [themeInput, setThemeInput] = useState<string>("");

  // Fetch tarot cards on component mount
  useEffect(() => {
    const fetchTarotCards = async () => {
      try {
        const cards = await getTarotCardsList();
        setTarotCards(cards);
      } catch (error) {
        console.error("Failed to fetch tarot cards:", error);
      }
    };

    fetchTarotCards();
  }, []);

  // Handle form submission and pass data back to the parent
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      selectedTarotCard,
      color1,
      color2,
      themeInput,
    };
    onSubmit(formData); // Pass the form data back to the wrapper component
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
      {/* Select Input */}
      <div className="mb-4 max-h-1/2">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Card Selection
        </label>
        <select
          value={selectedTarotCard}
          onChange={(e) => setSelectedTarotCard(e.target.value)}
          className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:bg-gray-600"
        >
          <option value="" disabled>
            Select an option
          </option>
          {tarotCards.map((card, index) => (
            <option key={index} value={card} className="bg-gray-800">
              {card}
            </option>
          ))}
        </select>
      </div>

      {/* Hex Color Inputs */}
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Use Color 1
          </label>
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            className="w-full h-10 p-0 bg-transparent border-0 focus:outline-none"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Use Color 2
          </label>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            className="w-full h-10 p-0 bg-transparent border-0 focus:outline-none"
          />
        </div>
      </div>

      {/* Text Input */}
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Theme
        </label>
        <input
          type="text"
          value={themeInput}
          onChange={(e) => setThemeInput(e.target.value)}
          maxLength={40}
          className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:bg-gray-600"
        />
        <p className="text-gray-500 text-xs mt-1">
          {themeInput.length}/40 characters
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};

export default TartotGenForm;
