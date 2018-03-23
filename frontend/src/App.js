import React, { Component } from 'react';
import './App.css';
import ArticleList from './components/ArticleList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ArticleList />
      </div>
    );
  }
}

export default App;
