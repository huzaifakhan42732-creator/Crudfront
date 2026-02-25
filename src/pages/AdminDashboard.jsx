import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingBag, DollarSign } from 'lucide-react';
import StatCard from '.../components/dashboard/Statcard.jsx';
import SalesChart from '.../components/dashboard/Saleschart.jsx';
import OrderStatusPie from '.../components/dashboard/OrderStatusPie.jsx';
import API from '../api/axios';
import { useAuth } from '../context/Authcontext.jsx';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [statsRes, salesRes, ordersRes, stockRes] = await Promise.all([
          API.get('/admin/stats', { headers }),
          API.get('/admin/sales/monthly', { headers }),
          API.get('/admin/orders/status', { headers }),
          API.get('/admin/products/low-stock', { headers })
        ]);
        setStats(statsRes.data);
        setSalesData(salesRes.data);
        setOrderStatusData(ordersRes.data);
        setLowStock(stockRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} trend="up" percentage={12} />
        <StatCard title="Total Products" value={stats.totalProducts} icon={Package} trend="up" percentage={5} />
        <StatCard title="Total Orders" value={stats.totalOrders} icon={ShoppingBag} trend="up" percentage={8} />
        <StatCard title="Revenue (Month)" value={stats.monthlyRevenue} icon={DollarSign} trend="up" percentage={15} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={salesData} />
        <OrderStatusPie data={orderStatusData} />
      </div>

      {/* Low Stock Alerts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3">Stock</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.map(product => (
              <tr key={product._id} className="border-b">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3 text-red-500 font-semibold">Critical</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;