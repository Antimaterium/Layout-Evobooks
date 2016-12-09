import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import GridListCategoria from './GridListCategoria';
import { request } from '../utils/Request';
import { browserHistory } from 'react-router';

const styles = {
  headline: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
  tabs: {
    background: '#FAFAFA',
    color: '#424242'
  },
  inkBar: {
    background: 'rgb(138,3,130)',
    marginBottom: '20px'
  }
};

class TabsCategorias extends Component {

  state = {
    modelos: [],
    slideIndex: 0,
    categorias: []
  }

  componentDidMount() {
    this.montarCategorias();
  }
  montarCategorias() {


    var header = { "Content-Type": "application/json" };
    var body = {};


    request("File/Categories", "Get", header, body)
      .then(response =>
        response.json()
      )
      .then(response => {
        this.setState({
          categorias: response
        });
        this.requestModelos();
      })
      .catch(error => {

      });


  }

  requestModelos(index) {
    // console.log("Request modelos");
    // console.log(this.state.categorias);
    // console.log(this.state.slideIndex);
    var id = index == this.state.categorias.length ? "0" : this.state.categorias[index].Id;
    return request("File/Category?categoryId=" + id)
      .then(response => response.json())
      .then((response) => {
        this.setState({
          modelos: response
        });
      }).catch(error => {
        console.log(error);
        browserHistory.push('/');
      });
  }



  handleChange = (value) => {
    this.requestModelos(value)
      .then(_ => {
        this.setState({
          slideIndex: value
        });
      });
  };

  render() {
    return (
      <div>
        <Tabs
          inkBarStyle={styles.inkBar}
          onChange={this.handleChange}
          value={this.state.slideIndex}
          >
          {
            this.state.categorias.map((item, index) =>
              <Tab style={styles.tabs} label={item.Name} value={index} />
            )
          }
          <Tab style={styles.tabs} label="Todos" value={this.state.categorias.length} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          >
          <div>
            <GridListCategoria modelos={this.state.modelos} />
          </div>
          <div style={styles.slide}>
            <GridListCategoria modelos={this.state.modelos} />
          </div>
          <div style={styles.slide}>
            <GridListCategoria modelos={this.state.modelos} />
          </div>
          <div style={styles.slide}>
            <GridListCategoria modelos={this.state.modelos} />
          </div>
          <div style={styles.slide}>
            <GridListCategoria modelos={this.state.modelos} />
          </div>
          <div style={styles.slide}>
            <GridListCategoria modelos={this.state.modelos} />
          </div>
          <div style={styles.slide}>
            <GridListCategoria modelos={this.state.modelos} />
          </div>
          <div style={styles.slide}>
            <GridListCategoria modelos={this.state.modelos} />
          </div>
          <div style={styles.slide}>
            <GridListCategoria modelos={this.state.modelos} />
          </div>
          <div style={styles.slide}>
            <GridListCategoria modelos={this.state.modelos} />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default TabsCategorias;