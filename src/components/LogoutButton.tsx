// src/components/LogoutButton.tsx
import { supabase } from '../services/supabaseClient';

const LogoutButton = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
