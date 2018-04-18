import React from 'react';
import {Table, Row, Col} from 'reactstrap';
import {connect} from 'react-redux'

let iconUrl = "https://www.cryptocompare.com";
const RealTimeDetail = ({coin, price, prices}) => {

  return (
    <div style={{padding: "10px"}}>
      <Row className="text-center">
        <Col sm="2">
          <img src={iconUrl+coin.ImageUrl} alt={coin.CoinName} height="60%" width="60%"/>
          <div>
            <h4 className="mt-2">{coin.CoinName}</h4>
            <strong style={{color: "orange"}}>{coin.Symbol}</strong>
          </div>
        </Col>
        <Col sm="10">
          <h2>{prices[coin.Symbol].USD}</h2>
          <Table className="text-center" responsive>
            <thead>
              <tr>
                <th>Mkt. Cap.</th>
                <th>Vol. 24H</th>
                <th>Open 24H</th>
                <th>Low/High 24H</th>
                <th>Last trade</th>
              </tr>
            </thead>
            <tbody>
             <tr>
               <td>{price['MKTCAP']}</td>
               <td>{price['TOTALVOLUME24H']} ({price['TOTALVOLUME24HTO']})</td>
               <td>{price['OPEN24HOUR']}</td>
               <td>{price['LOW24HOUR']} - {price['HIGH24HOUR']}</td>
               <td>{price['LASTVOLUME']} ({price['LASTVOLUMETO']}) / {price['LASTMARKET']}</td>
             </tr>
           </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
export default connect(({prices}) => ({prices}))(RealTimeDetail);
