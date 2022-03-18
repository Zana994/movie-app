import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import noImage from '../Image_not_available.png'

const Visited = ({ genres }) => {
    const saved = localStorage.getItem('visitedMovies')
    const initialValue = JSON.parse(saved)
    
  return (
    <div className='container movie-container' style={{marginTop:'2rem'}}>
       <div className='row gy-3'>
           {initialValue && initialValue.map(movie => {
               const date = movie.release_date.split('-')[0]
               let arr = []
               movie.genres.forEach(genre => {
                   arr.push(genre.name)
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

export default Visited