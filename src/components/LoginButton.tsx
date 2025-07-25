// src/components/LoginButton.tsx
import { supabase } from '../services/supabaseClient';

const LoginButton = () => {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Login with Google
    </button>
  );
};

export default LoginButton;
