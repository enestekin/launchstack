'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';

export async function login(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return {
      status: error?.status || 500,
      error: error?.message,
    };
  } else if (!data.email || !data.password) {
    return {
      status: 400,
      error: 'Email and password are required.',
    };
  }
  revalidatePath('/', 'layout');
  return {
    status: 'success',
    message: 'Login successful.',
  };
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return {
      status: error.status || 500,
      error: error.message,
    };
  } else if (!data.email || !data.password) {
    return {
      status: 400,
      error: 'Email and password are required.',
    };
  }

  revalidatePath('/', 'layout');
  return {
    status: 'success',
    message: 'Signup successful. Please check your email for confirmation.',
  };
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/');
  }

  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function getUserSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return null;
  }

  return {
    user: data.session?.user || null,
    status: 'success',
  };
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  });

  if (error) {
    return {
      status: error.status || 500,
      error: error.message,
    };
  }

  return {
    status: 'success',
    message: 'Password reset email sent. Please check your inbox.',
  };
}

export async function resetPassword(formData: FormData, code: string) {
  const supabase = await createClient();
  const { error: CodeError } = await supabase.auth.exchangeCodeForSession(code);

  if (CodeError) {
    return {
      status: CodeError.status || 500,
      error: CodeError.message,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: formData.get('password') as string,
  });

  if (error) {
    return {
      status: error.status || 500,
      error: error.message,
    };
  }

  return {
    status: 'success',
    message: 'Password reset successful.',
  };
}
