import "styled-components";

/**
 * styled components 의 테마 정의를 확장 하는 것
 */
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}
