import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for the chart, you can replace this with dynamic data from your state or API.
const data = [
  { name: 'Company A', frequency: 400 },
  { name: 'Company B', frequency: 200 },
  { name: 'Company C', frequency: 700 },
  { name: 'Company D', frequency: 500 },
  { name: 'Company E', frequency: 600 },
];

const CommunicationChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="frequency" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CommunicationChart;
