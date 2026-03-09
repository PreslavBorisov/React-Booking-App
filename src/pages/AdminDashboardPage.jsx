import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await api.get("/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to load admin stats", error);
      }
    };

    loadStats();
  }, []);

  if (!stats) {
    return <p>Loading admin stats...</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Total Rooms</p>
          <p className="text-2xl font-bold">{stats.totalRooms}</p>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Active Rooms</p>
          <p className="text-2xl font-bold">{stats.activeRooms}</p>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold">{stats.pendingBookings}</p>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Confirmed</p>
          <p className="text-2xl font-bold">{stats.confirmedBookings}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;