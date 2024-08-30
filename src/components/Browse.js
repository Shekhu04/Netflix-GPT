import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';


function Browse() {

    useNowPlayingMovies();

  return (
    <div>
        <Header/>
       {
        /*
            MainContaianer
              -VideoBG
              -Video Title
            SecondaryContainer
              -MovieList * n
              -Cards * n
        */
       }
       <MainContainer/>
       <SecondaryContainer/>

    </div>
  )
}

export default Browse