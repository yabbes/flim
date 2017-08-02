import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    };
  }
  handleChange(event){
    console.log("change");
    this.setState({query: event.target.value});
    console.log(this.state.query);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Flim-base with React</h2>
        </div>
        <p className="App-intro">
          <SearchBar handleChange={(event) => this.handleChange(event)}/>
          <FilmList query={this.state.query}/>
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
  searchFor(movie){
    axios.get('https://api.themoviedb.org/3/search/movie?query=' + movie + '&api_key=a8e2ba7b760d6d3d601e43eb696df1ac')
    .then(function (response) {
      this.setState({
        items: response.data.results
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });

  }
  componentWillReceiveProps(){
    //console.log(this);
    //console.log(this.props);
    if (this.props.query !== ''){
      this.setState({
        initialList: false,
        query: this.props.query
      });
      let movie = this.state.query;
      //console.log('the movie is:' + movie);
      this.searchFor(movie);

    }
  }
  componentDidMount() {
    //console.log(this.props);
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

class SearchBar extends Component{
  constructor(props){
    super()
    this.state = {
      query: ''
    }
  }
  /*
  onChange(event) {
    console.log(event);
    this.setState({query: event.target.value});
    console.log(this.state.query);
  }
  */

  render() {
    return (
      <input placeholder="Enter your search" id="searchInput" className="search" onChange={(event) => this.props.handleChange(event) }>
      </input>
    )
  }

}
