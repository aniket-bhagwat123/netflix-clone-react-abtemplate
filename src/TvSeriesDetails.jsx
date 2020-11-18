import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import {Link, Redirect} from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class TvSeriesDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        tvshowsDetails: {},
        tvshowsVideos: {},
        videoUrl:"",
        languages:[],
        runtime:[],
        tvshowseasons:"",
        modalIsOpen: false
      }
    }

    HomereDirect = () => {
      this.setState({homePage: true})
    }
     
    componentDidMount(){
      this.tvshowsdetailsAPI();
      this.tvshowsVideoAPI();
    }

    tvshowsdetailsAPI = () =>{
      console.log("url data===>", this.props.match.params.id);
      axios.get("https://api.themoviedb.org/3/tv/"+this.props.match.params.id+"?api_key=6d509219e4a4930feb8a3e9ae47b3a7a")
      .then((res) => {
        console.log("response===>", res);
        this.setState({ tvshowsDetails: res.data,languages: res.data.languages,tvshowseasons: res.data.seasons.length,runtime: res.data.episode_run_time});
      })
    }

    tvshowsVideoAPI = () =>{
      console.log("url data===>", this.props.match.params.id);
      axios.get("https://api.themoviedb.org/3/tv/"+this.props.match.params.id+"/videos?api_key=6d509219e4a4930feb8a3e9ae47b3a7a")
      .then((res) => {
        console.log("response===>", res);
        this.setState({ tvshowsVideos: res.data,videoUrl: res.data.results[0].key});
      })
    }

    openModal = () => {
      this.setState({modalIsOpen: true})
    }

    closeModal = () => {
      this.setState({modalIsOpen: false})
    }
 
     render() {
        if(this.state.homePage == true){
            return <Redirect to={"/"} />
        }
        // let { } = this.props;
        let {tvshowsDetails,tvshowsVideos, modalIsOpen} = this.state;
        return (
          <div className="mainwrapper">
            {/* header start here */}
            <Header />
            {/* header end here */}

            <div className="mainDetailscomp">
                <div className="backgrImgwrap">
                    <div className="backgrImg" onClick={() => this.openModal()}>
                        <img src={"http://image.tmdb.org/t/p/original"+ tvshowsDetails.backdrop_path} className="img-responsive backGrImage"/>
                        <div className="plybuton">
                            <i class="fa fa-play" aria-hidden="true"></i>
                        </div>
                        <div class="bannerOvarlay"></div>
                    </div>
                    <div className="detailsMovieset">
                        <div className="container">
                            <div className="detailsMoviesetmg">
                                <div className="mainsmllImg">
                                    <img src={"https://image.tmdb.org/t/p/w185/"+ tvshowsDetails.poster_path} className="img-responsive"/>
                                </div>
                                <div className="detailshere">
                                    <h2>{tvshowsDetails.name}</h2>
                                    <button className="btn backbtn" onClick={() => this.HomereDirect()}>Back</button>
                                    <p>{tvshowsDetails.overview}</p>
                                    <ul className="listdetails">
                                        <li><span>Release Date :</span>{tvshowsDetails.first_air_date}</li>
                                        <li>
                                            <span>Runtime :</span>
                                            <ul className="langlist">
                                            {this.state.runtime.map((time) => {
                                                return(
                                                    <li>{time} Min</li>
                                                )
                                            })}
                                            </ul>
                                        </li>
                                        <li>
                                            <span>Languages :</span>
                                            <ul className="langlist">
                                            {this.state.languages.map((lang) => {
                                                return(
                                                    <li>{lang}</li>
                                                )
                                            })}
                                            </ul>
                                        </li>
                                        <li><span>Total Seasons :</span>{this.state.tvshowseasons}</li>
                                        <li><span>Total Episodes :</span>{tvshowsDetails.number_of_episodes}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* modal start here */}
                    <Modal isOpen={modalIsOpen} onRequestClose={() => this.closeModal()} style={customStyles} contentLabel="Example Modal" >            
                      <span className="closepopup" onClick={() => this.closeModal()}>
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </span>
                      <div className="modalvideo">
                        <iframe src={"https://www.youtube.com/embed/"+this.state.videoUrl}  allowfullscreen></iframe>
                      </div>
                    </Modal> 
                    {/* modal end here */}
                </div>
              </div>
          </div>
        )
    }
   
}
export default TvSeriesDetails;
