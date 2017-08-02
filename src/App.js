import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import priv from './config';
import UrlPaths from './urlpaths';

var config_path = new UrlPaths();

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      configuration: config_path,
    };
    //this.configuration = new UrlPaths().config;
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
          <FilmList query={this.state.query} config={this.state.configuration}/>
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
      query: '',
      configuration: props.config,
      test: ''
    };
    
  }


  getMovieList(name){
    console.log("Movie List");
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + priv.API_KEY)
    .then(function (response) {
      console.log(response.data.results);
      this.setState({
        items: response.data.results
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
    
    
  }
  searchFor(movie){
    axios.get('https://api.themoviedb.org/3/search/movie?query=' + movie + '&api_key=' + priv.API_KEY)
    .then(function (response) {
      
      this.setState({
        items: response.data.results
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
    //console.log(this.state.items);
  }

  componentWillReceiveProps(){
    
    if (this.props.query !== ''){
      this.setState({
        initialList: false,
        query: this.props.query,
      });
      let movie = this.props.query;
      //console.log('the movie is:' + movie);
      this.searchFor(movie);

    }
  }


  componentDidMount() {
    

    
    if (this.state.initialList) {
      this.getMovieList();
    }
    //console.log(this.state.configuration);
    
    
    

  }
// let size = this.state.configuration.data.backdrop_sizes[0];
// let b_url = this.state.configuration.data.base_url
  render() {
    return (
      <div className="container"> <h2>Filmliste:</h2>
        <div className="row film-wrapper">
          {this.state.items.length ?
          	this.state.items.map(item=><div className="col-md-4 film-item" key={item.id}>
              <p className="title">{item.title} </p>
              <p className="subtitle">{item.original_title} </p>
              <span className="badge lang">{item.original_language} </span>
            <br />
            <img className="poster" src={this.state.configuration.data.base_url + this.state.configuration.data.backdrop_sizes[0]+ '/'+ item.poster_path} alt=""/>
            </div>) 
            : <div>Loading...</div>
          }
     
        </div>
      </div>
    )
  }
}

class SearchBar extends Component{
  constructor(props){
    super()
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
