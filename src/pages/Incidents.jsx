//  import { useState } from "react";
// import { motion } from "framer-motion";
// import { Plus, Trash2, AlertTriangle } from "lucide-react";

// export default function Incident() {
//   const [incidents, setIncidents] = useState([]);
//   const [newIncident, setNewIncident] = useState({
//     title: "",
//     description: "",
//     driver: "",
//     staff: "",
//     mechanic: "",
//   });

//   // Add new incident
//   const addIncident = () => {
//     if (
//       !newIncident.title ||
//       !newIncident.description ||
//       !newIncident.driver
//     )
//       return;

//     setIncidents([
//       ...incidents,
//       { ...newIncident, id: Date.now(), status: "Pending" },
//     ]);
//     setNewIncident({
//       title: "",
//       description: "",
//       driver: "",
//       staff: "",
//       mechanic: "",
//     });
//   };

//   // Delete incident
//   const deleteIncident = (id) =>
//     setIncidents(incidents.filter((i) => i.id !== id));

//   // Update status
//   const updateStatus = (id, status) => {
//     setIncidents(
//       incidents.map((i) => (i.id === id ? { ...i, status } : i))
//     );
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="p-6 mt-16 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xs "
//     >
//       <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-transparent bg-clip-text">
//         Incident Management
//       </h2>

//       {/* Add Incident Form */}
//       <div className="flex flex-wrap  gap-2 mb-6 flex-c ">
//         <input
//           className="border rounded-lg px-3 py-2 w-48 outline-none focus:ring-2 focus:ring-emerald-400"
//           placeholder="Incident Title"
//           value={newIncident.title}
//           onChange={(e) =>
//             setNewIncident({ ...newIncident, title: e.target.value })
//           }
//         />
//         <input
//           className="outline-none focus:ring-2 border focus:ring-emerald-400 rounded-lg px-3 py-2 w-64"
//           placeholder="Description"
//           value={newIncident.description}
//           onChange={(e) =>
//             setNewIncident({ ...newIncident, description: e.target.value })
//           }
//         />
//         <input
//           className="outline-none border focus:ring-2 focus:ring-emerald-400 rounded-lg px-3 py-2 w-48"
//           placeholder="Driver Name"
//           value={newIncident.driver}
//           onChange={(e) =>
//             setNewIncident({ ...newIncident, driver: e.target.value })
//           }
//         />
//         <input
//           className="outline-none border focus:ring-2 focus:ring-emerald-400 rounded-lg px-3 py-2 w-48"
//           placeholder="Assign Staff"
//           value={newIncident.staff}
//           onChange={(e) =>
//             setNewIncident({ ...newIncident, staff: e.target.value })
//           }
//         />
//         <input
//           className="outline-none border focus:ring-2 focus:ring-emerald-400 rounded-lg px-3 py-2 w-48"
//           placeholder="Assign Mechanic"
//           value={newIncident.mechanic}
//           onChange={(e) =>
//             setNewIncident({ ...newIncident, mechanic: e.target.value })
//           }
//         />
//         <button
//           onClick={addIncident}
//           className="bg-gradient-to-r from-[#1FCC79] to-[#00A76F] px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-1 shadow-md hover:brightness-105 transition"
//         >
//           <Plus size={16} /> Add Incident
//         </button>
//       </div>

//       {/* Incident List */}
//       <div className="grid rounded-2xl border-[2px] border-emerald-600  gap-4">
//         {incidents.length > 0 ? (
//           incidents.map((i) => (
//             <motion.div
//               key={i.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className="p-4 bg-white/80 backdrop-blur-md border rounded-xl shadow-sm"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="font-semibold text-lg flex items-center gap-2">
//                     <AlertTriangle className="text-[#00A76F]" />
//                     {i.title}
//                   </h3>
//                   <p className="text-sm text-gray-600">{i.description}</p>
//                   <p className="text-sm text-gray-600">
//                     Driver: {i.driver} | Staff: {i.staff} | Mechanic: {i.mechanic}
//                   </p>
//                   <p className="text-sm mt-1">
//                     Status:{" "}
//                     <span className="font-semibold text-[#1FCC79]">{i.status}</span>
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => updateStatus(i.id, "In Progress")}
//                     className="px-3 py-1 bg-[#00A76F] text-white rounded-md text-sm hover:brightness-105 transition"
//                   >
//                     In Progress
//                   </button>
//                   <button
//                     onClick={() => updateStatus(i.id, "Resolved")}
//                     className="px-3 py-1 bg-[#1FCC79] text-white rounded-md text-sm hover:brightness-105 transition"
//                   >
//                     Resolved
//                   </button>
//                   <button
//                     onClick={() => deleteIncident(i.id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:brightness-105 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-gray-500">No incidents reported yet.</p>
//         )}
//       </div>
//     </motion.div>
//   );
// }















