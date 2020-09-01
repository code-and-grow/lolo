import React from 'react';
import TimeSince from './TimeSince';

export default class PopUpModal extends React.Component {

  state = { 
    loading: true,
    article: {},
  };

  handleClick = () => {
   this.props.toggle('');
  };

  componentDidMount() {
    fetch('/get_parsed_article', {
      method: 'POST',
      body: JSON.stringify({ url: this.props.openUrl }),
      headers:{ 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(result => {
      this.setState({
        article: result,
        loading: false
      });
    })
    .catch(err => console.log(err));
  }
  
  render() {
    return (
      // Popup modal starts
      <div className="modal">
        <div className="modal_content">
          <div className="close" onClick={this.handleClick}><b>&#88; Close</b></div>
          {this.state.loading ? (
            // Show loader while fetching article data
            <div className="loader">
              <img src="img/loading.gif" alt=""></img>
            </div>
          ) : (
            // Render articles when fetch successful
            <div>
              <img src={ this.state.article.lead_image_url } alt=""></img>
              <h1>{ this.state.article.title }</h1>
              { this.state.article.author && <small className="article-author-small"><em>By { this.state.article.author }</em></small> }
              { this.state.article.date_published && <small><TimeSince date={ this.state.article.date_published } /></small> }
              <p>{ this.state.article.content }</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}