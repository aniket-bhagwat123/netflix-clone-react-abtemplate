import React from 'react';
import {Link, Redirect} from 'react-router-dom';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
		  homePage : false,
		}
    }
    HomereDirect = () => {
        this.setState({homePage: true})
    }
    render() {
        if(this.state.homePage == true){
            return <Redirect to={"/"} />
        }
        return (
            <div className="headerSet">
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand headerLogo" href="javascript:void(0);" onClick={() => this.HomereDirect()}>
                                <img src={process.env.PUBLIC_URL+"/img/logo.png"} className="img-responsive" alt="Netflix" />
                            </a>
                        </div>
                        <ul className="nav navbar-nav navbar-right ">
                            <li className="users">
                                <a href="javascript:void(0);" className="userProfile">
                                    <img src={process.env.PUBLIC_URL+"/img/user.png"} className="img-responsive" alt="Netflix" />
                                </a>    
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
   
}
export default Header;
