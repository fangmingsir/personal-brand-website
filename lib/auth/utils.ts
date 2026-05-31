import { createClient } from '@/lib/supabase/server'
import { Profile } from '@/types'

export async function getCurrentUser(): Promise<Profile | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'admin') {
    throw new Error('Forbidden')
  }
  return user
}
