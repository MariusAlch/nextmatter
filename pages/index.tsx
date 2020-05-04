import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Card } from "../components/Card";
import { useGameLogic } from "../components/useGameLogic";

const Root = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 1200px;
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: "sans-serif";
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'sans-serif';
  }
`;

export default () => {
  const { revealCard, revealedCardsIds, cards, foundCardsIds } = useGameLogic();

  return (
    <>
      <GlobalStyle />
      <Root>
        {cards.map(({ imageUrl, id }) => (
          <Card
            onClick={() => revealCard(id)}
            key={id}
            imageUrl={imageUrl}
            isRevealed={revealedCardsIds.includes(id) || foundCardsIds.includes(id)}
          />
        ))}
      </Root>
    </>
  );
};
