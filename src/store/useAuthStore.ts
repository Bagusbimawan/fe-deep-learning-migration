import { create } from "zustand";

interface User {
  ID: number;
  Username: string;
  Email: string;
  token: string;
  Phone: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  // Initialize state from localStorage if available
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  // Add storage event listener to sync state across tabs
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key === 'user') {
        const newUser = event.newValue ? JSON.parse(event.newValue) : null;
        set({ user: newUser });
      }
    });
  }
  
  return {
    user: initialUser,
    setUser: (user) => {
      set({ user });
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    logout: () => {
      set({ user: null });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
  };
});
