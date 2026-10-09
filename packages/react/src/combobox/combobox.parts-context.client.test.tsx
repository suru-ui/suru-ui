import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { useComboboxArrowContext } from "./arrow/combobox.arrow.context.jsx";
import { ComboboxArrow } from "./arrow/combobox.arrow.jsx";
import { useComboboxBackdropContext } from "./backdrop/combobox.backdrop.context.jsx";
import { ComboboxBackdrop } from "./backdrop/combobox.backdrop.jsx";
import { useComboboxChipRemoveContext } from "./chip-remove/combobox.chip-remove.context.jsx";
import { ComboboxChipRemove } from "./chip-remove/combobox.chip-remove.jsx";
import { useComboboxChipContext } from "./chip/combobox.chip.context.jsx";
import { ComboboxChip } from "./chip/combobox.chip.jsx";
import { useComboboxChipsContext } from "./chips/combobox.chips.context.jsx";
import { ComboboxChips } from "./chips/combobox.chips.jsx";
import { useComboboxClearContext } from "./clear/combobox.clear.context.jsx";
import { ComboboxClear } from "./clear/combobox.clear.jsx";
import { useComboboxEmptyContext } from "./empty/combobox.empty.context.jsx";
import { ComboboxEmpty } from "./empty/combobox.empty.jsx";
import { useComboboxGroupLabelContext } from "./group-label/combobox.group-label.context.jsx";
import { ComboboxGroupLabel } from "./group-label/combobox.group-label.jsx";
import { useComboboxGroupContext } from "./group/combobox.group.context.jsx";
import { ComboboxGroup } from "./group/combobox.group.jsx";
import { useComboboxIconContext } from "./icon/combobox.icon.context.jsx";
import { ComboboxIcon } from "./icon/combobox.icon.jsx";
import { ComboboxInputGroup } from "./input-group/combobox.input-group.jsx";
import { useComboboxInputContext } from "./input/combobox.input.context.jsx";
import { ComboboxInput } from "./input/combobox.input.jsx";
import { useComboboxItemIndicatorContext } from "./item-indicator/combobox.item-indicator.context.jsx";
import { ComboboxItemIndicator } from "./item-indicator/combobox.item-indicator.jsx";
import { ComboboxItem } from "./item/combobox.item.jsx";
import { useComboboxListContext } from "./list/combobox.list.context.jsx";
import { ComboboxList } from "./list/combobox.list.jsx";
import { useComboboxPopupContext } from "./popup/combobox.popup.context.jsx";
import { ComboboxPopup } from "./popup/combobox.popup.jsx";
import { useComboboxPortalContext } from "./portal/combobox.portal.context.jsx";
import { ComboboxPortal } from "./portal/combobox.portal.jsx";
import { useComboboxPositionerContext } from "./positioner/combobox.positioner.context.jsx";
import { ComboboxPositioner } from "./positioner/combobox.positioner.jsx";
import { ComboboxRoot } from "./root/combobox.root.jsx";
import { useComboboxSeparatorContext } from "./separator/combobox.separator.context.jsx";
import { ComboboxSeparator } from "./separator/combobox.separator.jsx";
import { useComboboxStatusContext } from "./status/combobox.status.context.jsx";
import { ComboboxStatus } from "./status/combobox.status.jsx";
import { useComboboxTriggerLabelContext } from "./trigger-label/combobox.trigger-label.context.jsx";
import { ComboboxTriggerLabel } from "./trigger-label/combobox.trigger-label.jsx";
import { useComboboxTriggerContext } from "./trigger/combobox.trigger.context.jsx";
import { ComboboxTrigger } from "./trigger/combobox.trigger.jsx";
import "../../tests/src/_locators.js";

const fruits = ["りんご", "ばなな"];

