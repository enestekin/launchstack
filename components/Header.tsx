import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

import Logout from './Logout';

export default async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link href="/" className="text-xl font-bold">
        LaunchStack
      </Link>
      <nav className="flex gap-4 items-center">
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Logout />
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/sign-up">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
