import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import noImage from '../Image_not_available.png'

const DisplayRcmdSimilarMovies = ({ movies, genres }) => {
    
    return (
        <div className='movie-container'>
        <div className='row gy-3'>
            {movies && movies.slice(0,10).map(movie => {
                const date = movie.release_date.split('-')[0]
                const genreIds = movie.genre_ids
                let arr = []
                genreIds.forEach(num => {
                    genres.forEach(genre => {
                        if(genre.id === num) arr.push(genre.name)
                    })
                })
                
                return(
                    <div className='col-auto movie' key={movie.id}>
                        <Link to={`${movie.id}`}>
                        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w154${movie.poster_path}` : noImage} alt={movie.title}></img>
                            <div className="description-container">
                                <p style= {{fontWeight:"bold", color:"#090910"}}> {movie.title} {date} <span style={{color:"#F90716", fontWeight:"bold"}}>{movie.vote_average.toFixed(1)}</span> </p>
                                <p style = {{color: "rgb(151, 148, 148)", paddingTop:"0"}}> {arr.join(' ')} </p>
                            </div>
                        </Link>
                    </div>
                )
            })}
            <Outlet />
        </div>
        </div>
    )
}

export default DisplayRcmdSimilarMovies