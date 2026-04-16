import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_CHURN_API_URL, // Update with your backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

export const predictChurn = async (customerData) => {
    try {
        const response = await api.post("/predict", customerData);
        return response.data;
    } catch (error) {
        console.error("Error predicting churn:", error);
        throw error;
    }
};
