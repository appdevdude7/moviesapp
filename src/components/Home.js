import React from 'react';

import {
    IMAGE_BASE_URL,
    API_BASE_URL,
    POSTER_SIZE,
    BACKDROP_SIZE
} from '../config';

import HeroImage from './elements/HeroImage'
import SearchBar from './elements/SearchBar'
import Grid from './elements/Grid'
import MovieThumb from './elements/MovieThumb'
import Spinner from './elements/Spinner'
import LoadMoreBtn from './elements/LoadMoreBtn'

import { useHomeFetch } from './hooks/useHomeFetch'

const Home = () => {
    
    const [{state, loading, error}, fetchMovies] = useHomeFetch();

    if(error) return <div>Something went wrong ..</div>;
    if(!state.movies[0]) return <Spinner />;

    return (
        <>
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`} 
                title={state.heroImage.original_title}
                text={state.heroImage.overview}
            />
            <SearchBar />
            <Grid />
            <MovieThumb />
            <Spinner />
            <LoadMoreBtn />
        </>
    )
}

export default Home;