const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN
const headers = { Authorization: `Bearer ${API_TOKEN}` }

/**
 * Fetches the TMDB API to the endpoint specified in spanish
 * @param endpoint The endpoint of TMDB you want to fetch
 * @returns {Promise<Object>} The response of the fetch
 * @throws Error - When !response.ok
 * @author Oriol Plazas Lrón
 * @since 03/04/2026
 */
const fetchTMDB = async (endpoint: string) => {
  const separator = endpoint.includes('?') ? '&' : '?'
  //Set lang to spanish
  const lang = `${separator}language=es-ES`
  const response = await fetch(BASE_URL + endpoint + lang, { headers })
  if (!response.ok) {
    throw new Error(`TMDB ERROR [${response.status}]: Endpoint: ${endpoint}`)
  }
  return response.json()
}

/**
 * Get a list of movie genres
 * @return {Promise<Object>} List of all available movie genres
 * @author Oriol Plazas León
 * @since 03/04/2026
 * @see fetchTMDB()
 */
export const getGenres = () => fetchTMDB('/genre/movie/list')

/**
 * Get the most popular movies right now
 * @return {Promise<Object>} List of popular movies
 * @author Oriol Plazas León
 * @since 03/04/2026
 * @see fetchTMDB()
 */
export const getPopulars = () => fetchTMDB('/movie/popular')
/**
 * Get popular movies for a specific region
 * @param {string} region - The region code (e.g., 'US', 'ES')
 * @return {Promise<Object>} List of popular movies in the selected region
 * @author Oriol Plazas León
 * @since 03/04/2026
 * @see fetchTMDB()
 */
export const getRegionPopulars = (region: string) => fetchTMDB(`/movie/popular?region=${region}`)

/**
 * Get details about a specific movie
 * @param {number} movieId - The ID of the movie
 * @return {Promise<Object>} Complete information about the movie
 * @author Oriol Plazas León
 * @since 03/04/2026
 * @see fetchTMDB()
 */
export const getMovieById = (movieId: number) => fetchTMDB(`/movie/${movieId}`)

/**
 * Get videos and trailers for a specific movie
 * @param {number} movieId - The ID of the movie
 * @return {Promise<Object>} Videos and trailers available for the movie
 * @author Oriol Plazas León
 * @since 03/04/2026
 * @see fetchTMDB()
 */
export const getMovieVideoById = (movieId: number) =>
  fetchTMDB(`/movie/${movieId}/videos?include_video_language=es,en`)

/**
 * Get the cast and crew for a specific movie
 * @param {number} movieId - The ID of the movie
 * @return {Promise<Object>} Actors and crew members who worked on the movie
 * @author Oriol Plazas León
 * @since 03/04/2026
 * @see fetchTMDB()
 */
export const getMovieCastById = (movieId: number) => fetchTMDB(`/movie/${movieId}/credits`)

/**
 * Search for movies by title or keywords
 * @param {string} query - The search term or movie title
 * @return {Promise<Object>} Movies that match the search results
 * @author Oriol Plazas León
 * @since 03/04/2026
 * @see fetchTMDB()
 */
export const getMovieByQuery = (query: string) => fetchTMDB(`/search/movie?query=${query}`)

/**
 * Get movies from a specific genre
 * @param {string} genre - The genre ID or name
 * @return {Promise<Object>} Movies that belong to the selected genre
 * @author Oriol Plazas León
 * @since 03/04/2026
 * @see fetchTMDB()
 */
export const getMoviesByGenre = (genre: string) => fetchTMDB(`/discover/movie?with_genres=${genre}`)
