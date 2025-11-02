// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from '../api/axiosInstance.js';
// // import axios from "axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);       // user object in memory only
//   const [loading, setLoading] = useState(true); // initial loading while checking /auth/me

//   // on mount, ask backend who is logged-in (cookie-based)
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get('/auth/me'); // backend reads cookie and returns user
//         setUser(res.data.user || null);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // login: backend should set HTTP-only cookie; frontend just calls endpoint and re-fetches /auth/me
//   const login = async ({ email, password }) => {
//     try {
//       await axios.post('/auth/login', { email, password }); // backend sets cookie
//       // fetch user
//       const res = await axios.get('/auth/me');
//       setUser(res.data.user);
//       return { success: true };
//     } catch (err) {
//       return { success: false, message: err.response?.data?.message || 'Login failed' };
//     }
//   };

//   // logout: backend clears cookie (endpoint). frontend clears memory user
//   const logout = async () => {
//     try {
//       await axios.post('/auth/logout'); // optional: backend clears cookie
//     } catch (e) {
//       // ignore
//     }
//     setUser(null);
//   };

//   // register: backend creates user & may set cookie or require login
//   const register = async (payload) => {
//     try {
//       await axios.post('/auth/register', payload);
//       return { success: true };
//     } catch (err) {
//       return { success: false, message: err.response?.data?.message || 'Registration failed' };
//     }
//   };

//   // complete profile (after first login if needed)
//   const completeProfile = async (payload) => {
//     try {
//       const res = await axios.post('/auth/complete-profile', payload);
//       setUser(res.data.user);
//       return { success: true };
//     } catch (err) {
//       return { success: false, message: err.response?.data?.message || 'Update failed' };
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, setLoading, loading, login, logout, register, completeProfile }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
