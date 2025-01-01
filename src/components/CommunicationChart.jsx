import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Assuming companies have a communication history and we need to aggregate that for frequency data
const CommunicationChart = ({ companies }) => {
  // Safely check if companies exists and is an array
  const transformData = () => {
    if (!companies || !Array.isArray(companies)) return []; // Return empty array if companies is undefined or not an array

    const data = companies.map(company => {
      const frequency = company.communications ? company.communications.length : 0; // Safely check for communications
      return {
        name: company.name, // Company name
        frequency: frequency, // Communication frequency
      };
    });
    return data;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={transformData()}>
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
