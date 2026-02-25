import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, percentage }) => {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';
  const TrendIcon = trend === 'up' ? ArrowUp : ArrowDown;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-md border"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold">{value.toLocaleString()}</h3>
        </div>
        <div className="p-3 bg-indigo-100 rounded-lg">
          <Icon className="text-indigo-600" size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className={`flex items-center ${trendColor}`}>
          <TrendIcon size={16} />
          {percentage}%
        </span>
        <span className="text-gray-400">vs last month</span>
      </div>
    </motion.div>
  );
};

export default StatCard;