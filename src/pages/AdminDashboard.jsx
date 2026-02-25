import { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingBag, DollarSign } from 'lucide-react';
import StatCard from '../components/dashboard/Statcard.jsx';
import SalesChart from '../components/dashboard/Saleschart.jsx';
import OrderStatusPie from '../components/dashboard/OrderStatusPie.jsx';
import API from '../api/axios';
import { AuthContext } from '../context/Authcontext.jsx';

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await API.get('/adminStats', { headers });
        const data = res.data;

        setStats({
          totalUsers: data.totalUsers,
          totalProducts: data.totalProducts,
          totalOrders: data.totalOrders,
          monthlyRevenue: data.monthlyRevenue
        });
        setSalesData(data.salesPerMonth || []);
        setOrderStatusData(data.ordersStatus || []);
        setLowStock(data.lowStock || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        // Fallback mock data
        const mockData = {
          totalUsers: 50,
          totalProducts: 20,
          totalOrders: 15,
          monthlyRevenue: 1200,
          salesPerMonth: [
            { month: 'Jan', sales: 400 },
            { month: 'Feb', sales: 600 },
            { month: 'Mar', sales: 1200 }
          ],
          ordersStatus: [
            { status: 'pending', count: 5 },
            { status: 'shipped', count: 7 },
            { status: 'delivered', count: 3 }
          ],
          lowStock: [
            { _id: '1', name: 'Shirt', stock: 2 },
            { _id: '2', name: 'Jeans', stock: 1 }
          ]
        };
        setStats(mockData);
        setSalesData(mockData.salesPerMonth);
        setOrderStatusData(mockData.ordersStatus);
        setLowStock(mockData.lowStock);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;

  return (
    <>
      <div className="admin-dashboard">
        {/* Stat Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="stats-grid"
        >
          <StatCard title="Total Users" value={stats.totalUsers} icon={Users} trend="up" percentage={12} />
          <StatCard title="Total Products" value={stats.totalProducts} icon={Package} trend="up" percentage={5} />
          <StatCard title="Total Orders" value={stats.totalOrders} icon={ShoppingBag} trend="up" percentage={8} />
          <StatCard title="Revenue (Month)" value={stats.monthlyRevenue} icon={DollarSign} trend="up" percentage={15} />
        </motion.div>

        {/* Charts */}
        <div className="charts-grid">
          <SalesChart data={salesData} />
          <OrderStatusPie data={orderStatusData} />
        </div>

        {/* Low Stock Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="low-stock-card"
        >
          <h2 className="section-title">Low Stock Alerts</h2>
          <table className="low-stock-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td className="status-critical">Critical</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      <style>{`
        .admin-dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          animation: fadeIn 0.5s ease-out;
        }

        .dashboard-loading {
          text-align: center;
          padding: 2rem;
          color: #666;
          font-size: 1.2rem;
        }

        /* Stats grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        /* Charts grid */
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        /* Low stock card */
        .low-stock-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 1.8rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08),
                      0 6px 12px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .low-stock-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 50px rgba(0, 0, 0, 0.12),
                      0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 1.5rem 0;
          letter-spacing: -0.01em;
          position: relative;
        }

        .section-title::after {
          content: '';
          display: block;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #007aff, #0051d5);
          border-radius: 2px;
          margin-top: 0.3rem;
        }

        /* Low stock table */
        .low-stock-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 1rem;
        }

        .low-stock-table thead tr {
          background: #f5f5f7;
          border-radius: 12px;
        }

        .low-stock-table th {
          text-align: left;
          padding: 1rem;
          font-weight: 600;
          color: #1a1a1a;
          border-bottom: 2px solid #e0e0e0;
        }

        .low-stock-table td {
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
          color: #444;
        }

        .low-stock-table tbody tr:last-child td {
          border-bottom: none;
        }

        .low-stock-table tbody tr:hover td {
          background-color: #fafafa;
        }

        .status-critical {
          color: #d32f2f;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.02em;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .admin-dashboard {
            padding: 20px 15px;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }

          .low-stock-table th,
          .low-stock-table td {
            padding: 0.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default AdminDashboard;