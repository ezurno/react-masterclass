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

/**
 * attrs => attributed로 tag 내 추가 조건을 입력 해 줄 수 있음
 */
const Input = styled.input.attrs({ required: true })`
  color: white;
  background-color: tomato;
  border: 0px none;
  margin-right: 1px;
`;

function App() {
  return (
    <>
      <Container as="header">
        <Box bgColor="teal" />
        <Circle bgColor="tomato" />
        <Box bgColor="gray" />
      </Container>
      <Container>
        <Input />
        <Input />
        <Input />
        <Input />
      </Container>
    </>
  );
}

export default App;
