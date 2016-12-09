import React, { Component } from 'react'; 
import Layout from '../layout/Layout.js';
import PaperBackground from './PaperBackground';
import {browserHistory} from 'react-router';

class HomeUser extends Component{
	render(){

        if(!localStorage.getItem('token'))
        {
            browserHistory.push('/');
        }
		return (
          <div> 
			 <h2 className="categorias">Xaplaustos</h2>
             <PaperBackground/>
		</div> 	
		);          
	}
}

export default HomeUser;