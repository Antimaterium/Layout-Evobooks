import React, { Component, PropTypes } from 'react';
import { List, ListItem  } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import ItemLista from './ItemLista';
import { request } from '../utils/Request';
import '../css/Lista.css';

class Lista extends Component {
	onClick(camada){
		this.props.onChangeHandle(camada);
	}
	render() {
		return (
			<div>
				<List>
					{ this.props.data.map(camada => {


						return 
						 <ListItem onClick={this.onClick.bind(this,camada)
          				leftCheckbox={<Checkbox checked={camada.habilitado}/>}
          				primaryText={camada.nome}
          
        				/>
						}) 
					}
				</List>	  
			</div>
		)
	}
}

Lista.propTypes = {	titulo: PropTypes.string.isRequired	
}


export default Lista;
