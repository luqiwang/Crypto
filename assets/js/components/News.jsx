import React, { Component } from 'react';
import { ListGroup, Button, Form, FormGroup, Label, Input, Container, Col, Row } from 'reactstrap';
import NewsCard from './NewsCard';
import axios from 'axios';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: null,
      keyWord: null,
    };
  }

  componentDidMount() {
    const newsUrl = `https://min-api.cryptocompare.com/data/news/?lang=EN`;
    axios.get(newsUrl)
    .then((resp) => {
      this.setState({ news: resp.data });
      //console.log(this.state.news);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    var news = this.state.news;
    var keyWord = this.state.keyWord;
    //console.log(keyWord);

    var selectedNews;
    if (news == null) {
      selectedNews = null;
    }
    else {
      if (keyWord == null || keyWord.trim() == "") {
        selectedNews = news;
      } else {
        selectedNews = _.filter(news, (nn) =>
          nn.categories.toLowerCase().indexOf(keyWord) != -1 || nn.tags.toLowerCase().indexOf(keyWord) != -1);
      }
    }


    return (
      <div style={{padding: "10px"}}>
        <h2>All News</h2>
        <form class="form-inline">
          <FormGroup>
            <Label for="key"><b>Key Word</b></Label> &nbsp;&nbsp;
            <Input type="text" name="key" id="key" align="right"/>
          </FormGroup>
          <Button color="primary" onClick={() =>
            this.setState({
              keyWord: $("#key").val(),
            })
          }>Search</Button>
        </form>
        <div>
          {
            selectedNews == null ? <div>Loading...</div> :
            <ListGroup>
              { _.map(selectedNews.sort(function(n1, n2) {
                return (n1.published_on - n2.published_on);
                }), (nn) =>
                    <NewsCard key={nn.id} newsitem={nn} />) }
            </ListGroup>
          }
        </div>
      </div>
    );
  }
}
