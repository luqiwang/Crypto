import React, { Component } from 'react';
import { Media, ListGroup, ListGroupItem, Button } from 'reactstrap';

export default function NewsCard(params) {
  var nn = params.newsitem;

  var offset = new Date(nn.published_on*1000 - Date.now());
  //var date = new Date(nn.published_on*1000);  //date.toUTCString()
  var time = offset.getHours() + " hours ago";

  var imgStyle = {
    width: "256px",
    padding: "16px",
  };

  return (
    <ListGroupItem key={nn.id}>
      <Media>
        <Media left href={nn.url}>
          <Media object src={nn.imageurl} style={imgStyle} alt="image loading" />
        </Media>
        <Media body>
          <p>
            <b style={{color: "orange"}}>{nn.source_info.name}</b>&nbsp;&nbsp;&nbsp;
            <span style={{color: "grey"}}>{time}</span>
          </p>
          <Media heading>
            <a href={nn.url}>{ nn.title }</a>
          </Media>
          <p dangerouslySetInnerHTML={{__html: nn.body}}></p>
          <p style={{color: "grey"}}>Categories: <b>{nn.categories}</b></p>
          <Button outline href={nn.url} className="float-right">Read More</Button>
        </Media>
      </Media>
    </ListGroupItem>
  );
}
