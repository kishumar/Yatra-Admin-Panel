//  import { useState } from "react";
// import { motion } from "framer-motion";
// import { Download } from "lucide-react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// export default function Report() {
//   const [filter, setFilter] = useState("daily");

//   // Dummy data
//   const reportData = [
//     {
//       route: "Route 1",
//       driver: "John Doe",
//       trips: 5,
//       distance: 120,
//       fuelConsumed: 15,
//       performance: 95,
//     },
//     {
//       route: "Route 2",
//       driver: "Jane Smith",
//       trips: 4,
//       distance: 100,
//       fuelConsumed: 12,
//       performance: 90,
//     },
//     {
//       route: "Route 3",
//       driver: "Mike Ross",
//       trips: 6,
//       distance: 150,
//       fuelConsumed: 18,
//       performance: 97,
//     },
//   ];

//   // Export to Excel
//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(reportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Transport Report");
//     XLSX.writeFile(wb, `Transport_Report_${filter}.xlsx`);
//   };

//   // Export to PDF
//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text(`Transport Report - ${filter.toUpperCase()}`, 14, 20);
//     const tableColumn = ["Route", "Driver", "Trips", "Distance(km)", "Fuel(L)", "Performance(%)"];
//     const tableRows = [];

//     reportData.forEach((data) => {
//       const row = [
//         data.route,
//         data.driver,
//         data.trips,
//         data.distance,
//         data.fuelConsumed,
//         data.performance,
//       ];
//       tableRows.push(row);
//     });

//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 25,
//     });

//     doc.save(`Transport_Report_${filter}.pdf`);
//   };

//   // Get top performing route & driver
//   const topRoute = reportData.reduce((prev, curr) =>
//     curr.performance > prev.performance ? curr : prev
//   );
//   const topDriver = reportData.reduce((prev, curr) =>
//     curr.performance > prev.performance ? curr : prev
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="p-6 mt-16 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl"
//     >
//       <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-transparent bg-clip-text">
//         Transport Reports & Analytics
//       </h2>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         {["daily", "weekly", "monthly"].map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={`px-4 py-2 rounded-lg font-medium ${
//               filter === f
//                 ? "bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white shadow-md"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             } transition`}
//           >
//             {f.charAt(0).toUpperCase() + f.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Top Performing */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <div className="flex-1 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-md">
//           <h3 className="font-semibold text-lg text-[#00A76F] mb-2">Top Route</h3>
//           <p className="text-gray-700">Route: {topRoute.route}</p>
//           <p className="text-gray-700">Performance: {topRoute.performance}%</p>
//         </div>
//         <div className="flex-1 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-md">
//           <h3 className="font-semibold text-lg text-[#00A76F] mb-2">Top Driver</h3>
//           <p className="text-gray-700">Driver: {topDriver.driver}</p>
//           <p className="text-gray-700">Performance: {topDriver.performance}%</p>
//         </div>
//       </div>

//       {/* Report Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse border border-gray-200">
//           <thead className="bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white">
//             <tr>
//               <th className="px-4 py-2 border">Route</th>
//               <th className="px-4 py-2 border">Driver</th>
//               <th className="px-4 py-2 border">Trips</th>
//               <th className="px-4 py-2 border">Distance (km)</th>
//               <th className="px-4 py-2 border">Fuel (L)</th>
//               <th className="px-4 py-2 border">Performance (%)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reportData.map((data, idx) => (
//               <tr key={idx} className="text-center hover:bg-gray-50 transition">
//                 <td className="border px-4 py-2">{data.route}</td>
//                 <td className="border px-4 py-2">{data.driver}</td>
//                 <td className="border px-4 py-2">{data.trips}</td>
//                 <td className="border px-4 py-2">{data.distance}</td>
//                 <td className="border px-4 py-2">{data.fuelConsumed}</td>
//                 <td className="border px-4 py-2">{data.performance}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Export Buttons */}
//       <div className="flex flex-wrap gap-3 mt-6">
//         <button
//           onClick={exportToExcel}
//           className="bg-[#00A76F] text-white px-4 py-2 rounded-lg shadow-md hover:brightness-105 flex items-center gap-1"
//         >
//           <Download size={16} /> Export Excel
//         </button>
//         <button
//           onClick={exportToPDF}
//           className="bg-[#1FCC79] text-white px-4 py-2 rounded-lg shadow-md hover:brightness-105 flex items-center gap-1"
//         >
//           <Download size={16} /> Export PDF
//         </button>
//       </div>
//     </motion.div>
//   );
// }















import { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Report({ collapsed }) {
  const [filter, setFilter] = useState("daily");

  // Dummy data
  const reportData = [
    { route: "Route 1", driver: "John Doe", trips: 5, distance: 120, fuelConsumed: 15, performance: 95 },
    { route: "Route 2", driver: "Jane Smith", trips: 4, distance: 100, fuelConsumed: 12, performance: 90 },
    { route: "Route 3", driver: "Mike Ross", trips: 6, distance: 150, fuelConsumed: 18, performance: 97 },
  ];

  // ✅ Export to Excel (works fine)
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transport Report");
    XLSX.writeFile(wb, `Transport_Report_${filter}.xlsx`);
  };

  // ✅ Fixed Export to PDF (works correctly now)
  const exportToPDF = () => {
    try {
      const doc = new jsPDF({ orientation: "landscape" });
      doc.setFontSize(16);
      doc.text(`Transport Report - ${filter.toUpperCase()}`, 14, 15);

      const tableColumn = ["Route", "Driver", "Trips", "Distance (km)", "Fuel (L)", "Performance (%)"];
      const tableRows = reportData.map((data) => [
        data.route,
        data.driver,
        data.trips,
        data.distance,
        data.fuelConsumed,
        data.performance,
      ]);

      // Ensure jsPDF autotable works
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 25,
        styles: { halign: "center", valign: "middle", fontSize: 10 },
        headStyles: { fillColor: [0, 167, 111] },
      });

      doc.save(`Transport_Report_${filter}.pdf`);
    } catch (error) {
      console.error("PDF Export Failed:", error);
      alert("Error generating PDF. Please check console for details.");
    }
  };

  // Calculate top route and driver
  const topRoute = reportData.reduce((prev, curr) =>
    curr.performance > prev.performance ? curr : prev
  );
  const topDriver = reportData.reduce((prev, curr) =>
    curr.performance > prev.performance ? curr : prev
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xs transition-all duration-300 mt-16 
        ${collapsed ? "ml-20" : "ml-64"}`}
    >
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-transparent bg-clip-text">
        Transport Reports & Analytics
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["daily", "weekly", "monthly"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === f
                ? "bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Top Performing Cards */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-md">
          <h3 className="font-semibold text-lg text-[#00A76F] mb-2">Top Route</h3>
          <p className="text-gray-700">Route: {topRoute.route}</p>
          <p className="text-gray-700">Performance: {topRoute.performance}%</p>
        </div>
        <div className="flex-1 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-md">
          <h3 className="font-semibold text-lg text-[#00A76F] mb-2">Top Driver</h3>
          <p className="text-gray-700">Driver: {topDriver.driver}</p>
          <p className="text-gray-700">Performance: {topDriver.performance}%</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gradient-to-r from-[#1FCC79] to-[#00A76F] text-white">
            <tr>
              <th className="px-4 py-2 border">Route</th>
              <th className="px-4 py-2 border">Driver</th>
              <th className="px-4 py-2 border">Trips</th>
              <th className="px-4 py-2 border">Distance (km)</th>
              <th className="px-4 py-2 border">Fuel (L)</th>
              <th className="px-4 py-2 border">Performance (%)</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((data, idx) => (
              <tr key={idx} className="text-center hover:bg-gray-50 transition">
                <td className="border px-4 py-2">{data.route}</td>
                <td className="border px-4 py-2">{data.driver}</td>
                <td className="border px-4 py-2">{data.trips}</td>
                <td className="border px-4 py-2">{data.distance}</td>
                <td className="border px-4 py-2">{data.fuelConsumed}</td>
                <td className="border px-4 py-2">{data.performance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={exportToExcel}
          className="bg-[#00A76F] text-white px-4 py-2 rounded-lg shadow-md hover:brightness-105 flex items-center gap-1"
        >
          <Download size={16} /> Export Excel
        </button>
        <button
          onClick={exportToPDF}
          className="bg-[#1FCC79] text-white px-4 py-2 rounded-lg shadow-md hover:brightness-105 flex items-center gap-1"
        >
          <Download size={16} /> Export PDF
        </button>
      </div>
    </motion.div>
  );
}

