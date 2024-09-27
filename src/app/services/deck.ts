import axios from "axios";
import api from "./api";

// function to call the Tarot generation endpoint
export const getPlaceholderDeck = async () => {
  try {
    const response = await api.get("/getPlaceholderDeck");
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
