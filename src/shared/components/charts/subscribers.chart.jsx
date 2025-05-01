"use client";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSubscribersCache } from "@/shared/hooks/useSubscribersCache";

const LoadingState = () => (
  <div className="h-[85%] w-full flex flex-col items-center justify-center">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-600">Loading data...</p>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="h-[85%] w-full flex flex-col items-center justify-center">
    <p className="text-red-500 mb-4">{error}</p>
    <button 
      onClick={onRetry}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const SubscribersChart = () => {
  const { data: analyticsData, loading, error, fetchData, refreshData } = useSubscribersCache();
  const data = analyticsData?.last7Months || [];
  const totalCount = analyticsData?.totalCount || 0;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="my-5 p-5 border rounded bg-white w-full md:h-[55vh] xl:h-[60vh]">
      <div className="w-full flex justify-between items-center">
        <div>
          <h3 className="font-medium">Active Subscribers</h3>
          <p className="text-2xl font-semibold mt-1">{totalCount}</p>
        </div>
        <button
          onClick={() => refreshData()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Refresh data"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div className="flex w-full items-center justify-between mb-4">
        <p className="opacity-[.5]">Shows active subscribers over time</p>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-[#EB4898]" />
          <span className="pl-2 text-sm opacity-[.7]">Monthly Growth</span>
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRetry={() => refreshData()} />
      ) : (
        <ResponsiveContainer width="100%" height="85%" className="mt-5">
          <LineChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#EB4898"
              fill="#EB4898"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SubscribersChart;
