import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import {Link, Redirect} from 'react-router-dom';

class Banner extends React.Component {
    constructor(props){
        super(props);
        this.state = {
			detailsview : false,
            movieId : "", 
		}
    }
    ViewDetails = (id) =>{
        this.setState({movieId : id, detailsview: true})
    }
    render() {
        if(this.state.detailsview == true){
            return <Redirect to={"/Details/" + this.state.movieId} />
        }
        let {bannerImg} = this.props;
        return (
            <Carousel autoPlaySpeed={1000} autoPlay={true} >
                {bannerImg && bannerImg.map((item) => {
                    return(
                        <div>
                            <img src={" http://image.tmdb.org/t/p/original"+item.backdrop_path} />
                            <div className="bannContent col-md-12">
                                <h2>{item.title}</h2>
                                <div className="bannerGroup">
                                    <button type="button" className="btn bannerbnt" onClick={() => this.ViewDetails(item.id)}>Play</button>
                                    <button type="button" className="btn bannerbnt" onClick={() => this.ViewDetails(item.id)}>My List</button>
                                </div>
                                <p>{item.overview}</p>
                            </div>
                        </div>
                    )
                })}
            </Carousel>
        )
    }
   
}
export default Banner;
