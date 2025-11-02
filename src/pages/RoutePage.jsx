// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Plus, Edit, Trash2, MapPin, Route, CheckCircle, XCircle } from "lucide-react";
// // import Stop from "./Stop";
// // import RouteMap from "./RouteMap";

// export default function RoutePage() {
//   const [routes, setRoutes] = useState([
//     {
//       id: 1,
//       name: "City Center to Airport",
//       source: "City Center",
//       destination: "Airport",
//       stops: ["Mall Stop", "Tech Park", "Main Square"],
//       geofencing: true,
//     },
//   ]);

//   const [newRoute, setNewRoute] = useState({
//     name: "",
//     source: "",
//     destination: "",
//     stops: "",
//     geofencing: false,
//   });

//   const handleAddRoute = (e) => {
//     e.preventDefault();
//     if (!newRoute.name || !newRoute.source || !newRoute.destination) return;
//     setRoutes([
//       ...routes,
//       {
//         id: Date.now(),
//         ...newRoute,
//         stops: newRoute.stops.split(",").map((s) => s.trim()),
//       },
//     ]);
//     setNewRoute({ name: "", source: "", destination: "", stops: "", geofencing: false });
//     document.getElementById("addRouteForm").close();
//   };

//   const handleDelete = (id) => {
//     setRoutes(routes.filter((r) => r.id !== id));
//   };

//   const toggleGeofencing = (id) => {
//     setRoutes(
//       routes.map((r) =>
//         r.id === id ? { ...r, geofencing: !r.geofencing } : r
//       )
//     );
//   };

//   return (
//     <div className="p-6 mt-16">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6"
//       >
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
//             Route Management
//           </h2>
//           <button
//             onClick={() => document.getElementById("addRouteForm").showModal()}
//             className="flex items-center gap-2 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
//           >
//             <Plus size={18} /> Add Route
//           </button>
//         </div>

//         {/* Route List */}
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse text-left">
//             <thead>
//               <tr className="text-gray-700 border-b bg-emerald-50">
//                 <th className="p-3">Route Name</th>
//                 <th className="p-3">Source</th>
//                 <th className="p-3">Destination</th>
//                 <th className="p-3">Stops</th>
//                 <th className="p-3 text-center">Geofencing</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {routes.map((route) => (
//                 <motion.tr
//                   key={route.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="border-b hover:bg-emerald-50/50 transition"
//                 >
//                   <td className="p-3 font-semibold text-emerald-700">
//                     {route.name}
//                   </td>
//                   <td className="p-3">{route.source}</td>
//                   <td className="p-3">{route.destination}</td>
//                   <td className="p-3">
//                     {route.stops.map((s, i) => (
//                       <span
//                         key={i}
//                         className="bg-emerald-100 text-emerald-700 px-2 py-1 text-xs rounded-md mr-1"
//                       >
//                         {s}
//                       </span>
//                     ))}
//                   </td>
//                   <td className="p-3 text-center">
//                     <button onClick={() => toggleGeofencing(route.id)}>
//                       {route.geofencing ? (
//                         <CheckCircle className="text-emerald-600" />
//                       ) : (
//                         <XCircle className="text-gray-400" />
//                       )}
//                     </button>
//                   </td>
//                   <td className="p-3 text-center flex justify-center gap-3">
//                     <button className="p-2 rounded-lg hover:bg-emerald-100">
//                       <Edit size={18} className="text-emerald-600" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(route.id)}
//                       className="p-2 rounded-lg hover:bg-red-100"
//                     >
//                       <Trash2 size={18} className="text-red-500" />
//                     </button>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>


         

//       </motion.div>

//       {/* Add Route Modal */}
//       <dialog id="addRouteForm" className="modal">
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-[90%] max-w-md mx-auto mt-20"
//         >
//           <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
//             Add New Route
//           </h3>
//           <form onSubmit={handleAddRoute} className="flex flex-col gap-4">
//             <input
//               type="text"
//               placeholder="Route Name"
//               value={newRoute.name}
//               onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
//               className="border rounded-lg p-2 focus:ring-2 focus:ring-emerald-400"
//             />
//             <input
//               type="text"
//               placeholder="Source"
//               value={newRoute.source}
//               onChange={(e) => setNewRoute({ ...newRoute, source: e.target.value })}
//               className="border rounded-lg p-2 focus:ring-2 focus:ring-emerald-400"
//             />
//             <input
//               type="text"
//               placeholder="Destination"
//               value={newRoute.destination}
//               onChange={(e) =>
//                 setNewRoute({ ...newRoute, destination: e.target.value })
//               }
//               className="border rounded-lg p-2 focus:ring-2 focus:ring-emerald-400"
//             />
//             <textarea
//               placeholder="Stops (comma separated)"
//               value={newRoute.stops}
//               onChange={(e) => setNewRoute({ ...newRoute, stops: e.target.value })}
//               className="border rounded-lg p-2 focus:ring-2 focus:ring-emerald-400"
//             />
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={newRoute.geofencing}
//                 onChange={(e) =>
//                   setNewRoute({ ...newRoute, geofencing: e.target.checked })
//                 }
//               />
//               Enable Geofencing
//             </label>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => document.getElementById("addRouteForm").close()}
//                 className="px-4 py-2 rounded-lg border"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#1FCC79] to-[#00A76F]"
//               >
//                 Add Route
//               </button>
//             </div>
//           </form>
//         </motion.div>
//       </dialog>
      