import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, AlertTriangle } from "lucide-react";

export default function Incident({ collapsed }) {
  const [incidents, setIncidents] = useState([]);
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    driver: "",
    staff: "",
    mechanic: "",
  });

  const addIncident = () => {
    if (!newIncident.title || !newIncident.description || !newIncident.driver) return;

    setIncidents([
      ...incidents,
      { ...newIncident, id: Date.now(), status: "Pending" },
    ]);

    setNewIncident({
      title: "",
      description: "",
      driver: "",
      staff: "",
      mechanic: "",
    });
  };

  const deleteIncident = (id) =>
    setIncidents(incidents.filter((i) => i.id !== id));

  const updateStatus = (id, status) =>
    setIncidents(incidents.map((i) => (i.id === id ? { ...i, status } : i)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xs transition-all duration-300 
        mt-16 ${collapsed ? "ml-20" : "ml-64"}`}
    >
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-transparent bg-clip-text">
        Incident Management
      </h2>

      {/* Add Incident Form */}
      <div className="flex flex-wrap gap-2 mb-6">
        <input
          className="border rounded-lg px-3 py-2 w-48 outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Incident Title"
          value={newIncident.title}
          onChange={(e) =>
            setNewIncident({ ...newIncident, title: e.target.value })
          }
        />
        <input
          className="outline-none focus:ring-2 border focus:ring-emerald-400 rounded-lg px-3 py-2 w-64"
          placeholder="Description"
          value={newIncident.description}
          onChange={(e) =>
            setNewIncident({ ...newIncident, description: e.target.value })
          }
        />
        <input
          className="outline-none border focus:ring-2 focus:ring-emerald-400 rounded-lg px-3 py-2 w-48"
          placeholder="Driver Name"
          value={newIncident.driver}
          onChange={(e) =>
            setNewIncident({ ...newIncident, driver: e.target.value })
          }
        />
        <input
          className="outline-none border focus:ring-2 focus:ring-emerald-400 rounded-lg px-3 py-2 w-48"
          placeholder="Assign Staff"
          value={newIncident.staff}
          onChange={(e) =>
            setNewIncident({ ...newIncident, staff: e.target.value })
          }
        />
        <input
          className="outline-none border focus:ring-2 focus:ring-emerald-400 rounded-lg px-3 py-2 w-48"
          placeholder="Assign Mechanic"
          value={newIncident.mechanic}
          onChange={(e) =>
            setNewIncident({ ...newIncident, mechanic: e.target.value })
          }
        />
        <button
          onClick={addIncident}
          className="bg-gradient-to-r from-[#1FCC79] to-[#00A76F] px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-1 shadow-md hover:brightness-105 transition"
        >
          <Plus size={16} /> Add Incident
        </button>
      </div>

      {/* Incident List */}
      <div className="grid rounded-2xl border-[2px] border-emerald-600 gap-4">
        {incidents.length > 0 ? (
          incidents.map((i) => (
            <motion.div
              key={i.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white/80 backdrop-blur-md border rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <AlertTriangle className="text-[#00A76F]" />
                    {i.title}
                  </h3>
                  <p className="text-sm text-gray-600">{i.description}</p>
                  <p className="text-sm text-gray-600">
                    Driver: {i.driver} | Staff: {i.staff} | Mechanic: {i.mechanic}
                  </p>
                  <p className="text-sm mt-1">
                    Status:{" "}
                    <span className="font-semibold text-[#1FCC79]">
                      {i.status}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(i.id, "In Progress")}
                    className="px-3 py-1 bg-[#00A76F] text-white rounded-md text-sm hover:brightness-105 transition"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateStatus(i.id, "Resolved")}
                    className="px-3 py-1 bg-[#1FCC79] text-white rounded-md text-sm hover:brightness-105 transition"
                  >
                    Resolved
                  </button>
                  <button
                    onClick={() => deleteIncident(i.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:brightness-105 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No incidents reported yet.</p>
        )}
      </div>
    </motion.div>
  );
}

