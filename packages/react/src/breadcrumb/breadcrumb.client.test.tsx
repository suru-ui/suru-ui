import "@suru-ui/theme/suru.css";
import * as React from "react";
import { vi, test, describe } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { ContextMissingError } from "../errors.js";
import { Breadcrumb, BreadcrumbAPI, useBreadcrumbAPI } from "./breadcrumb.jsx";
import { BreadcrumbItem } from "./item/breadcrumb.item.jsx";
import { BreadcrumbLink } from "./link/breadcrumb.link.jsx";
import { BreadcrumbList } from "./list/breadcrumb.list.jsx";
import { useBreadcrumbContext } from "./root/breadcrumb.root.context.js";
import { BreadcrumbRoot } from "./root/breadcrumb.root.jsx";
import { BreadcrumbSeparator } from "./separator/breadcrumb.separator.jsx";
import "../../tests/src/_locators.js";

const items = [
  { href: "/", label: "ホーム" },
  { href: "/products", label: "製品" },
  { label: "Suru UI" },
] as const;

describe("BreadcrumbRoot", () => {
  test("ナビゲーション要素に既定の修飾を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<BreadcrumbRoot />);

    // 検証
    const root = screen.getByRole("navigation", { name: "パンくずリスト" }).element();
    expect(root.tagName).toBe("NAV");
    expect(root.classList.contains("sui_breadcrumb")).toBe(true);
    expect(root.classList.contains("sui_breadcrumb-size_md")).toBe(true);
    expect(root.classList.contains("sui_breadcrumb-color_grey")).toBe(true);
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("大きさと配色と項目を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useBreadcrumbContext();
      return <span>{[ctx.size, ctx.color, String(ctx.items.length)].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <BreadcrumbRoot size="lg" color="blue" items={[...items]}>
        <Probe />
      </BreadcrumbRoot>,
    );

    // 検証
    expect(screen.getByText("lg,blue,3").query()?.textContent).toBe("lg,blue,3");
  });

  test("利用者の aria-label を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<BreadcrumbRoot aria-label="現在地" />);

    // 検証
    expect(screen.getByRole("navigation", { name: "現在地" }).query()).not.toBe(null);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<BreadcrumbRoot render={<section />} aria-label="現在地" />);

    // 検証
    expect(screen.getByLabelText("現在地").element().tagName).toBe("SECTION");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot
        size="lg"
        color="blue"
        items={[...items]}
        render={(props, state) => (
          <nav {...props} data-probe={`${state.size}/${state.color}/${state.items.length}`} />
        )}
      />,
    );

    // 検証
    const root = screen.getByClassName("sui_breadcrumb").element();
    expect(root.tagName).toBe("NAV");
    expect(root.getAttribute("data-probe")).toBe("lg/blue/3");
  });
});

describe("BreadcrumbList", () => {
  test("項目からセパレーター付きの並びを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot items={[...items]}>
        <BreadcrumbList />
      </BreadcrumbRoot>,
    );

    // 検証
    expect(screen.getByRole("list").element().tagName).toBe("OL");
    expect(screen.getByRole("link", { name: "ホーム" }).element().getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: "製品" }).element().getAttribute("href")).toBe(
      "/products",
    );
    const current = screen.container.querySelector<HTMLElement>('[aria-current="page"]');
    expect(current?.tagName).toBe("SPAN");
    expect(current?.textContent).toBe("Suru UI");
    expect(screen.getByClassName("sui_breadcrumb_separator").elements().length).toBe(2);
  });

  test("関数の children に項目を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot items={[...items]}>
        <BreadcrumbList>
          {(item, index) => (
            <li key={index}>
              {index}:{item.label}
            </li>
          )}
        </BreadcrumbList>
      </BreadcrumbRoot>,
    );

    // 検証
    expect(screen.getByText("0:ホーム").query()).not.toBe(null);
    expect(screen.getByText("2:Suru UI").query()).not.toBe(null);
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備と実行と検証
    await expect(
      render(
        <BreadcrumbList>
          <li>単独</li>
        </BreadcrumbList>,
      ),
    ).rejects.toThrow(ContextMissingError);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot size="lg" color="blue" items={[...items]}>
        <BreadcrumbList
          render={(props, state) => (
            <ol {...props} data-probe={`${state.size}/${state.color}/${state.items.length}`} />
          )}
        />
      </BreadcrumbRoot>,
    );

    // 検証
    expect(screen.getByRole("list").element().getAttribute("data-probe")).toBe("lg/blue/3");
  });
});

