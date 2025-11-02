// import { GoogleMap, LoadScript, Marker, Polyline, Circle } from "@react-google-maps/api";
// import { motion } from "framer-motion";
// import { MapPin, Route } from "lucide-react";
// import { useState } from "react";

// const containerStyle = {
//   width: "100%",
//   height: "70vh",
//   borderRadius: "1rem",
// };

// const defaultCenter = {
//   lat: 28.6139,
//   lng: 77.2090,
// };

// export default function RouteMap({ routes, stops }) {
//   const [activeRoute, setActiveRoute] = useState(null);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 mt-8"
//     >
//       <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent mb-4">
//         Live Route Map
//       </h3>

//       <div className="flex flex-col sm:flex-row gap-4 mb-4">
//         <select
//           className="p-2 border rounded-lg flex-1 focus:ring-2 focus:ring-emerald-400"
//           value={activeRoute?.id || ""}
//           onChange={(e) =>
//             setActiveRoute(routes.find((r) => r.id === Number(e.target.value)))
//           }
//         >
//           <option value="">Select Route to View</option>
//           {routes.map((route) => (
//             <option key={route.id} value={route.id}>
//               {route.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={defaultCenter}
//           zoom={12}
//         >
//           {/* Render Stops */}
//           {stops.map((stop) => (
//             <Marker
//               key={stop.id}
//               position={{
//                 lat: parseFloat(stop.latitude),
//                 lng: parseFloat(stop.longitude),
//               }}
//               label={{
//                 text: stop.name,
//                 fontWeight: "bold",
//                 fontSize: "12px",
//               }}
//               icon={{
//                 url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
//               }}
//             />
//           ))}

//           {/* Render Selected Route Path */}
//           {activeRoute && (
//             <>
//               <Polyline
//                 path={activeRoute.stops
//                   .map((name) => {
//                     const s = stops.find((st) => st.name === name);
//                     return s
//                       ? {
//                           lat: parseFloat(s.latitude),
//                           lng: parseFloat(s.longitude),
//                         }
//                       : null;
//                   })
//                   .filter(Boolean)}
//                 options={{
//                   strokeColor: "#1FCC79",
//                   strokeOpacity: 0.9,
//                   strokeWeight: 4,
//                 }}
//               />
//               {/* Optional Geofence Circle around destination */}
//               {activeRoute.geofencing && (
//                 <Circle
//                   center={{
//                     lat: parseFloat(
//                       stops.find((s) => s.name === activeRoute.destination)?.latitude ||
//                         defaultCenter.lat
//                     ),
//                     lng: parseFloat(
//                       stops.find((s) => s.name === activeRoute.destination)?.longitude ||
//                         defaultCenter.lng
//                     ),
//                   }}
//                   radius={700}
//                   options={{
//                     fillColor: "#1FCC79",
//                     fillOpacity: 0.15,
//                     strokeColor: "#00A76F",
//                     strokeOpacity: 0.8,
//                     strokeWeight: 2,
//                   }}
//                 />
//               )}
//             </>
//           )}
//         </GoogleMap>
//       </LoadScript>
//     </motion.div>
//   );
// }
