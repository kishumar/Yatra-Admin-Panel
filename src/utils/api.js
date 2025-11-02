
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  //  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true, 

});

export default api;









//  // axios instance - sends cookies to backend
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
//   withCredentials: true,
//   headers: {
//     Accept: "application/json",
//   },
// });

// export default api;
