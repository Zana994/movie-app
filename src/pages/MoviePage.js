import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './style/moviePage.css'
import StarRating from '../components/StarRating'
import DisplayRcmdSimilarMovies from '../components/DisplayRcmdSimilarMovies'
import noImage from '../Image_not_available.png'
import noBgdImage from '../image_not_available_bgd.png'

const MoviePage = ({ genres }) => {
    const { id } = useParams()
    const [movieDetails, setMovieDetails] = useState([])
    const [recommendedMovies, setRecommendedMovies] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const api_key = process.env.REACT_APP_API_KEY

    const [visited, setVisited] = useState(() => {
        const saved = localStorage.getItem('visitedMovies')
        const initialValue = JSON.parse(saved)
        return initialValue || []
    })

    const fetchMovie = async (url) => {
        const result = await fetch(url)
        const data = await result.json()

        return data
    }

    const handleFavorite = (index) => {

        const updateVisited = visited.map(movie => {
            if(movie.id === index) return {...movie, favorite: !movie.favorite}
            else return movie
        })
        setVisited(updateVisited)
    }

    const checkDuplicates = (id) => {
        let exist = false
        if(visited) {
            for(let i = 0; i < visited.length; i++) {
                if(visited[i].id === parseInt(id)) {
                    exist = true;
                    break;
                }
            }
        }
        return exist
    }
   

    useEffect(() => {
        const setData = async () => {
            setMovieDetails([])
            setRecommendedMovies([])

            const movie_details = await fetchMovie(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&append_to_response=credits&language=en-US`)
            const visited_movie = await fetchMovie(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`)
            visited_movie.favorite = false
            setMovieDetails(() => [movie_details])
            if(!checkDuplicates(id)) {
                setVisited((previous) => [...previous, visited_movie])
            }

            const recommended = await fetchMovie(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`)
            setRecommendedMovies(() => [...recommended.results])

            const similar = await fetchMovie(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}&language=en-US&page=1`)
            setSimilarMovies(() => [...similar.results])

        }
        setData()

    }, [id])

    useEffect(() => {
        localStorage.setItem('visitedMovies', JSON.stringify(visited))

    }, [visited])

    const setClassName = () => {
        let c = 'bi bi-heart';
        visited.forEach(movie => {
            if(movie.id === parseInt(id) && movie.favorite === true) c = 'bi bi-heart-fill'
        })
        return c 
    }

    return (
        <>
            {movieDetails && movieDetails.map(movie => {
                let director = []
                let writer = []
                let actor = []
                let rating = (movie.vote_average/10)*5
                let ImageUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                if(!movie.backdrop_path) ImageUrl = noBgdImage
                
                return (
                <div className='wrapper' key={movie.id}>
                <div className='container-fluid bgd_container' style={{ backgroundImage: `url(${ImageUrl})` }}></div>
                <div className='container movie_details_container'>
                <div className='movie-poster'>
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : noImage} alt={movie.title}></img>
                    <span className='favorite' onClick={() => handleFavorite(movie.id)}>
                        <i className={setClassName()} style={{color: '#F92727', fontSize: '1.5rem'}}></i>
                    </span>
                    <div className='rating' style={{marginTop: '0.5rem'}}>
                        <StarRating rating = {rating} vote = {movie.vote_average} />
                    </div>
                </div>
                <div className='details'>
                    <p><b> Title: </b>{movie.title}</p>
                    <p><b> Duration: </b>{movie.runtime} min</p>
                    <p><b> Year of release: </b>{movie.release_date.split('-')[0]}</p>
                    <p><b> Genres: </b>
                    {movie.genres && movie.genres.map(genre => {
                        return <span key={genre.id}> {genre.name} </span>
                    })}
                    </p>
                    <p><b> Legend: </b>{movie.tagline}</p>
                    <p><b> Overview: </b>{movie.overview}</p>
                    <p><b> IMDB: </b><a href={`https://www.imdb.com/title/${movie.imdb_id}/?ref_=nv_sr_srsg_0`} rel="noreferrer nofollow" target='_blank'> {movie.title} </a></p>
                    <hr></hr>
                    <p><b> CREDITS </b></p>
                    {movie.credits.cast.forEach(person => {
                        if(person.known_for_department === "Acting" && actor.length < 4) actor.push(person.name)
                    })}
                    {movie.credits.crew.forEach(person => {
                        if(person.known_for_department === "Directing" && director.length < 3) {
                            if(!director.includes(`${person.name}`)) director.push(person.name)
                        } 
                        else if(person.known_for_department === "Writing" && writer.length <3){
                            if(!writer.includes(`${person.name}`)) writer.push(person.name)
                        } 
                    })}
                    <p><b> Director: </b>{director.join(', ')}</p>
                    <p><b> Writer: </b>{writer.join(', ')}</p>
                    <p><b> Actors: </b>{actor.join(', ')}</p>
                </div>
                </div>

                <div className='container recommended_similar_movie_container'>
                    <h5>Recommended movies:</h5>
                    <DisplayRcmdSimilarMovies movies = {recommendedMovies} genres = {genres} />
                    <h5>Similar movies:</h5>
                    <DisplayRcmdSimilarMovies movies = {similarMovies} genres = {genres} />
                </div>
                </div>
                )
            })} 
        </> 
    )
}

export default MoviePage