import React, { Component } from 'react';
import TimeSince from './components/TimeSince';
import { proxyUrl, rssUrl } from './utilities/constants';

import './App.css';

class App extends Component {

  // Initialize state
  state = { 
    articles: []
  };

  // Start RSS feed fetch after component mount
  componentDidMount() {
    this.getRssFeedData();
  }

  // Save RSS feed articles to state
  getRssFeedData = () => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const xmlResponseTextItems = new window.DOMParser().parseFromString(request.responseText, "text/xml").querySelectorAll("item");
        xmlResponseTextItems.forEach(el => {
          const mediaContentElement = ([].slice.call(el.querySelectorAll('[url]'))).filter(function(a) { return a.tagName === 'media:content'});
          const itemImageUrl = mediaContentElement.map(function(a) { return a.getAttribute('url') })[0];
          const item = {
            title: el.querySelector("title") !== null ? el.querySelector("title").innerHTML.toString() : '',
            date: el.querySelector("pubDate") !== null ? el.querySelector("pubDate").innerHTML.toString() : '',
            author: el.querySelector("author") !== null ? el.querySelector("author").innerHTML.toString() : '',
            description: el.querySelector("description") !== null ? el.querySelector("description").innerHTML.toString() : '',
            url: el.querySelector("link") !== null ? el.querySelector("link").innerHTML.toString() : '',
            image: itemImageUrl ? itemImageUrl : 'img/penguin_placeholder_ls.jpg'
          };
          this.setState( prevState => ({
            articles: [...prevState.articles, item]
          }));
        });
      }
    }
    request.open("GET", proxyUrl + rssUrl, true);
    request.send();
  }
  // Render app
  render() {
    const { articles } = this.state;
    return (
      <div className="App">
        <header>
          <div className="header">
            <a href="/">
              <img className="brand" src="img/lolo_news.png" alt=""></img>
            </a>
          </div>
        </header>
        <main className="main">
          {articles.length ? (
            // Render articles when fetch successful
            <div>
              <section className="archive">
              {this.state.articles.map((item, i) => {
                return (
                  <article className="article" key={i}>
                    <img className="card-image" src={item.image} alt="" onClick={() => this.toggleModal(item.url)}></img>
                    <h2 onClick={() => this.toggleModal(item.url)}>
                      { item.title }
                    </h2>
                    { item.author && <small className="article-author-small"><em>By { item.author }</em></small> }
                    { item.date && <small><TimeSince date={ item.date } /></small> }
                    <p onClick={() => this.toggleModal(item.url)}>
                      { item.description }
                    </p>
                  </article>
                );
              })}
              </section>
            </div>
          ) : (
            // Show loader while fetching data
            <div>
              <img className="loader" src="img/loading.gif" alt=""></img>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default App;