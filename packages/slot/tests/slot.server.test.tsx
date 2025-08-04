import { renderToStaticMarkup } from "react-dom/server";
import { describe, test } from "vitest";
import { Slot, Slottable } from "../src";

describe("Slottable を含む", () => {
  test("Slot 下にない Slottable は子要素が展開される", ({ expect }) => {
    const markup = renderToStaticMarkup(
      <button>
        <span>LEFT</span>
        <Slottable>
          <i>Suru</i> UI
        </Slottable>
        <span>RIGHT</span>
      </button>,
    );

    expect(markup).toBe(
      "<button><span>LEFT</span><i>Suru</i> UI<span>RIGHT</span></button>",
    );
  });

  test("Slot は Slottable の子要素を展開する", ({ expect }) => {
    const markup = renderToStaticMarkup(
      <Slot href="https://github.com/suru-ui/suru-ui">
        <span>LEFT</span>
        <Slottable>
          <a>
            <i>Suru</i> UI
          </a>
        </Slottable>
        <span>RIGHT</span>
      </Slot>,
    );

    expect(markup).toBe(
      `<a href="https://github.com/suru-ui/suru-ui"><span>LEFT</span><i>Suru</i> UI<span>RIGHT</span></a>`,
    );
  });
});

describe("ネスト", () => {
  test("Slot はネストされた Slot の子要素を展開する", ({ expect }) => {
    const markup = renderToStaticMarkup(
      <Slot data-1>
        <Slot>
          <Slot data-2>
            <Slot>
              <div data-3>
                Suru UI
              </div>
            </Slot>
          </Slot>
        </Slot>
      </Slot>,
    );

    expect(markup).toBe(
      renderToStaticMarkup(
        <div
          data-3
          data-2
          data-1
        >
          Suru UI
        </div>,
      ),
    );
  });

  test("Slot はネストされた Slottable の子要素を展開する", ({ expect }) => {
    const markup = renderToStaticMarkup(
      <Slot data-1>
        <Slottable>
          <Slottable>
            <Slottable>
              <div data-2>
                Suru UI
              </div>
            </Slottable>
          </Slottable>
        </Slottable>
      </Slot>,
    );

    expect(markup).toBe(
      renderToStaticMarkup(
        <div
          data-2
          data-1
        >
          Suru UI
        </div>,
      ),
    );
  });

  test("Slot は Slottable を介してネストされた Slot の子要素を展開する", ({ expect }) => {
    const markup = renderToStaticMarkup(
      <Slot data-1>
        <span>1</span>
        <Slottable>
          <Slot data-2>
            <span>2</span>
            <Slottable>
              <div data-3>Suru UI</div>
            </Slottable>
          </Slot>
        </Slottable>
      </Slot>,
    );

    expect(markup).toBe(
      renderToStaticMarkup(
        <div
          data-3
          data-2
          data-1
        >
          <span>1</span>
          <span>2</span>
          Suru UI
        </div>,
      ),
    );
  });

  test("asChild プロパティを真値と判定できるなら、それを Slot として扱う", ({ expect }) => {
    function Quote(
      props: React.PropsWithChildren<{
        asChild: true;
        value: number;
      }>,
    ) {
      const {
        value,
        asChild: _,
        children,
      } = props;

      return (
        <Slot>
          <span>{value}</span>
          <Slottable>
            {children}
          </Slottable>
          <span>{value}</span>
        </Slot>
      );
    }

    const markup = renderToStaticMarkup(
      <Quote
        asChild
        value={1}
      >
        <Quote
          asChild
          value={2}
        >
          <div>Suru UI</div>
        </Quote>
      </Quote>,
    );

    expect(markup).toBe(
      renderToStaticMarkup(
        <div>
          <span>1</span>
          <span>2</span>
          Suru UI
          <span>2</span>
          <span>1</span>
        </div>,
      ),
    );
  });
});