describe("BreadcrumbItem", () => {
  test("項目要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot>
        <BreadcrumbItem data-testid="crumb">項目</BreadcrumbItem>
      </BreadcrumbRoot>,
    );

    // 検証
    const item = screen.getByTestId("crumb").element();
    expect(item.tagName).toBe("LI");
    expect(item.classList.contains("sui_breadcrumb_item")).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot size="lg" color="blue">
        <BreadcrumbItem
          render={(props, state) => <li {...props} data-probe={`${state.size}/${state.color}`} />}
        />
      </BreadcrumbRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_breadcrumb_item").element().getAttribute("data-probe")).toBe(
      "lg/blue",
    );
  });
});

describe("BreadcrumbLink", () => {
  test("通常のリンクとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot>
        <BreadcrumbLink href="/home">ホーム</BreadcrumbLink>
      </BreadcrumbRoot>,
    );

    // 検証
    const link = screen.getByRole("link", { name: "ホーム" }).element();
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("/home");
    expect(link.getAttribute("aria-current")).toBe(null);
  });

  test("現在のページではリンクにしない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot>
        <BreadcrumbLink href="/home" current>
          現在
        </BreadcrumbLink>
      </BreadcrumbRoot>,
    );

    // 検証
    const element = screen.getByText("現在").element();
    expect(element.tagName).toBe("SPAN");
    expect(element.getAttribute("href")).toBe(null);
    expect(element.getAttribute("aria-current")).toBe("page");
    expect(element.classList.contains("sui_breadcrumb_link-current")).toBe(true);
  });

  test("無効なリンクでは遷移を止める", async ({ expect }) => {
    // 準備
    const onClick = vi.fn<() => void>();
    const screen = await render(
      <BreadcrumbRoot>
        <BreadcrumbLink href="/home" onClick={onClick} disabled>
          無効
        </BreadcrumbLink>
      </BreadcrumbRoot>,
    );
    const element = screen.getByText("無効").element();
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });

    // 実行
    element.dispatchEvent(event);

    // 検証
    expect(event.defaultPrevented).toBe(true);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(element.getAttribute("href")).toBe(null);
    expect(element.getAttribute("aria-disabled")).toBe("true");
    expect(element.getAttribute("tabindex")).toBe("-1");
    expect(element.classList.contains("sui_breadcrumb_link-disabled")).toBe(true);
  });

  test("通常のリンクでは遷移を止めない", async ({ expect }) => {
    // 準備
    const onClick = vi.fn<() => void>();
    const screen = await render(
      <BreadcrumbRoot>
        <BreadcrumbLink href="#home" onClick={onClick}>
          ホーム
        </BreadcrumbLink>
      </BreadcrumbRoot>,
    );
    const element = screen.getByRole("link", { name: "ホーム" }).element();
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });

    // 実行
    element.dispatchEvent(event);

    // 検証
    expect(event.defaultPrevented).toBe(false);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot size="lg" color="blue">
        <BreadcrumbLink
          render={(props, state) => (
            <span
              {...props}
              data-probe={`${state.size}/${state.color}/${String(state.current)}/${String(state.disabled)}`}
            />
          )}
          current
          disabled
        >
          現在
        </BreadcrumbLink>
      </BreadcrumbRoot>,
    );

    // 検証
    expect(screen.getByText("現在").element().getAttribute("data-probe")).toBe("lg/blue/true/true");
  });
});

describe("BreadcrumbSeparator", () => {
  test("既定では装飾のアイコンを隠して表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot>
        <BreadcrumbSeparator />
      </BreadcrumbRoot>,
    );

    // 検証
    const separator = screen.getByClassName("sui_breadcrumb_separator").element();
    expect(separator.tagName).toBe("LI");
    expect(separator.getAttribute("aria-hidden")).toBe("true");
    expect(separator.querySelector("svg")).not.toBe(null);
  });

  test("children を差し替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot>
        <BreadcrumbSeparator>／</BreadcrumbSeparator>
      </BreadcrumbRoot>,
    );

    // 検証
    const separator = screen.getByClassName("sui_breadcrumb_separator").element();
    expect(separator.textContent).toBe("／");
    expect(separator.getAttribute("aria-hidden")).toBe("true");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BreadcrumbRoot size="lg" color="blue">
        <BreadcrumbSeparator
          render={(props, state) => <li {...props} data-probe={`${state.size}/${state.color}`} />}
        />
      </BreadcrumbRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_breadcrumb_separator").element().getAttribute("data-probe"),
    ).toBe("lg/blue");
  });
});

