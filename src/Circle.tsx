import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor?: string;
}

/**
 * styled component 에서는 <> 로 interface 등록
 */
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 100px;
`;

/**
 * interface는 object로 type을 알려주는데 사용
 */
interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

/**
 *
 * @param `{}`로받아 오는 args의 값을 interface 규격에 맞는지
 * @returns ?? 연산자로 undefined 면 값 반환
 */
export default function Circle({
  bgColor,
  borderColor,
  text = "default text",
}: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name} you are ${playerObj.age} years old.`;

sayHello({ name: "Lee", age: 27 });
