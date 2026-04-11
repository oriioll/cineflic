import { supabase } from '@/supabase/supabaseClient'

export const getCurrentSession = async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    return data.session?.user
  } else {
    return null
  }
}

/**
 * Checks if there's a user logged
 * @returns true if its logged, false if not
 * @author Oriol Plazas León
 * @since 11/04/2026
 * @see supabase.auth.getSession()
 */
export const checkIfItsLogged = async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    return true
  } else {
    return false
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
export const supabaseLogin = async (uEmail: string, uPassword: string) => {
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
export const supabaseRegister = async (uEmail: string, uPassword: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: uEmail,
    password: uPassword,
  })
  if (error) {
    throw new Error(error.message)
  }
  await supabaseLogin(uEmail, uPassword)
  return data
}

/**
 * Signs out the current user
 * @author Oriol Plazas León
 * @since 11/04/2026
 * @see supabase.auth.signOut()
 */
export const supabaseLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
  window.location.reload()
}