describe("Breadcrumb", () => {
  test("項目を順に並べて最後の項目を現在位置にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Breadcrumb items={[...items]} />);

    // 検証
    const root = screen.getByRole("navigation", { name: "パンくずリスト" }).element();
    expect(root.classList.contains("sui_breadcrumb-size_md")).toBe(true);
    expect(screen.getByRole("list").element().tagName).toBe("OL");
    expect(screen.container.querySelectorAll(".sui_breadcrumb_link").length).toBe(3);
    expect(screen.getByRole("link", { name: "ホーム" }).element().getAttribute("href")).toBe("/");
    expect(screen.container.querySelector('[aria-current="page"]')?.textContent).toBe("Suru UI");
    expect(screen.getByClassName("sui_breadcrumb_separator").elements().length).toBe(2);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Breadcrumb
        items={[...items]}
        slotProps={{
          item: { className: "custom-item" },
          link: { rel: "nofollow", className: "custom-link" },
          list: { "aria-label": "経路" },
          separator: { children: "／" },
        }}
      />,
    );

    // 検証
    expect(screen.getByRole("list", { name: "経路" }).element().tagName).toBe("OL");
    expect(screen.container.querySelectorAll(".custom-item").length).toBe(3);
    const link = screen.getByRole("link", { name: "ホーム" }).element();
    expect(link.classList.contains("custom-link")).toBe(true);
    expect(link.getAttribute("rel")).toBe("nofollow");
    expect(screen.getByText("／").elements().length).toBe(2);
  });

  test("項目ごとの props をリンクへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Breadcrumb items={[{ href: "/", label: "ホーム", target: "_blank" }, { label: "現在" }]} />,
    );

    // 検証
    expect(screen.getByRole("link", { name: "ホーム" }).element().getAttribute("target")).toBe(
      "_blank",
    );
  });

  test("children に関数を渡すと項目を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Breadcrumb
        items={[...items]}
        children={(item, index) => <li key={index}>{item.label}</li>}
      />,
    );

    // 検証
    expect(screen.getByText("ホーム").query()).not.toBe(null);
    expect(screen.getByClassName("sui_breadcrumb_separator").query()).toBe(null);
  });

  test("children に null を渡すと既定の並びにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Breadcrumb items={[...items]} children={null} />);

    // 検証
    expect(screen.getByRole("link", { name: "ホーム" }).query()).not.toBe(null);
  });

  test("項目がないときはリンクを描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Breadcrumb items={[]} />);

    // 検証
    expect(screen.container.querySelectorAll(".sui_breadcrumb_link").length).toBe(0);
  });
});

