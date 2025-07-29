import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import useAuth from "../../../hooks/useAuth"; 

const SellingStatistics = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        const res = await axiosSecure.get(`/sold-properties?agentEmail=${user?.email}`);
        const formatted = res.data.map((item) => ({
          name: item.title,
          soldPrice: item.soldPrice,
        }));
        setData(formatted);
      } catch (err) {
        console.error("Error fetching sold statistics:", err);
      }
    };

    if (user?.email) {
      fetchSoldProperties();
    }
  }, [user?.email, axiosSecure]);

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return (
      <path
        d={`M${x},${y + height}
        C${x + width / 3},${y + height}
         ${x + width / 2},${y + height / 3}
         ${x + width / 2},${y}
        C${x + width / 2},${y + height / 3}
         ${x + (2 * width) / 3},${y + height}
         ${x + width},${y + height}
        Z`}
        stroke="none"
        fill={fill}
      />
    );
  };

  return (
    <div className="min-h-screen py-12 md:px-10 bg-blue-50 text-gray-800">
      <Helmet>
        <title>Selling Statistics | BrickBase</title>
      </Helmet>

      <h2 className="text-3xl md:text-5xl font-semibold text-center mb-10">
        Property Selling Statistics
      </h2>

      <div className="w-full overflow-x-auto pl-2 pr-8">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={data} barSize={60}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="soldPrice"
              shape={<TriangleBar />}
              label={{ position: "top", fill: "#000", fontSize: 14 }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"][
                      index % 5
                    ]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SellingStatistics;
