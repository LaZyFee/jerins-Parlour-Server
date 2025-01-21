export const apiUrl =
  process.env.NODE_ENV === "production"
    ? `${window.location.origin}/api`
    : import.meta.env.VITE_API_URL;
