import React, { Component } from 'react';
import { Media, ListGroup, ListGroupItem, Button } from 'reactstrap';
import NewsCard from '../NewsCard';

export default class CoinNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWord: null,
    };
  }

  render() {
    var news = this.props.news;
    return (
      <div style={{padding: "10px"}}>
        <h2>Related News</h2>
        <ListGroup>
          {
            _.map(_.filter(news, (nn) =>
              nn.categories.indexOf(this.props.sym) != -1).reverse(), (nn) =>
                <NewsCard key={nn.id} newsitem={nn} />)
          }
        </ListGroup>
      </div>
    );
  }
}
