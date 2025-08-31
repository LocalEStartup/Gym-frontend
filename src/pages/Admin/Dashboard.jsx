import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  UserPlus,
  ShoppingCart,
  ChefHat,
  Truck,
  PackagePlus,
} from "lucide-react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import UsersComponent from "./Users";
import AddUsers from "./AddUsers";
import Orders from "./Orders";
import AddProducts from "./AddProducts";

//  Dashboard Content (cards)
function DashboardContent({ counts }) {
  const cards = [
    { title: "Users", icon: <Users size={30} />, value: counts.user },
    { title: "Today Orders", icon: <ShoppingCart size={30} />, value: counts.order },
    { title: "Chefs", icon: <ChefHat size={30} />, value: counts.chef },
    { title: "Suppliers", icon: <Truck size={30} />, value: counts.supplier },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 shadow-lg rounded-lg flex items-center space-x-4"
          >
            <div className="text-orange-500">{card.icon}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">{card.title}</h2>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Dashboard");
  const [counts, setCounts] = useState({ user: 0, order: 0, chef: 0, supplier: 0 });
  
  useEffect(()=>setIsSidebarOpen(false),[headerTitle]);

  //  Single source of truth for sidebar items
  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "home", component: <DashboardContent counts={counts} /> },
    { name: "Add Products", icon: <PackagePlus size={20} />, path: "add-products", component: <AddProducts /> },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "orders", component: <Orders /> },
    { name: "Users", icon: <Users size={20} />, path: "users", component: <UsersComponent /> },
    { name: "Add Supplier/Chef", icon: <UserPlus size={20} />, path: "add-users", component: <AddUsers /> },
  ];


  useEffect(() => {
    async function fetchCounts() {
      // Replace with your API call
      // const res = await axios.get("/api/dashboard-counts");
      // setCounts(res.data);
      setCounts({ user: 10, order: 5, chef: 3, supplier: 2 }); // mock
    }
    fetchCounts();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        menuItems={menuItems}
        setHeaderTitle={setHeaderTitle}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          title={headerTitle}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            {/*  Redirect /dashboard → /dashboard/home */}
            <Route index element={<Navigate to="home" replace />} />

            {menuItems.map((item, i) => (
              <Route key={i} path={item.path} element={item.component} />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
