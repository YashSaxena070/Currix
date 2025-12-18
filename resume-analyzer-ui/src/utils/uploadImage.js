import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
