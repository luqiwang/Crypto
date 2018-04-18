import React from 'react';
import MonitorItem from './MonitorItem';
import { Button, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';


export default function MonitorList({coins, prices}) {
  const items = coins.map(
    coin => <MonitorItem key={coin.id} coin={coin} price={prices[coin.code]['USD']} />
  );

  return <div>
    <Card style={{backgroundColor: '#DDDDDD',}}>
      <CardBody>
      <Row className="text-center">
          <Col><strong>Icon</strong></Col>
          <Col><strong>Coin</strong></Col>
          <Col><strong>Price</strong></Col>
          <Col><strong>Low Limit</strong></Col>
          <Col><strong>High Limit</strong></Col>
          <Col><strong>Detail</strong></Col>
          <Col><strong>Setting</strong></Col>
      </Row>
    </CardBody>
    </Card>

    <div>
      { items }
    </div>

  </div>;
}
