import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import axios from '../../axios'
import './Row.css'

function Row({ title, fetchUrl, isLargeRow = false }) {

    const [movies, setMovies] = useState([])
    const base_url = "https://image.tmdb.org/t/p/original/"
    const listRef = useRef()

    const handleClick = direction => {
        let distance = listRef.current.getBoundingClientRect().x - 50

        if(direction === "left"){
            listRef.current.style.transform = `translateX(${400 + distance}px)`
        }
        if(direction === "right"){
            listRef.current.style.transform = `translateX(${-400 + distance}px)`
        }
    }

    useEffect(() => {
        async function fetchData() {
            const req =  await axios.get(fetchUrl)
            setMovies(req.data.results)
            return req
        }
        fetchData()
    }, [fetchUrl])

    
        return (
            <div className="row">
                <h2 className="row__title">{title}</h2>
                
                <div className="row__row">
                <MdOutlineArrowBackIosNew className='sliderArrow left' onClick={() => handleClick("left")} />
                <div className="row__posters" ref={listRef}>
                    {movies.map(movie => {
                        const movieName = movie?.title || movie?.name || movie?.original_name
                        return (
                            ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                                <a target="_blank" rel="noreferrer" 
                                    href={`https://www.imdb.com/find?q=${movieName && movieName.split(' ').join('+')}`}
                                    className={`row__poster ${isLargeRow && 'row__posterLarge'}`} >
                                    <img 
                                    key={movie.id} 
                                    alt={movieName}

                                    src={base_url + (isLargeRow ? movie.poster_path : movie.backdrop_path)} />
                                </a>
                            )
                        )
                    })}
                </div>
                <MdOutlineArrowForwardIos className='sliderArrow right' onClick={() => handleClick("right")} />
                </div>
            </div>
        );
    }

export default Row
