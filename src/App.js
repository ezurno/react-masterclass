import styled from "styled-components";
// styled-components 사용

const Container = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 100px;
`;

function App() {
  return (
    <Container>
      <Box bgColor="teal" />
      <Circle bgColor="tomato" />
      <Box bgColor="gray" />
    </Container>
  );
}

export default App;
