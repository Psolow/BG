import React from "react";
import { string } from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  width:32%;
  border: 2px solid #333;
  border-radius: 4px;
  margin-bottom:25px;
  padding-right:10px;
  overflow:hidden;
`;

const Image = styled.img`
width:46%;
float:left;
margin-right:10px;
`;

const ShowCard = props => (
  <Wrapper>
    <div>
      <h3>Name: {props.title}</h3>
      <p>Max/suggested players: {props.players}</p>
      <p>Game size: {props.size}</p>
      <p>complexity: {props.complex}</p>
      <button onClick={() => props.removeCard(props.itemID)}>Remove Item</button>
    </div>
  </Wrapper>
);

ShowCard.propTypes = {
  title: string.isRequired
};

export default ShowCard;
