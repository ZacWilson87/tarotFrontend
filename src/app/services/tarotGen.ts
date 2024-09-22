import axios from "axios";
import api from "./api";

// function to call the Tarot generation endpoint
export const generateTarotCard = async (formData: any) => {
  try {
    const response = await api.post("/generateTarotCard", formData); // Adjust the route to match your backend
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error generating tarot card:", error.message);
      if (error.response) {
        console.error(
          "Backend responded with error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response from backend:", error.request);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

// Function to fetch tarot cards list
export const getTarotCardsList = async () => {
  try {
    const response = await api.get("/getTarotCardsList");
    console.log(response.data);
    return response.data; // Assuming the API returns the list directly
  } catch (error) {
    console.error("Error fetching tarot cards list:", error);
    throw error;
  }
};
