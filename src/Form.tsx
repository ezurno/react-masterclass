import React, { useState } from "react";

export default function Form() {
  const [value, setValue] = useState("");
  // useState 속 initialValue 를 보고 TS가 타입을 추론함

  /**
   *
   * @param event 에 type을 걸어주어야 함 React의 Form tag에서 발생한 event 이며 HTML tag Input에 의해 발생
   */
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    // event를 풀어서 이벤트 속 currentTarget의 값을 const value로 새로 지정한 값으로 선언
    // === const value = event.currentTarget.value;
    setValue(value);
    // 받아온 값을 setValue로 값 전달
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // form tag의 기본 액션 삭제
    console.log(`Hello, ${value}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="input username"
        value={value}
        onChange={onChange}
      ></input>
      <button>submit</button>
    </form>
  );
}
