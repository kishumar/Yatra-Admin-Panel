 import React, { createContext, useContext, useState } from "react";

const LayoutContext = createContext();
export const useLayout = () => useContext(LayoutContext);

export default function LayoutProvider({ children }) {
  // collapsed = true -> narrow icon rail (default)
  const [collapsed, setCollapsed] = useState(true);
  // selected main menu (dashboard, drivers, vehicles, routes, map, settings)
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  const toggleCollapsed = () => setCollapsed((s) => !s);
  const selectMenu = (menu) => {
    setSelectedMenu(menu);
    // when user selects a menu we want the secondary panel to open (if collapsed remains true, still shows)
    // keep collapsed state as-is — UI will adapt
  };

  return (
    <LayoutContext.Provider
      value={{ collapsed, toggleCollapsed, selectedMenu, selectMenu }}
    >
      {children}
    </LayoutContext.Provider>
  );
}











// import React, { createContext, useContext, useState } from "react";

// const LayoutContext = createContext();
// export const useLayout = () => useContext(LayoutContext);

// export default function LayoutProvider({ children }) {
//   // collapsed = true -> narrow icon rail
//   const [collapsed, setCollapsed] = useState(true);
//   const [selectedMenu, setSelectedMenu] = useState("dashboard");
//   const [selectedItem, setSelectedItem] = useState(null); // currently clicked item

//   const toggleCollapsed = () => setCollapsed((s) => !s);
//   const selectMenu = (menu) => {
//     setSelectedMenu(menu);
//     setSelectedItem(null); // clear selected item when switching lists
//   };
//   const chooseItem = (item) => setSelectedItem(item);

//   return (
//     <LayoutContext.Provider
//       value={{
//         collapsed,
//         toggleCollapsed,
//         selectedMenu,
//         selectMenu,
//         selectedItem,
//         chooseItem,
//       }}
//     >
//       {children}
//     </LayoutContext.Provider>
//   );
// }
