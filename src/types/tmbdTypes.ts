// tipus
export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id?: number
  title: string
  poster_path?: string
  vote_average?: number
  release_date?: string
  genre_ids?: number[]
  overview?: string
}

export interface DetailedMovie {
  id?: number
  title: string
  poster_path?: string
  backdrop_path?: string // imatge gran de fons
  vote_average?: number
  release_date?: string
  runtime?: number // durada en minuts
  overview?: string
  genres?: Genre[] // aquí ja et ve el nom directament
  tagline?: string // frase icònica de la peli
}
