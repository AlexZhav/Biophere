import { useEffect, useState } from "react";

export interface Question {
  id: number;
  user_id?: number;
  guest_name?: string;
  guest_phone?: string;
  text: string;
  created_at: string;
  admin_reply?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/questions`);
      if (!res.ok) throw new Error("Ошибка загрузки вопросов");
      const data = await res.json();
      setQuestions(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [API_URL]);

  return { questions, loading, error, refetch: fetchQuestions };
} 