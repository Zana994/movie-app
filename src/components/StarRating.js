import React from 'react'

const StarRating = ({ rating, vote }) => {
    let arr_icons = []
    
    for(let i=0; i<parseInt(rating); i++) {
        arr_icons.push('-fill')
    }
    if(rating - parseInt(rating) > 0.25 && rating - parseInt(rating) < 0.75) arr_icons.push('-half')
    while(arr_icons.length !== 5) {
        arr_icons.push('')
    }

    return (
        <div>
            {arr_icons.map((star, index) => {
                return (
                <i className={`bi bi-star${star}`} key={index} style={{color: '#F9B208', marginRight: '0.25rem'}}></i>
                )
            })}
            {vote.toFixed(1)}
        </div>
    )
}

export default StarRating