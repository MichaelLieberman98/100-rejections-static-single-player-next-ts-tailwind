import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        // Redirect to home page
        router.push('/About');
      } else {
        // Show error message
        // console.log("LOGOUT DIDNT WORK");
      }
    }

    logout();
  }, []);

  return (
    <div>
      Logging you out, please wait...
    </div>
  );
}
