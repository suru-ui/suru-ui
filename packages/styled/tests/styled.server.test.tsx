import { renderToString } from "react-dom/server";
import { test } from "vitest";
import { styled, STYLED_SELECTOR } from "../src";

test("スタイル付きのコンポーネントを作成する", ({ expect }) => {
  const StyledDiv = styled.div<{ color: any }>`color: ${css => css`var(--color-${css.color})`};`;
  const markup = renderToString(
    <StyledDiv
      css={{
        color: { toString: () => "red" },
      }}
      className="test"
    >
      CONTENT
    </StyledDiv>,
  );

  expect(markup).toMatchSnapshot();
});

test("コンポーネントをスタイルのクラス名として使える", ({ expect }) => {
  const StyledButton = styled.button``;
  const StyledDiv = styled.div`& > ${StyledButton} { color: red; }`;
  const markup = renderToString(
    <StyledDiv>
      <StyledButton>CONTENT</StyledButton>
    </StyledDiv>,
  );

  expect(markup).toMatchSnapshot();
});

test("ネストできる", ({ expect }) => {
  const StyledDiv = styled.div``;
  const StyledSpan = styled.span``;
  const markup = renderToString(
    <StyledDiv asChild>
      <StyledSpan asChild>
        <p>CONTENT</p>
      </StyledSpan>
    </StyledDiv>,
  );

  expect(markup).toMatchSnapshot();
});

test("クラス名を一部変更できる", ({ expect }) => {
  const StyledButton = styled.button``;
  StyledButton.componentName = "styled-button";
  const StyledDiv = styled.div`& > ${StyledButton} { }`;
  const markup = renderToString(
    <StyledDiv>
      <StyledButton>CONTENT</StyledButton>
    </StyledDiv>,
  );

  expect(markup).toMatchSnapshot();
});

test("STYLED_SELECTOR を利用できる", ({ expect }) => {
  const StyledDiv = styled.div`body > ${STYLED_SELECTOR} {}`;
  const markup = renderToString(<StyledDiv />);

  expect(markup).toMatchSnapshot();
});
