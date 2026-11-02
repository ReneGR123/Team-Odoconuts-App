import { supabase } from "../utils/supabase";

//This checks if the user is logged in and gives the backend the token if so
export async function apiRequest(path, options = {}) {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error ?? `Request failed with status ${response.status}`);
  }

  return data;
}