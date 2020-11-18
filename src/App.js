import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 
import Homepage from './Homepage';
import Details from './Details';
import TvSeriesDetails from './TvSeriesDetails';


class App extends React.Component {
  render() {
    // console.log("this.state.movies==>", this.state.movies)
    return (
        <div className="App">

          <Router> 
              <Switch> 
                  <Route exact path='/' component={Homepage}></Route>
                  <Route exact path='/Details/:id' component={Details}></Route>
                  <Route exact path='/TvSeriesDetails/:id' component={TvSeriesDetails}></Route> 
              </Switch> 
          </Router>
           
        </div>
      )
    }
   
}

export default App;
