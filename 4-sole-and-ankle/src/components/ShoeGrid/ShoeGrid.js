import React from "react";
import styled from "styled-components/macro";

import SHOES from "../../data";
import ShoeCard from "../ShoeCard";

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <ShoeWrapper>
          <ShoeCard key={shoe.slug} {...shoe} />
        </ShoeWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -16px;
  /* gap: 16px; */
`;

const ShoeWrapper = styled.div`
  min-width: 275px;
  max-width: 450px; /* Limitation */
  margin: 16px;
  flex: 1;
`;

export default ShoeGrid;
