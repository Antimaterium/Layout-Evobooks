import React, { Component, PropTypes  } from 'react'; 
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import ItemLista from './ItemLista';
import '../css/Lista.css';

class Lista extends Component{
	render(){
		return (
  <List className="container">
        <Subheader>{this.props.titulo}</Subheader>
      			<ItemLista texto="Layer 1"/>
			 	<ItemLista texto="Layer 2"/>
				<ItemLista texto="Layer 3"/>
    </List>
		);
	}
}

Lista.propTypes = {
    titulo : PropTypes.string.isRequired	
}


export default Lista;
