import { useEffect } from 'react';
import { useRouter } from "next/navigation";

const useProtectedRoute = () => {
  const router = useRouter();

  useEffect(() => {
    // Mengecek token dari localStorage
    const token = localStorage.getItem('jwt');

    // Jika token tidak ada, redirect ke halaman login
    if (!token) {
      router.push('/'); // Ganti dengan URL halaman login kamu
    }
  }, [router]);
};

export default useProtectedRoute;
