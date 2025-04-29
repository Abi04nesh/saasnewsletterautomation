"use client";

import { subscribersAnalytics } from "@/actions/subscribers.analytics";
import { useEffect, useState } from "react";

const useSubscribersAnalytics = () => {
  const [subscribersData, setSubscribersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await subscribersAnalytics();
        setSubscribersData(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { subscribersData, loading };
};

export default useSubscribersAnalytics;
