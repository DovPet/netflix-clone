import React from 'react'
import "./HomeScreen.css"
import Nav from '../../components/nav/Nav'
import Banner from '../../components/banner/Banner'
import Row from '../../components/row/Row'
import requests from './../../requests';

function HomeScreen() {
    return (
        <div className='homeScreen'>
            <Nav />
            <Banner />
            <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} /> 
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} /> 
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </div>
    )
}

export default HomeScreen
