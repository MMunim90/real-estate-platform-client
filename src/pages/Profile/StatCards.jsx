import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Building2,
  Hourglass,
  ShieldX,
  Star,
  BadgeCheck,
  Heart,
  ShoppingCart,
  Home,
  HandCoins,
  FileClock,
  MessageSquareHeart,
  FilePlus,
} from "lucide-react";
import useUserRole from "../../hooks/useUserRole";
import useAuth from "../../hooks/useAuth";

const StatCards = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  // admin stats
  let [stats, setStats] = useState({
    totalUsers: 0,
    totalVerifiedProperties: 0,
    totalPendingProperties: 0,
    totalRejectedProperties: 0,
    totalReviews: 0,
    totalVerifiedAgents: 0,
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/admin-stats`).then((res) => {
      setStats(res.data);
    });
  }, []);

  // agent stats
  const [agentStats, setAgentStats] = useState({
    myAdded: 0,
    mySold: 0,
    unVerified: 0,
    requested: 0,
    rejected: 0,
  });

  useEffect(() => {
    if (role === "agent") {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/agent-stats?email=${user?.email}`
        )
        .then((res) => setAgentStats(res.data))
        .catch((err) => console.error("Failed to load agent stats", err));
    }
  }, [user, role]);

  //user stats
  const [userStats, setUserStats] = useState({
    wishlist: 0,
    bought: 0,
    reviews: 0,
  });

  useEffect(() => {
    if (role === "user" && user?.email) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/user-stats?email=${user.email}`
        )
        .then((res) => setUserStats(res.data))
        .catch((err) => console.error("Failed to load user stats", err));
    }
  }, [user?.email, role]);

  if (role === "admin") {
    stats = [
      {
        title: "Total Users",
        value: stats.totalUsers,
        sub: "Updated monthly",
        icon: <Users size={24} />,
        color: "from-pink-500 to-pink-400",
      },
      {
        title: "Total Verified Properties",
        value: stats.totalVerifiedProperties,
        sub: "+35% This week",
        icon: <Building2 size={24} />,
        color: "from-blue-500 to-blue-400",
      },
      {
        title: "Total Pending Properties",
        value: stats.totalPendingProperties,
        sub: "Last 24h",
        icon: <Hourglass size={24} />,
        color: "from-green-500 to-green-400",
      },
      {
        title: "Total Rejected Properties",
        value: stats.totalRejectedProperties,
        sub: "+15% This week",
        icon: <ShieldX size={24} />,
        color: "from-purple-500 to-purple-400",
      },
      {
        title: "Reviews",
        value: stats.totalReviews,
        sub: "+10% growth",
        icon: <Star size={24} />,
        color: "from-yellow-400 to-yellow-300",
      },
      {
        title: "Total Verified Agents",
        value: stats.totalVerifiedAgents,
        sub: "Updated weekly",
        icon: <BadgeCheck size={24} />,
        color: "from-cyan-500 to-cyan-400",
      },
    ];
  }

  if (role === "agent") {
    stats = [
      {
        title: "My Added Properties",
        value: agentStats.myAdded,
        sub: "Last updated today",
        icon: <Home size={24} />,
        color: "from-indigo-500 to-indigo-400",
      },
      {
        title: "My Sold Properties",
        value: agentStats.mySold,
        sub: "+12% this month",
        icon: <HandCoins size={24} />,
        color: "from-emerald-500 to-emerald-400",
      },
      {
        title: "Unverified Properties",
        value: agentStats.unVerified,
        sub: "Pending approvals",
        icon: <FileClock size={24} />,
        color: "from-rose-500 to-rose-400",
      },
      {
        title: "Total Requested Properties",
        value: agentStats.requested,
        sub: "Requested by users",
        icon: <FilePlus size={24} />,
        color: "from-orange-500 to-orange-400",
      },
      {
        title: "Total Rejected Properties",
        value: agentStats.rejected,
        sub: "Updated daily",
        icon: <ShieldX size={24} />,
        color: "from-purple-500 to-purple-400",
      },
    ];
  }

  if (role === "user") {
    stats = [
      {
        title: "Wishlist",
        value: userStats.wishlist,
        sub: "Tracked user favorites",
        icon: <Heart size={24} />,
        color: "from-rose-500 to-pink-400",
      },
      {
        title: "Total Property Bought",
        value: userStats.bought,
        sub: "Completed purchases",
        icon: <ShoppingCart size={24} />,
        color: "from-emerald-500 to-teal-400",
      },
      {
        title: "My Reviews",
        value: userStats.reviews,
        sub: "Submitted by you",
        icon: <MessageSquareHeart size={24} />,
        color: "from-fuchsia-500 to-pink-400",
      },
    ];
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-4">
      {stats.map((card, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-tr ${card.color} text-white p-4 rounded-xl shadow-lg flex flex-col justify-between`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold">{card.title}</h2>
            {card.icon}
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{card.value}</h3>
            <p className="text-sm">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
