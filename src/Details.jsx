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

class Details extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        moviesDetails: {},
        moviesVideos: {},
        videoUrl:"",
        LanguagesHere:"",
        modalIsOpen: false
      }
    }

    HomereDirect = () => {
      this.setState({homePage: true})
    }
     
    componentDidMount(){
      this.moviedetailsAPI();
      this.movieVideoAPI();
    }

    moviedetailsAPI = () =>{
      console.log("url data===>", this.props.match.params.id);
      axios.get("https://api.themoviedb.org/3/movie/"+this.props.match.params.id+"?api_key=6d509219e4a4930feb8a3e9ae47b3a7a")
      .then((res) => {
        console.log("response===>", res);
        this.setState({ moviesDetails: res.data,LanguagesHere: res.data.spoken_languages[0].name});
      })
    }

    movieVideoAPI = () =>{
      console.log("url data===>", this.props.match.params.id);
      axios.get("https://api.themoviedb.org/3/movie/"+this.props.match.params.id+"/videos?api_key=6d509219e4a4930feb8a3e9ae47b3a7a")
      .then((res) => {
        console.log("response===>", res);
        this.setState({ moviesVideos: res.data,videoUrl: res.data.results[0].key});
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
        let {moviesDetails,moviesVideos, modalIsOpen} = this.state;
        return (
          <div className="mainwrapper">
            {/* header start here */}
            <Header />
            {/* header end here */}

            <div className="mainDetailscomp">
                <div className="backgrImgwrap">
                    <div className="backgrImg" onClick={() => this.openModal()}>
                        <img src={"http://image.tmdb.org/t/p/original/"+ moviesDetails.backdrop_path} className="img-responsive backGrImage"/>
                        <div className="plybuton">
                            <i class="fa fa-play" aria-hidden="true"></i>
                        </div>
                        <div class="bannerOvarlay"></div>
                    </div>
                    <div className="detailsMovieset">
                        <div className="container">
                            <div className="detailsMoviesetmg">
                                <div className="mainsmllImg">
                                    <img src={" http://image.tmdb.org/t/p/w185/"+ moviesDetails.poster_path} className="img-responsive"/>
                                </div>
                                <div className="detailshere">
                                    <h2>{moviesDetails.title}</h2>
                                    <button className="btn backbtn" onClick={() => this.HomereDirect()}>Back</button>
                                    <p>{moviesDetails.overview}</p>
                                    <ul className="listdetails">
                                        <li><span>Release Date :</span>{moviesDetails.release_date}</li>
                                        <li><span>Runtime :</span>{moviesDetails.runtime}&nbsp;Min</li>
                                        <li><span>Languages :</span>{this.state.LanguagesHere}</li>
                                        {/* <li><span>Release Date :</span>{moviesDetails.release_date}</li> */}
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
export default Details;
