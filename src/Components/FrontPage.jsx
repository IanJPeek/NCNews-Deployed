import React, { Component } from 'react';
import axios from 'axios'
import ArticleList from './ArticleList';

class FrontPage extends Component {
  state = {
    articles: [],
    isLoading: true
  };

  componentDidMount() {
    
    this.getArticles();
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props) 
    {this.getArticles();
    console.log(this.props, "sorted")}
  }
  
  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <p>LOADING... Getting the latest News!</p>
    
    return (
      <div>
        <h3>Our Top Stories</h3>
        <ArticleList articles={articles} />
      </div>
    );
  }
  
    getArticles = () => {
      const { topic, sortBy } = this.props;
      // console.log(sortBy, "sort here")
      return axios
      .get(`https://nc-news-ianp.herokuapp.com/api/articles`, {
        params: {
          topic: topic,
          sortBy: sortBy
        }
      })
      .then(({ data }) => {
        this.setState({ articles: data.articles, isLoading: false });
      })
      .catch(err => console.dir(err));
  };

}

export default FrontPage;