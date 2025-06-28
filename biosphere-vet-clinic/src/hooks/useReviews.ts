import { useEffect, useState } from "react";

export interface Review {
  id: number;
  user_id?: number;
  guest_name?: string;
  guest_phone?: string;
  rating: number;
  text: string;
  created_at: string;
  admin_reply?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/reviews`);
      if (!res.ok) throw new Error("Ошибка загрузки отзывов");
      const data = await res.json();
      setReviews(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [API_URL]);

  return { reviews, loading, error, refetch: fetchReviews };
} 