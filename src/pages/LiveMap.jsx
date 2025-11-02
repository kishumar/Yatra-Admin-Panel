 


// import { useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   Circle,
// } from "react-leaflet";
// import { motion } from "framer-motion";
// import { Search, Car, MapPin } from "lucide-react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const vehicleIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/743/743007.png",
//   iconSize: [30, 30],
// });

// export default function LiveMap() {
//   const [vehicles, setVehicles] = useState([
//     {
//       id: "V-101",
//       driver: "John Doe",
//       status: "Running",
//       position: [28.6139, 77.209],
//       route: [
//         [28.6139, 77.209],
//         [28.6165, 77.215],
//         [28.6205, 77.225],
//       ],
//     },
//     {
//       id: "V-102",
//       driver: "Jane Smith",
//       status: "Stopped",
//       position: [28.615, 77.203],
//       route: [
//         [28.615, 77.203],
//         [28.618, 77.210],
//         [28.623, 77.217],
//       ],
//     },
//   ]);

//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Simulate movement every 3s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setVehicles((prev) =>
//         prev.map((v) => ({
//           ...v,
//           position: [
//             v.position[0] + (Math.random() - 0.5) * 0.001,
//             v.position[1] + (Math.random() - 0.5) * 0.001,
//           ],
//         }))
//       );
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const filteredVehicles = vehicles.filter((v) =>
//     v.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="h-screen w-full flex flex-col md:flex-row bg-gray-50 relative">
//       {/* Sidebar */}
//       <motion.div
//         className="md:w-80 w-full md:h-full h-1/3 bg-white/70 backdrop-blur-xl shadow-xl p-4 flex flex-col z-10 overflow-y-auto"
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
//           Live Vehicles
//         </h2>

//         {/* Search */}
//         <div className="relative mb-4">
//           <Search
//             size={18}
//             className="absolute left-3 top-3 text-gray-400"
//           />
//           <input
//             type="text"
//             placeholder="Search by ID..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 outline-none text-sm"
//           />
//         </div>

//         {/* Vehicle list */}
//         <div className="space-y-3 overflow-y-auto">
//           {filteredVehicles.map((v) => (
//             <motion.div
//               key={v.id}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.97 }}
//               className={`p-3 rounded-xl cursor-pointer shadow-sm transition-all ${
//                 selectedVehicle?.id === v.id
//                   ? "bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white"
//                   : "bg-white hover:bg-emerald-50"
//               }`}
//               onClick={() => setSelectedVehicle(v)}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-emerald-100 rounded-full">
//                     <Car
//                       size={20}
//                       className={
//                         selectedVehicle?.id === v.id
//                           ? "text-white"
//                           : "text-emerald-600"
//                       }
//                     />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold">{v.id}</h3>
//                     <p
//                       className={`text-xs ${
//                         selectedVehicle?.id === v.id
//                           ? "text-emerald-50"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       {v.driver}
//                     </p>
//                   </div>
//                 </div>
//                 <span
//                   className={`text-xs font-medium ${
//                     v.status === "Running"
//                       ? "text-green-600"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {v.status}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Map */}
//       <div className="flex-1 relative z-0">
//         <MapContainer
//           center={[28.6139, 77.209]}
//           zoom={14}
//           scrollWheelZoom={true}
//           className="h-full w-full"
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
//           />

//           {vehicles.map((v) => (
//             <Marker key={v.id} position={v.position} icon={vehicleIcon}>
//               <Popup>
//                 <div>
//                   <strong>{v.id}</strong>
//                   <p>{v.driver}</p>
//                   <p
//                     className={
//                       v.status === "Running"
//                         ? "text-green-600 font-medium"
//                         : "text-red-500 font-medium"
//                     }
//                   >
//                     {v.status}
//                   </p>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}

//           {/* Highlight route when selected */}
//           {selectedVehicle && (
//             <>
//               <Polyline
//                 positions={selectedVehicle.route}
//                 pathOptions={{
//                   color: "#00A76F",
//                   weight: 4,
//                   dashArray: "6,8",
//                 }}
//               />
//               <Circle
//                 center={selectedVehicle.position}
//                 radius={300}
//                 pathOptions={{
//                   color: "#1FCC79",
//                   fillOpacity: 0.2,
//                 }}
//               />
//             </>
//           )}
//         </MapContainer>

//         {/* Floating card for selected vehicle */}
//         {selectedVehicle && (
//           <motion.div
//             className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl w-[90%] md:w-1/3"
//             initial={{ y: 40, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="font-bold text-gray-800">
//                   {selectedVehicle.id}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Driver: {selectedVehicle.driver}
//                 </p>
//                 <p
//                   className={`text-sm font-semibold ${
//                     selectedVehicle.status === "Running"
//                       ? "text-green-600"
//                       : "text-red-500"
//                   }`}
//                 >
//                   Status: {selectedVehicle.status}
//                 </p>
//               </div>
//               <div className="bg-gradient-to-r from-[#1FCC79] to-[#00A76F] p-3 rounded-full text-white">
//                 <MapPin size={22} />
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

























import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet";
import { motion } from "framer-motion";
import { Search, Car, MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const vehicleIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/743/743007.png",
  iconSize: [30, 30],
});

