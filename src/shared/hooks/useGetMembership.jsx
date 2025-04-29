"use client";

import { getMemberShip } from "@/actions/get.membership";
import { useEffect, useState } from "react";

const useGetMembership = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const res = await getMemberShip();
        setData(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembership();
  }, []);

  return { data, loading };
};

export default useGetMembership;
