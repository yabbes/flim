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
          <FilmList />
        </p>
      </div>
    );
  }
}

export default App;

class FilmList extends Component {
  constructor(props) {
    super(props);
    this.getMovieList = this.getMovieList.bind(this);
    this.state = {
      items: []
    };
  }

  getMovieList(name){
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=a8e2ba7b760d6d3d601e43eb696df1ac')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  componentDidMount() {
    this.getMovieList();
    /*fetch('https://api.themoviedb.org/3/movie/550?api_key=a8e2ba7b760d6d3d601e43eb696df1ac')
    .then(result => result.json())
    .then(items => this.setState({items}))*/
    /*
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": 'https://api.themoviedb.org/3/discover/movie?api_key=a8e2ba7b760d6d3d601e43eb696df1ac',
      "method": "GET",
      "headers": {},
      "data": "{}"
    };
    $.ajax(settings)
    .done((response) => {
      console.log(response);
      this.setState({
        items: response.result,
      })
    });

    */
  }

  render() {
    return (
      <div> <h2>Filmliste:</h2>
        <ul>
          {this.state.items.length ? 
          console.log(this.state.items) : 
            <li>Loading..</li>
          }
        </ul>
      </div>
    )
  }
}
