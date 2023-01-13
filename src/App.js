import styled, { keyframes } from "styled-components";

/**
 * keyframes로 animation 적용
 */
const rotationAnimate = keyframes`
  0%{
    transform:rotate(0deg);
    border-radius:0px;
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform:rotate(360deg);
    bodrer-radius: 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
`;

const Emoji = styled.span`
  font-size: 100px;
  &:active {
    opacity: 0;
  }
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimate} 1s linear infinite;

  ${Emoji} {
    &:hover {
      font-size: 80px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>😊</Emoji>
      </Box>
      <Emoji>😊</Emoji>
    </Wrapper>
  );
}

export default App;
