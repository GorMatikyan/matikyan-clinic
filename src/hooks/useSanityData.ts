import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";

export function useSanityData<T>(query: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch<T>(query)
      .then((result) => {
        const isEmpty = Array.isArray(result) ? result.length === 0 : !result;
        if (!isEmpty) setData(result);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [query]);

  return { data, loading };
}
