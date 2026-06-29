export const getStoredUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      name: payload.name || payload.email,
      role: payload.role || 'Usuario',
    };
  } catch {
    return null;
  }
};
