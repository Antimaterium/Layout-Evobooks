import React, { Component, PropTypes } from 'react';
import { List, ListItem  } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import ItemLista from './ItemLista';
import { request } from '../utils/Request';
import '../css/Lista.css';

class ListaAnimacoes extends Component {

	render() {
		return (
			<div>
				<List>
					{ this.props.data.map(animacao => {
						return <ListItem primaryText={animacao.nome}/>
						}) 
					}
				</List>	  
			</div>
		)
	}
}

ListaAnimacoes.propTypes = {	titulo: PropTypes.string.isRequired	
}


export default ListaAnimacoes;
