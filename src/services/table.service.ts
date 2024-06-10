import axios from 'axios';

export const tableService = {
  async getData<T>(url: string) {
    const response = await axios.get<T>(
      `${import.meta.env.VITE_BASE_API_URL}/${url}`
    );
    return response.data;
  },
};
