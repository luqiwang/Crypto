import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import CoinItem from './CoinItem';
import _ from 'underscore';
import { Button, FormGroup, Label, Input, Container, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';

import * as actions from '../actions';
import { connect } from 'react-redux';


class CoinList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  previousPage() {
    let page = this.state.currentPage == 1 ? 1 : this.state.currentPage - 1;
    console.log("Page", page)
    this.setState({currentPage: page})
  }

  nextPage() {
    let page = this.state.currentPage == 5 ? 5 : this.state.currentPage + 1;
    console.log("Page", page)
    this.setState({currentPage: page})
  }

  renderPageItems() {
    return [1,2,3,4,5].map(num => {
      if (num == this.state.currentPage) {
        return (
        <PaginationItem key={num}>
          <PaginationLink className="cur-page" onClick={() => this.setState({currentPage: num})}>
            {num}
          </PaginationLink>
        </PaginationItem>
        )
      } else {
        return (
        <PaginationItem key={num}>
          <PaginationLink onClick={() => this.setState({currentPage: num})}>
            {num}
          </PaginationLink>
        </PaginationItem>
        )
      }
    })
  }

  render () {
    if (this.props.coins == null) return <div>Load...</div>;
    // convert store.coins map to coinList
    let keys = Object.keys(this.props.coins);
    let values = Object.values(this.props.coins);

    let lst = _.zip(keys, values);


    lst = _.sortBy(lst, function(cc){
      //console.log("cc", cc[1]["SortOrder"]);
      return parseInt(cc[1]["SortOrder"]);
    });
    lst = lst.slice((this.state.currentPage - 1) * 20, this.state.currentPage * 20)
    // variables
    let coinList = _.map(_.map(lst, (cc) => cc[1]), (tt) => {
      return <CoinItem key={tt.CoinName} coin={tt} history={this.props.history}/>
    });
    return<div>
      <Card style={{backgroundColor: '#DDDDDD',}}>
        <CardBody>
          <Row className="text-center align-items-center">
            <Col sm="2"><strong>Icon</strong></Col>
            <Col sm="2"><strong>Coin</strong></Col>
            <Col sm="2"><strong>Price</strong></Col>
            <Col sm="2"><strong>7d Chart(USD)</strong></Col>
            <Col sm="2"><strong>Chg. 24H</strong></Col>
            <Col sm="2"><strong>Setting</strong></Col>
          </Row>
      </CardBody>
      </Card>
      <div>
        { coinList }
      </div>
      <div className="page-group">
          <Pagination>
            <PaginationItem>
            <PaginationLink previous onClick={this.previousPage} />
          </PaginationItem>
          {this.renderPageItems()}
          <PaginationItem>
            <PaginationLink next onClick={this.nextPage}/>
          </PaginationItem>
        </Pagination>
      </div>
    </div>;
  }
}

function state2props(state) {
  return {
    coins: state.coins,
    prices: state.prices,
  };
}

export default connect(state2props, actions)(CoinList);
