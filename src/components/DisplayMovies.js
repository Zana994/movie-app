import React from 'react'
import { useState, useEffect } from 'react'
import { Link, Outlet} from 'react-router-dom';
import './style/displayMovies.css'
import noImage from '../Image_not_available.png'

const DisplayMovies = ( {movies, genres, loadBtn} ) => {
    const [showMovies, setShowMovies] = useState(false)
    
    useEffect(() => {
        setShowMovies(false)

    }, [loadBtn])

    const loadMore = () => {
        setShowMovies(!showMovies)
    }

    return (
        <div className="container movie-container">
            <div className="row gy-3 justify-content-center">
                {movies.slice(0,25).map((movie, index) => {
                    const date = movie.release_date.split('-')[0]
                    const genreIds = movie.genre_ids
                    let arr = []
                    genreIds.forEach(num => {
                        genres.forEach(genre => {
                            if(genre.id === num) arr.push(genre.name)
                        })
                    })
            
                    if(index < 12) {
                        return(
                            <div className="col-auto movie" key={movie.id}>
                                <Link to={`${movie.id}`}>
                                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w154${movie.poster_path}` : noImage} alt={movie.title}></img>
                                <div className="description-container">
                                    <p style= {{fontWeight:"bold", color:"#090910"}}> {movie.title} {date} <span style={{color:"#F90716", fontWeight:"bold"}}>{movie.vote_average.toFixed(1)}</span> </p>
                                    <p style = {{color: "rgb(151, 148, 148)", paddingTop:"0"}}> {arr.join(' ')} </p>
                                </div>
                                </Link>
                            </div>
                        )
                    }
                    else if(index === 12) {
                        return(
                            <div className={`col-12 btn-col ${showMovies ? 'hidden' : ''}`} key={index}>
                                <button className="load_more_btn" onClick={loadMore}>Load More</button>
                            </div>
                        )
                    }
                    else if(index >= 12) {
                        return(
                            <div className={`col-auto movie ${showMovies ? '' : 'hidden'}`} key={movie.id}>
                                <Link to={`${movie.id}`}>
                                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w154${movie.poster_path}` : noImage} alt={movie.title}></img>
                                <div className="description-container">
                                    <p style= {{fontWeight:"bold", color:"#090910"}}> {movie.title} {date} <span style={{color:"#F90716", fontWeight:"bold"}}>{movie.vote_average.toFixed(1)}</span> </p>
                                    <p style = {{color: "rgb(151, 148, 148)", paddingTop:"0"}}> {arr.join(' ')} </p>
                                </div>
                                </Link>
                            </div>
                        )
                    }
                    return []
                })}
            </div>
            <Outlet />
        </div>
    )
}

export default DisplayMovies