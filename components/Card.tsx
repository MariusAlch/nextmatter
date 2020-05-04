import styled from "styled-components";

const Root = styled.div`
  background-color: transparent;
  width: 125px;
  height: 200px;
  perspective: 1000px;
  margin: 8px;
  display: inline-block;
`;

const Inner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.5s;
  transform-style: preserve-3d;

  ${(p) =>
    p.isFlipped &&
    `
    transform: rotateY(180deg);
  `}
`;

const Side = styled.div`
  box-shadow: 1px 1px 2px 1px #aaa;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  border: 1px solid #777;
  box-sizing: border-box;
`;

const Frontside = styled(Side)<{ imageUrl: string }>`
  transform: rotateY(180deg);
  background-image: ${(p) => `url("${p.imageUrl}")`};
  background-position: center;
`;

const Backside = styled(Side)`
  padding: 8px;
`;

const BacksideCover = styled.div`
  border-radius: 4px;
  background-color: #3c71c7;
  width: 100%;
  height: 100%;
`;

export const Card: React.FunctionComponent<{
  imageUrl: string;
  isRevealed: boolean;
  onClick?: () => void;
}> = ({ isRevealed, imageUrl, onClick }) => {
  return (
    <Root onClick={onClick}>
      <Inner isFlipped={isRevealed}>
        <Backside>
          <BacksideCover />
        </Backside>
        <Frontside imageUrl={imageUrl}></Frontside>
      </Inner>
    </Root>
  );
};
