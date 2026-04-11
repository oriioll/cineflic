import { supabase } from '@/supabase'

export const getCurrentSession = async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    return data.session?.user
  } else {
    return null
  }
}

/**
 * Signs in a User using supabase signInWithPassword supabase method
 * @param uEmail The email of the user
 * @param uPassword The password of the user
 * @returns all the data of the login and user that supabase returns
 * @author Oriol Plazas León
 * @since 11/04/2026
 * @see supabase.auth.signInWithPassword()
 */
const supabaseLogin = async (uEmail: string, uPassword: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: uEmail,
    password: uPassword,
  })
  if (error) {
    throw new Error(error.message)
  }
  return data
}

/**
 * Registers a user into supabase db using auth.signUp supabase method
 * @param uEmail The email of the user
 * @param uPassword The password of the user
 * @returns all the data of the register and user that supabase returns
 * @author Oriol Plazas León
 * @since 11/04/2026
 * @see supabase.auth.signUp()
 */
const supabaseRegister = async (uEmail: string, uPassword: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: uEmail,
    password: uPassword,
  })
  if (error) {
    throw new Error(error.message)
  }
  return data
}

/**
 * Signs out the current user
 * @author Oriol Plazas León
 * @since 11/04/2026
 * @see supabase.auth.signOut()
 */
const supabaseLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}
