"use client";

import { useMemo, useState, useCallback } from 'react';
import { subscribersAnalytics } from "@/actions/subscribers.analytics";

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

let lastFetchTime = null;

export const useSubscribersCache = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async (force = false) => {
    // Return cached data if it's still valid
    if (!force && data && lastFetchTime && (Date.now() - lastFetchTime) < CACHE_DURATION) {
      return data;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await subscribersAnalytics();
      console.log('Analytics result:', result); // Debug log
      if (!result?.last7Months) {
        throw new Error('Invalid data format received');
      }
      setData(result.last7Months);
      lastFetchTime = Date.now();
      return result.last7Months;
    } catch (err) {
      console.error('Error fetching subscribers:', err); // Debug log
      setError(err.message || 'Failed to fetch subscriber data');
      return null;
    } finally {
      setLoading(false);
    }
  }, [data]);

  // Format data for the chart
  const formattedData = useMemo(() => {
    if (!data?.length) return [];
    
    return data.map(item => ({
      month: item?.month || '',
      count: item?.count || 0,
    }));
  }, [data]);

  return {
    data: formattedData,
    loading,
    error,
    refreshData: () => fetchData(true),
    fetchData
  };
};
