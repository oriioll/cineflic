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

/**
 * Gets all the ids of the movies that are stored into users db with param status
 * @param status The status of the movie - 'favoritos', 'para-ver', 'vistas'
 * @returns Array with movies ids
 * @author Oriol Plazas León
 * @since 12/04/2026
 * @see getUserIdOrNull()
 */
export const getUserMoviesWithStatus = async (status: string) => {
  const userId = await getUserIdOrNull()
  if (!userId) {
    throw new Error('No user logged')
  }
  const { data, error } = await supabase
    .from('user_movies')
    .select('movie_id')
    .eq('user_id', userId)
    .eq('status', status)
  if (error) {
    throw new Error(error.message)
  }
  console.log(data)
  return data.map((row) => row.movie_id)
}

/**
 * Gets the id of the current logged user
 * @returns The current user id if exists, or null
 * @author Oriol Plazas León
 * @since 12/04/2026
 * @see supabase.auth.getSession()
 */
export const getUserIdOrNull = async () => {
  const { data } = await supabase.auth.getSession()
  return data.session?.user.id || null
}

/**
 * Inserts a movie into DB - table: user_movies
 * @param status The status of the movie - 'favoritos', 'para-ver', 'vistas'
 * @param movieId The id of the movie you want to insert
 * @author Oriol Plazas León
 * @since 12/04/2026
 * @throws Error if there is not userLogged, if the insert is incorrect or if the status isn't correct
 */
export const addMovieToStatus = async (status: string, movieId: number) => {
  const availableStatus = ['favoritos', 'para-ver', 'vistas']
  if (!availableStatus.includes(status)) {
    throw new Error('No se puede añadir pelicula a ese estado')
  }
  const userId = await getUserIdOrNull()
  if (!userId) {
    throw new Error('No user logged')
  }
  const { error } = await supabase.from('user_movies').insert({
    movie_id: movieId,
    status: status,
    user_id: userId,
  })
  if (error) {
    throw new Error(error.message)
  }
}

export const deleteMovieFromStatus = async (status: string, movieId: number) => {
  const availableStatus = ['favoritos', 'para-ver', 'vistas']
  if (!availableStatus.includes(status)) {
    throw new Error('No se puede borrar la pelicula de ese estado')
  }
  const userId = await getUserIdOrNull()
  if (!userId) {
    throw new Error('No user logged')
  }
  const { error } = await supabase
    .from('user_movies')
    .delete()
    .eq('user_id', userId)
    .eq('status', status)
    .eq('movie_id', movieId)
  if (error) {
    throw new Error('Cannot delete data')
  }
}
