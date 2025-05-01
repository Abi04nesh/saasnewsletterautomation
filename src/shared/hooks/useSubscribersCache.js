"use client";

import { useMemo, useState, useCallback } from 'react';
import { subscribersAnalytics } from "@/actions/subscribers.analytics";

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

let cachedData = null;
let lastFetchTime = null;

export const useSubscribersCache = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (force = false) => {
    // Return cached data if it's still valid
    if (!force && cachedData && lastFetchTime && (Date.now() - lastFetchTime) < CACHE_DURATION) {
      return cachedData;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await subscribersAnalytics();
      cachedData = data;
      lastFetchTime = Date.now();
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch subscriber data');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Format data for the chart
  const formattedData = useMemo(() => {
    if (!cachedData?.last7Months?.length) return [];
    
    return cachedData.last7Months.map(item => ({
      month: item?.month,
      count: item?.count,
    }));
  }, [cachedData]);

  return {
    data: formattedData,
    loading,
    error,
    refreshData: () => fetchData(true),
    fetchData
  };
};