describe("Combobox のパーツコンテキスト", () => {
  test("入力欄の状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxInputContext();
      return <span>{`${ctx.size}/${String(ctx.open)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxInputGroup>
          <ComboboxInput render={() => <Probe />} />
        </ComboboxInputGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/true").query()?.textContent).toBe("lg/true");
  });

  test("チップコンテナーの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxChipsContext();
      return <span>{`${ctx.size}/${String(ctx.multiple)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxInputGroup>
          <ComboboxChips render={() => <Probe />} />
        </ComboboxInputGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/false").query()?.textContent).toBe("lg/false");
  });

  test("チップの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxChipContext();
      return <span>{`${ctx.size}/${ctx.variant}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxInputGroup>
          <ComboboxChips>
            <ComboboxChip value="りんご" render={() => <Probe />} />
          </ComboboxChips>
        </ComboboxInputGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/solid").query()?.textContent).toBe("lg/solid");
  });

  test("チップ削除ボタンの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxChipRemoveContext();
      return <span>{`${ctx.size}/${ctx.radius}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxInputGroup>
          <ComboboxChips>
            <ComboboxChip value="りんご">
              <ComboboxChipRemove render={() => <Probe />} />
            </ComboboxChip>
          </ComboboxChips>
        </ComboboxInputGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/lg").query()?.textContent).toBe("lg/lg");
  });

  test("消去ボタンの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxClearContext();
      return <span>{`${ctx.size}/${String(ctx.open)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits} defaultValue="りんご">
        <ComboboxInputGroup>
          <ComboboxClear render={() => <Probe />} />
        </ComboboxInputGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/true").query()?.textContent).toBe("lg/true");
  });

  test("アイコンの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxIconContext();
      return <span>{`${ctx.size}/${String(ctx.multiple)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxInputGroup>
          <ComboboxIcon render={() => <Probe />} />
        </ComboboxInputGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/false").query()?.textContent).toBe("lg/false");
  });

  test("トリガーの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxTriggerContext();
      return <span>{`${ctx.size}/${String(ctx.open)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxTrigger>{() => <Probe />}</ComboboxTrigger>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/true").query()?.textContent).toBe("lg/true");
  });

  test("トリガーラベルの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxTriggerLabelContext();
      return <span>{`${ctx.size}/${String(ctx.disabled)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxTriggerLabel render={() => <Probe />} />
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/false").query()?.textContent).toBe("lg/false");
  });

  test("ポータルの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxPortalContext();
      return <span>{`${ctx.size}/${ctx.radius}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxPortal render={() => <Probe />} />
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/lg").query()?.textContent).toBe("lg/lg");
  });

  test("背景の状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxBackdropContext();
      return <span>{`${ctx.size}/${String(ctx.open)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxPortal>
          <ComboboxBackdrop render={() => <Probe />} />
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/true").query()?.textContent).toBe("lg/true");
  });

  test("位置決めの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxPositionerContext();
      return <span>{`${ctx.size}/${ctx.side}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxPortal>
          <ComboboxPositioner render={() => <Probe />} />
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/bottom").query()?.textContent).toBe("lg/bottom");
  });

  test("ポップアップの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxPopupContext();
      return <span>{`${ctx.size}/${String(ctx.open)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup render={() => <Probe />} />
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/true").query()?.textContent).toBe("lg/true");
  });

  test("矢印の状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxArrowContext();
      return <span>{`${ctx.size}/${String(ctx.open)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxArrow render={() => <Probe />} />
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/true").query()?.textContent).toBe("lg/true");
  });

  test("状態読み上げの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxStatusContext();
      return <span>{`${ctx.size}/${String(ctx.multiple)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxStatus render={() => <Probe />} />
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/false").query()?.textContent).toBe("lg/false");
  });

  test("空表示の状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxEmptyContext();
      return <span>{`${ctx.size}/${String(ctx.multiple)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={[]}>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxEmpty render={() => <Probe />} />
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/false").query()?.textContent).toBe("lg/false");
  });

  test("リストの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxListContext();
      return <span>{`${ctx.size}/${String(ctx.empty)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxList render={() => <Probe />} />
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/false").query()?.textContent).toBe("lg/false");
  });

  test("グループの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxGroupContext();
      return <span>{`${ctx.size}/${ctx.items?.length}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxList>
                <ComboboxGroup items={fruits} render={() => <Probe />} />
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/2").query()?.textContent).toBe("lg/2");
  });

  test("グループ見出しの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxGroupLabelContext();
      return <span>{`${ctx.size}/${String(ctx.multiple)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxList>
                <ComboboxGroup items={fruits}>
                  <ComboboxGroupLabel render={() => <Probe />} />
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/false").query()?.textContent).toBe("lg/false");
  });

  test("区切り線の状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxSeparatorContext();
      return <span>{`${ctx.size}/${String(ctx.multiple)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxList>
                <ComboboxGroup items={fruits}>
                  <ComboboxSeparator render={() => <Probe />} />
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/false").query()?.textContent).toBe("lg/false");
  });

  test("項目インジケーターの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxItemIndicatorContext();
      return <span>{`${ctx.size}/${String(ctx.multiple)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits} defaultValue="りんご">
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxList>
                <ComboboxItem value="りんご">
                  <ComboboxItemIndicator render={() => <Probe />} />
                </ComboboxItem>
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg/false").query()?.textContent).toBe("lg/false");
  });
});
