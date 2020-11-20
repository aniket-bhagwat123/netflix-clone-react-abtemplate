import React from 'react';
import {Link, Redirect} from 'react-router-dom';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
		}
    }
    componentDidMount(){
        window.addEventListener('scroll', () => {
           let activeClass = 'backColorNav';
           if(window.scrollY < 50){
               activeClass = 'normal';
           }
           this.setState({ activeClass });
        });
    }
    render() {
        return (
            <div className={`headerSet ${this.state.activeClass}`}>
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand headerLogo" href="/" >
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
