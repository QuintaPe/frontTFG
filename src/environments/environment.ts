const API_URL = "https://scoutcamp.onrender.com";

const environment = {
  production: true,
  api: {
    API_URL,
    API_BASE_URL: `${API_URL}/api/v1`,
    FILES_BASE_URL: `${API_URL}/api/v1/documents/`,
  },
};

export default environment;