//     </div>
     
//   );
// }











import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";

export default function RoutePage({ collapsed }) {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: "City Center to Airport",
      source: "City Center",
      destination: "Airport",
      stops: ["Mall Stop", "Tech Park", "Main Square"],
      geofencing: true,
    },
  ]);

  const [newRoute, setNewRoute] = useState({
    name: "",
    source: "",
    destination: "",
    stops: "",
    geofencing: false,
  });

  const handleAddRoute = (e) => {
    e.preventDefault();
    if (!newRoute.name || !newRoute.source || !newRoute.destination) return;
    setRoutes([
      ...routes,
      {
        id: Date.now(),
        ...newRoute,
        stops: newRoute.stops.split(",").map((s) => s.trim()),
      },
    ]);
    setNewRoute({ name: "", source: "", destination: "", stops: "", geofencing: false });
    document.getElementById("addRouteForm").close();
  };

  const handleDelete = (id) => {
    setRoutes(routes.filter((r) => r.id !== id));
  };

  const toggleGeofencing = (id) => {
    setRoutes(
      routes.map((r) =>
        r.id === id ? { ...r, geofencing: !r.geofencing } : r
      )
    );
  };

  return (
    <div
      className={`p-6 transition-all duration-300 ${
        collapsed ? "ml-24" : "ml-64"
      } mt-16`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xs p-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
            Route Management
          </h2>
          <button
            onClick={() => document.getElementById("addRouteForm").showModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            <Plus size={18} /> Add Route
          </button>
        </div>

        {/* Route Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-gray-700 border-b bg-emerald-50">
                <th className="p-3">Route Name</th>
                <th className="p-3">Source</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Stops</th>
                <th className="p-3 text-center">Geofencing</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <motion.tr
                  key={route.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b hover:bg-emerald-50/50 transition"
                >
                  <td className="p-3 font-semibold text-emerald-700">{route.name}</td>
                  <td className="p-3">{route.source}</td>
                  <td className="p-3">{route.destination}</td>
                  <td className="p-3">
                    {route.stops.map((s, i) => (
                      <span
                        key={i}
                        className="bg-emerald-100 text-emerald-700 px-2 py-1 text-xs rounded-md mr-1"
                      >
                        {s}
                      </span>
                    ))}
                  </td>
                  <td className="p-3 text-center">
                    <button onClick={() => toggleGeofencing(route.id)}>
                      {route.geofencing ? (
                        <CheckCircle className="text-emerald-600" />
                      ) : (
                        <XCircle className="text-gray-400" />
                      )}
                    </button>
                  </td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    <button className="p-2 rounded-lg hover:bg-emerald-100">
                      <Edit size={18} className="text-emerald-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(route.id)}
                      className="p-2 rounded-lg hover:bg-red-100"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Route Modal */}
      <dialog id="addRouteForm" className="modal">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-[90%] max-w-md mx-auto mt-20"
        >
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] bg-clip-text text-transparent">
            Add New Route
          </h3>
          <form onSubmit={handleAddRoute} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Route Name"
              value={newRoute.name}
              onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="text"
              placeholder="Source"
              value={newRoute.source}
              onChange={(e) => setNewRoute({ ...newRoute, source: e.target.value })}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="text"
              placeholder="Destination"
              value={newRoute.destination}
              onChange={(e) =>
                setNewRoute({ ...newRoute, destination: e.target.value })
              }
              className="border rounded-lg p-2 focus:ring-2 focus:ring-emerald-400"
            />
            <textarea
              placeholder="Stops (comma separated)"
              value={newRoute.stops}
              onChange={(e) => setNewRoute({ ...newRoute, stops: e.target.value })}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-emerald-400"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newRoute.geofencing}
                onChange={(e) =>
                  setNewRoute({ ...newRoute, geofencing: e.target.checked })
                }
              />
              Enable Geofencing
            </label>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("addRouteForm").close()}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#1FCC79] to-[#00A76F]"
              >
                Add Route
              </button>
            </div>
          </form>
        </motion.div>
      </dialog>
    </div>
  );
}

