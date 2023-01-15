import styled from "styled-components";
import Form from "./Form";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <div>
      <Container>
        <H1>Hello</H1>
        <Form />
      </Container>
    </div>
  );
}

export default App;