export default function LiveMap({ collapsed }) {
  const [vehicles, setVehicles] = useState([
    {
      id: "V-101",
      driver: "John Doe",
      status: "Running",
      position: [28.6139, 77.209],
      route: [
        [28.6139, 77.209],
        [28.6165, 77.215],
        [28.6205, 77.225],
      ],
    },
    {
      id: "V-102",
      driver: "Jane Smith",
      status: "Stopped",
      position: [28.615, 77.203],
      route: [
        [28.615, 77.203],
        [28.618, 77.210],
        [28.623, 77.217],
      ],
    },
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate vehicle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => ({
          ...v,
          position: [
            v.position[0] + (Math.random() - 0.5) * 0.001,
            v.position[1] + (Math.random() - 0.5) * 0.001,
          ],
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredVehicles = vehicles.filter((v) =>
    v.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`flex flex-col md:flex-row h-screen transition-all duration-300 ${
        collapsed ? "ml-24" : "ml-64"
      } mt-16`}
    >
      {/* Sidebar */}
      <motion.div
        className="md:w-80 w-full md:h-full h-1/3 bg-white/70 backdrop-blur-xl shadow-xs p-4 flex flex-col z-10 overflow-y-auto"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
          Live Vehicles
        </h2>

        {/* Search box */}
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 outline-none text-sm"
          />
        </div>

        {/* Vehicle list */}
        <div className="space-y-3 overflow-y-auto">
          {filteredVehicles.map((v) => (
            <motion.div
              key={v.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`p-3 rounded-xl cursor-pointer shadow-sm transition-all ${
                selectedVehicle?.id === v.id
                  ? "bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white"
                  : "bg-white hover:bg-emerald-50"
              }`}
              onClick={() => setSelectedVehicle(v)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-full">
                    <Car
                      size={20}
                      className={
                        selectedVehicle?.id === v.id
                          ? "text-white"
                          : "text-emerald-600"
                      }
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{v.id}</h3>
                    <p
                      className={`text-xs ${
                        selectedVehicle?.id === v.id
                          ? "text-emerald-50"
                          : "text-gray-500"
                      }`}
                    >
                      {v.driver}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium ${
                    v.status === "Running"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {v.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Map Section */}
      <div className="flex-1 relative z-0">
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={14}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
          />

          {vehicles.map((v) => (
            <Marker key={v.id} position={v.position} icon={vehicleIcon}>
              <Popup>
                <div>
                  <strong>{v.id}</strong>
                  <p>{v.driver}</p>
                  <p
                    className={
                      v.status === "Running"
                        ? "text-green-600 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {v.status}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Highlight selected vehicle’s route */}
          {selectedVehicle && (
            <>
              <Polyline
                positions={selectedVehicle.route}
                pathOptions={{
                  color: "#00A76F",
                  weight: 4,
                  dashArray: "6,8",
                }}
              />
              <Circle
                center={selectedVehicle.position}
                radius={300}
                pathOptions={{
                  color: "#1FCC79",
                  fillOpacity: 0.2,
                }}
              />
            </>
          )}
        </MapContainer>

        {/* Floating vehicle info card */}
        {selectedVehicle && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl w-[90%] md:w-1/3"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800">
                  {selectedVehicle.id}
                </h3>
                <p className="text-sm text-gray-600">
                  Driver: {selectedVehicle.driver}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    selectedVehicle.status === "Running"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  Status: {selectedVehicle.status}
                </p>
              </div>
              <div className="bg-gradient-to-r from-[#1FCC79] to-[#00A76F] p-3 rounded-full text-white">
                <MapPin size={22} />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

