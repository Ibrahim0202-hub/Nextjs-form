"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Order {
  id: number;
  user_email: string;
  fund_id: number;
  amount: number;
  frequency: string;
  status: string;
  created_at: string;
}

interface Fund {
  id: number;
  fund_name: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [ordersRes, fundsRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/fund"),
      ]);
      const ordersData = await ordersRes.json();
      const fundsData = await fundsRes.json();
      if (ordersData.orders) setOrders(ordersData.orders);
      if (fundsData.funds) setFunds(fundsData.funds);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getFundName = (fund_id: number) => {
    const fund = funds.find((f) => f.id === fund_id);
    return fund ? fund.fund_name : `Fund #${fund_id}`;
  };

  const updateStatus = async (orderId: number, status: string) => {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId, status }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-blue-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6]">

      {/* TOPBAR */}
      <div className="h-[58px] bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🟡</span>
          <span className="font-semibold text-sm">GFS — Admin Panel</span>
        </div>
        <button onClick={() => router.push("/dashboard")} className="text-sm text-gray-500 hover:text-black">
          ← Back to Dashboard
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1000px] mx-auto px-4 py-10">

        <h1 className="text-2xl font-bold mb-1">Admin Panel</h1>
        <p className="text-sm text-gray-400 mb-8">Manage all investment orders</p>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: orders.length },
            { label: "Pending", value: orders.filter((o) => o.status === "pending").length },
            { label: "Approved", value: orders.filter((o) => o.status === "approved").length },
            { label: "Total Funds", value: funds.length },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4">
              <p className="text-xs text-gray-400 mb-1">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* ORDERS TABLE */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold">All Orders</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">ID</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">User</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Fund</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Frequency</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-400 text-sm">No orders yet</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-400">#{order.id}</td>
                      <td className="px-4 py-3">{order.user_email}</td>
                      <td className="px-4 py-3">{getFundName(order.fund_id)}</td>
                      <td className="px-4 py-3 font-medium">${Number(order.amount).toLocaleString()}</td>
                      <td className="px-4 py-3">{order.frequency}</td>
                      <td className="px-4 py-3 text-gray-400">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "approved" ? "bg-green-100 text-green-600" :
                          order.status === "rejected" ? "bg-red-100 text-red-600" :
                          "bg-orange-100 text-orange-600"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(order.id, "approved")}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(order.id, "rejected")}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}