describe("Breadcrumb の省略", () => {
  const manyItems = [
    { href: "#", label: "ホーム" },
    { href: "#", label: "製品" },
    { href: "#", label: "ライブラリ" },
    { href: "#", label: "コンポーネント" },
    { label: "Suru UI" },
  ] as const;

  test("maxItems 以下では省略しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Breadcrumb items={manyItems} maxItems={5} />);

    // 検証
    expect(screen.getByRole("link", { name: "製品" }).query()).not.toBe(null);
    expect(screen.getByClassName("sui_breadcrumb_ellipsis").query()).toBe(null);
  });

  test("maxItems を超えると先頭と末尾以外を省略記号のボタンにまとめる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Breadcrumb items={manyItems} maxItems={3} />);

    // 検証
    const trigger = screen.getByClassName("sui_breadcrumb_ellipsis").element();
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.getAttribute("aria-label")).toBe("省略された項目を表示");
    expect(trigger.querySelector("svg")).not.toBe(null);
    expect(screen.getByRole("link", { name: "ホーム" }).query()).not.toBe(null);
    expect(screen.container.querySelector('[aria-current="page"]')?.textContent).toBe("Suru UI");
    expect(screen.getByRole("link", { name: "製品" }).query()).toBe(null);
  });

  test("省略記号を押すとポップアップ内の入力欄で省略された項目を選べる", async ({ expect }) => {
    // 準備
    const onClick = vi.fn<() => void>();
    const screen = await render(
      <Breadcrumb
        items={[
          { href: "#", label: "ホーム" },
          {
            href: "#products",
            label: "製品",
            onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              onClick();
            },
          },
          { href: "#", label: "ライブラリ" },
          { href: "#", label: "コンポーネント" },
          { label: "Suru UI" },
        ]}
        maxItems={3}
      />,
    );

    // 実行
    await screen.getByClassName("sui_breadcrumb_ellipsis").click();

    // 検証
    const popup = screen.getByClassName("sui_combobox_popup").element();
    expect(popup.querySelector("input")?.getAttribute("placeholder")).toBe("項目を検索");
    expect(
      screen
        .getByRole("option")
        .elements()
        .map((option) => option.textContent),
    ).toStrictEqual(["製品", "ライブラリ", "コンポーネント"]);

    // 実行と検証
    await screen.getByRole("option", { name: "製品" }).click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("省略された項目をキーボードで選択できる", async ({ expect }) => {
    // 準備
    const onClick = vi.fn<() => void>();
    const screen = await render(
      <Breadcrumb
        items={[
          { href: "#", label: "ホーム" },
          {
            href: "#products",
            label: "製品",
            onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              onClick();
            },
          },
          { href: "#", label: "ライブラリ" },
          { href: "#", label: "コンポーネント" },
          { label: "Suru UI" },
        ]}
        maxItems={3}
      />,
    );
    await screen.getByClassName("sui_breadcrumb_ellipsis").click();

    // 実行
    await userEvent.keyboard("{ArrowDown}{Enter}");

    // 検証
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("BreadcrumbAPI", () => {
  test("getLinkProps は最後の項目を現在位置にする", ({ expect }) => {
    // 準備と実行
    const api = new BreadcrumbAPI({ items: [...items] });
    const first = api.getLinkProps(items[0], 0);
    const last = api.getLinkProps(items[2], 2);

    // 検証
    expect(first.current).toBe(false);
    expect(first.href).toBe("/");
    expect(first.children).toBe("ホーム");
    expect(last.current).toBe(true);
  });

  test("getLinkProps は項目ごとの現在位置の指定を優先する", ({ expect }) => {
    // 準備
    const currentItem = { href: "/middle", label: "途中", current: true };

    // 実行
    const api = new BreadcrumbAPI({ items: [currentItem, { label: "最後" }] });
    const props = api.getLinkProps(currentItem, 0);

    // 検証
    expect(props.current).toBe(true);
  });

  test("getLinkProps は項目の props をリンクへ渡す", ({ expect }) => {
    // 準備と実行
    const api = new BreadcrumbAPI({
      items: [{ href: "/", label: "ホーム", target: "_blank" }],
    });
    const props = api.getLinkProps({ href: "/", label: "ホーム", target: "_blank" }, 0);

    // 検証
    expect(props.target).toBe("_blank");
  });

  test("getRootProps は items を引き継ぎ slotProps を含めない", ({ expect }) => {
    // 準備と実行
    const api = new BreadcrumbAPI({
      items: [...items],
      slotProps: { list: { id: "list" } },
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.items).toStrictEqual(items);
    expect(rootProps).not.toHaveProperty("slotProps");
  });

  test("getListProps は既定のレンダラーを持つ", ({ expect }) => {
    // 準備と実行
    const api = new BreadcrumbAPI({
      items: [...items],
      slotProps: { list: { id: "list" } },
    });
    const listProps = api.getListProps();

    // 検証
    expect(typeof listProps.children).toBe("function");
    expect(listProps.id).toBe("list");
  });

  test("getItemProps と getSeparatorProps は slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new BreadcrumbAPI({
      items: [...items],
      slotProps: {
        item: { id: "item" },
        separator: { id: "separator" },
      },
    });

    // 検証
    expect(api.getItemProps()).toStrictEqual({ id: "item" });
    expect(api.getSeparatorProps()).toStrictEqual({ id: "separator" });
  });

  test("getLabel は項目のラベルを返す", ({ expect }) => {
    // 準備と実行
    const api = new BreadcrumbAPI({ items: [...items] });

    // 検証
    expect(api.getLabel(items[1])).toBe("製品");
  });
});

describe("useBreadcrumbAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useBreadcrumbAPI({ items: [...items] });
      return <span>{String(api.getRootProps().items?.length)}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("3").query()?.textContent).toBe("3");
  });
});
