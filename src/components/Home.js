import React, { useState } from 'react';

import {
    IMAGE_BASE_URL,
    API_BASE_URL,
    POSTER_SIZE,
    BACKDROP_SIZE,
    API_URL,
    API_KEY
} from '../config';

import HeroImage from './elements/HeroImage'
import SearchBar from './elements/SearchBar'
import Grid from './elements/Grid'
import MovieThumb from './elements/MovieThumb'
import Spinner from './elements/Spinner'
import LoadMoreBtn from './elements/LoadMoreBtn'

import { useHomeFetch } from './hooks/useHomeFetch'

import NoImage from './images/no_image.jpg'

const Home = () => {
    
    const [{state, loading, error}, fetchMovies] = useHomeFetch();
    const [searchTerm, setSearchTerm] = useState('');

    const loadMoreMovies = () => {
        const searchEndPoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${currentPage + 1}`;
        const popularEndPoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${currentPage + 1}`;

        const endpoint = searchTerm ? searchEndPoint : popularEndPoint;

        fetchMovies(endpoint);
    }

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
            <Grid header={ searchTerm ? 'Search Result' : 'Popular Movies' }>
                {state.movies.map(movie => (
                    <MovieThumb 
                        key={movie.id}
                        clickable
                        image={ movie.poster_path 
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                            : NoImage
                         } 
                        movieId = {movie.id}
                        movieName={movie.original_title}
                    />
                )) }
            </Grid>
            {loading && <Spinner/>}
            <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
        </>
    )
}

export default Home;