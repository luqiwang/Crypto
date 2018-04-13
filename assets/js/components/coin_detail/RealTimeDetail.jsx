import React from 'react';
import {Table} from 'reactstrap'

const RealTimeDetail = ({price}) => {

  return (
    <div>
      <h2>{price['PRICE']}</h2>
      <Table>
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
    </div>
  );
}
export default RealTimeDetail;
