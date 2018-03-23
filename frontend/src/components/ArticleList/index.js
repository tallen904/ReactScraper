import React, { Component } from "react";
import "./styles.css";
import Article from '../Article'
const APIURL = "/articles";

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }
  componentWillMount() {
    this.loadArticles();
  }
  loadArticles() {
    fetch(APIURL)
      .then(res => {
        if (!res.ok) {
          if (res.status >= 400 && res.status < 500) {
            return res.json().then(data => {
              let err = { errorMessage: data.message };
              throw err;
            });
          } else {
            let err = { errorMessage: "Server not responding..." };
            throw err;
          }
        }
        return res.json();
      })
      .then(articles => this.setState({ articles }));
  }
  render() {
      const articles = this.state.articles.map((a) => {
          return <Article
            key={a._id}
            {...a}
          />
      })
    return (<div className='container'>
        <h1>Reddit Front Page Scraper</h1>
        <ul>{articles}</ul>
      </div>
    )
  }
}

export default ArticleList;
