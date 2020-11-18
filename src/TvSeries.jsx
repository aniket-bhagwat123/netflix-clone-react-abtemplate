import React from 'react';
import Slider from "react-slick";
import {Link, Redirect} from 'react-router-dom';

class TvSeries extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            detailsview : false,
            tvshowId : "", 
		}
    }

    ViewDetails = (id) =>{
      this.setState({tvshowId : id, detailsview: true})
    }
    
    render() {
        if(this.state.detailsview == true){
            return <Redirect to={"/TvSeriesDetails/" + this.state.tvshowId} />
        }
        let {tvshows} = this.props;
        var settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 1500,
            slidesToShow: 8,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 1
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 540,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                }
              ]
          };
        return (
            <div className="movielist">
                <div className="col-md-12">
                    <h3 className="showsHead">TV Show</h3>
                    <div className="slidermainShow">
                        <Slider {...settings}>
                            {tvshows && tvshows.map((poster) => {
                                return(
                                    <div className="itemMovielist" onClick={() => this.ViewDetails(poster.id)}>
                                        <img src={" http://image.tmdb.org/t/p/w185/"+poster.backdrop_path} className="img-responsive"/>
                                    </div>
                                    )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
   
}
export default TvSeries;
