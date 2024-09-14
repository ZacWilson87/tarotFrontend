import api from "./api"; // Assuming api.ts is in the same directory

// function to call the Tarot generation endpoint
export const generateTarotCard = async (formData: any) => {
  try {
    const response = await api.post("/generateTarotCard", formData); // Adjust the route to match your backend
    return response.data;
  } catch (error) {
    console.error("Error generating tarot card:", error);
    throw error;
  }
};

// Function to fetch tarot cards list
export const getTarotCardsList = async () => {
  try {
    const response = await api.get("/getTarotCardsList");
    return response.data; // Assuming the API returns the list directly
  } catch (error) {
    console.error("Error fetching tarot cards list:", error);
    throw error;
  }
};
