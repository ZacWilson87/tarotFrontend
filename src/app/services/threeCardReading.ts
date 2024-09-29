import axios from "axios";
import api from "./api";

export const generateThreeCardReading = async (formData: any) => {
  try {
    const response = await api.post("/three-card-reading", formData); // Adjust the route to match your backend
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error generating three card reading:", error.message);
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
