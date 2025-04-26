import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FinancialSummary() {
  const [services, setServices] = useState([]);
  const feeRate = 0.1; // 10% platform fee

  useEffect(() => {
    axios.get('/api/services').then(res => setServices(res.data));
  }, []);

  const totalContracts = services.length;
  const grossRevenue = services.reduce((sum, s) => sum + s.price, 0);
  const netRevenue = grossRevenue * (1 - feeRate);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Financial Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Total Contracts</p>
          <p className="text-3xl font-bold">{totalContracts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Gross Revenue</p>
          <p className="text-3xl font-bold">₹{grossRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Net Revenue</p>
          <p className="text-3xl font-bold">₹{netRevenue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
