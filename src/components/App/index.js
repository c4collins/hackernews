// Core Modules
import React, { Component } from 'react';

// Internal Modules
import Search from '../Search';
import Table from '../Table';
import { ButtonWithLoading } from '../Button';

// Misc Files
import './index.css';

// Constants
import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from '../../constants';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needToSearchTopstories = this.needToSearchTopstories.bind(this);
  }

  onDismiss(id) {
    this.setState(dismissItem(id));
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  setSearchTopstories(result){
    const { hits, page } = result;
    this.setState(updateSearchTopstoriesState(hits, page));    
  }

  fetchSearchTopstories(searchTerm, page){

    this.setState({
      isLoading: true,
    });
    
    const url = `${PATH_BASE}${PATH_SEARCH}`
      + `?${PARAM_SEARCH}${searchTerm}`
      + `&${PARAM_PAGE}${page}`
      + `&${PARAM_HPP}${DEFAULT_HPP}`;
    //console.log(url);
    
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch(e => e);
  }

  onSearchSubmit(event){
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needToSearchTopstories(searchTerm)){
      this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  }

  needToSearchTopstories(searchTerm){
    return !this.state.results[searchTerm];
  }


  // Lifecycle Methods
  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }

  render() {
    const { 
      searchTerm, 
      searchKey,
      results,
      isLoading,
    } = this.state;

    const page = (
      results &&
      results[searchKey] && 
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] && 
      results[searchKey].hits
    ) || [];

    if (!results) { return null; }
    //console.log(this.state);

    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
      <Table 
        list={list}
        onDismiss={this.onDismiss}
      />
        <div className="interactions">
          <ButtonWithLoading 
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

const updateSearchTopstoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;

  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

  const updatedHits = [
    ...oldHits,
    ...hits
  ]

  return ({
    results: { 
      ...results,
      [searchKey]: { hits: updatedHits, page },
    },
    isLoading: false,
  });
}

const dismissItem = (id) => (prevState) => {
  const { results, searchKey } = prevState;
  const { hits, page } = results[searchKey];

  const updatedHits = hits.filter((item) => item.objectID !== id);

  return ({
    results: { 
      ...results, 
      [searchKey]: {hits:updatedHits, page}
    } 
  });
}

export default App;