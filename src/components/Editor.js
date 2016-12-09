import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ListaCamadas from './ListaCamadas';
import ListaAnimacoes from './ListaAnimacoes';
import Object3D from './Object3D';
import Chips from './Chips';
import Image from './Image';
import '../css/Editor.css';
import { request } from '../utils/Request';

//import SketchFab from "../utils/SketchFab";

const styles = {
	paper: {
		height: '100%',
		width: '97%',
		margin: '1%',
		textAlign: 'center',
		display: 'inline-block',
		backgroundColor: '#FAFAFA',
		position: 'relative',
		top: '100px'
	},
	editor: {
		padding: '50px'
	},
	footerEditor: {
		marginTop: '100px;'
	}
};

class Editor extends Component {
	state = {
		modelo: null
	}
	componentDidMount() {

		fetch("http://localhost:3000/jsons/modelos/" + this.props.params.id + ".json",{
        method: "GET",
        headers: null,
        cache: 'default',
        body: null
	    })
		.then(res => res.json())
		.then(modelo => {
			this.setState(
				{
					modelo,
					url_3d: modelo.url_3d
				}
			);
		});
	}
	onCamadaChange(camada){

		camada.habilitado = !camada.habilitado

		var url_3d = GetUrl3d( this.state.modelo.camadas);
		this.setState({url_3d});
	}

	GetUrl3d(camadas){
		if(camadas[0].habilitado && camadas[1].habilitado && camadas[2].habilitado && camadas[3].habilitado)
		{
			
		}
	}

	renderModelo() {
		if (this.state.modelo == null)
			return (<div>Loading...</div>);
		return (
			<div className="main" style={styles.editor}>
				<Row>
					<Col md={12} >
						<h2>{this.state.modelo.nome}</h2>	
					</Col>
				</Row>
				<Row >
					<Col md={12} >
						<Row>
							<Col md={8} style={{ border: '1px solid silver' }}>
								<div className="containerImage">
									<Object3D url_3d={this.state.url_3d} />
								</div>
							</Col>
							<Col md={4} >
								<ListaCamadas onChangeHandle={this.onCamadaChange.bind(this)} data={this.state.modelo.camadas} titulo="Camadas" />
							</Col>
						</Row>
						<Row>
							<Col md={8} >
								<h3> Tags :</h3>
								<Chips />
							</Col>
							
						</Row>

						<Row className="footerEditor">
							<Col md={12} >
								<RaisedButton

									label="Verificar alterações "
									labelPosition="before"
									primary={true}
									/>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
	render() {
		return (
			<Paper
				style={styles.paper}
				zDepth={2}
				children={
					this.renderModelo()
				}
				/>

		);
	}
}


export default Editor;