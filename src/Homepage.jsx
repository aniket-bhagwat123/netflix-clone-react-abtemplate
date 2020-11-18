import React from 'react';
import './App.css';
import Header from './Header'
import Banner from './Banner'
import NetflixOrignal from './NetflixOrignal'
import TrendingNow from './TrendingNow'
import TvSeries from './TvSeries'
import axios from 'axios';


class Homepage extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        movies: {},
        tvShowsapi: {},
    }
    
  }
  componentDidMount() {
    axios.get("https://api.themoviedb.org/4/list/1?api_key=6d509219e4a4930feb8a3e9ae47b3a7a")
      .then((res) => {
        console.log("response===>", res);
        this.setState({ movies: res.data });
      })

    axios.get("https://api.themoviedb.org/3/tv/popular?api_key=6d509219e4a4930feb8a3e9ae47b3a7a&language=en-US&page=1")
      .then((resnew) => {
        console.log("response===>", resnew);
        this.setState({ tvShowsapi: resnew.data });
      })
  }
   
  render() {
    // console.log("this.state.movies==>", this.state.movies)
    return (
        <div className="Homepage">

          {/* header start here */}

            <Header />

          {/* header end here */}

          {/* banner start here */}

            <div className="bannerSection">
                <Banner bannerImg={this.state.movies.results && this.state.movies.results}  />
                <div className="bannerOvarlay"></div>
            </div>

          {/* banner end here */}
          
          {/* tetflix shows slider here */}

            <NetflixOrignal tvmovieshow={this.state.movies.results && this.state.movies.results}/>

          {/* tetflix shows slider here */}

          {/* Trending Now slider here */}
          
          <TrendingNow tvmovieshow={this.state.movies.results && this.state.movies.results}/>

          {/* Trending Now slider here */}

          {/* Tv Series slider here */}

          <TvSeries tvshows={this.state.tvShowsapi.results && this.state.tvShowsapi.results}/>

          {/* Tv Series slider here */}

           
        </div>
      )
    }
   
}

export default Homepage;
