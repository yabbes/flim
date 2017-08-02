import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import axios from 'axios';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Flim-base</h2>
        </div>
        <p className="App-intro">
          <FilmList query={''}/>
        </p>
      </div>
    );
  }
}

export default App;

class FilmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      initialList: true,
      query: props.query
    };
  }

  getMovieList(name){
    var results = [];
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=a8e2ba7b760d6d3d601e43eb696df1ac')
    .then(function (response) {
      //console.log(response);
      this.setState({
        items: response.data.results
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
    
  }

  componentDidMount() {
    if (this.state.initialList) {
      this.getMovieList();
    }
    

  }

  render() {
    return (
      <div> <h2>Filmliste:</h2>
        <ul>
          
          {this.state.items.length ?
          	this.state.items.map(item=><li key={item.id}>{item.title}</li>) 
            : <li>Loading...</li>
          }
     
        </ul>
      </div>
    )
  }
}
