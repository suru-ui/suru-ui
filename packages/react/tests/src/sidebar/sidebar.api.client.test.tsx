import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { SidebarAPI, useSidebarAPI } from "../../../src/index.js";

describe("SidebarAPI", () => {
  test("ルートの再輸出から API を作成できる", ({ expect }) => {
    // 準備と実行
    const api = new SidebarAPI({
      defaultOpen: false,
      slotProps: { provider: { id: "provider" } },
    });

    // 検証
    expect(api).toBeInstanceOf(SidebarAPI);
    expect(api.getProviderProps()).toStrictEqual({ defaultOpen: false, id: "provider" });
  });
});

describe("useSidebarAPI", () => {
  test("ルートの再輸出から API を作成できる", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useSidebarAPI({ slotProps: { provider: { id: "provider" } } });

      return <span>{api instanceof SidebarAPI ? api.getProviderProps().id : "別物"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("provider").query()?.textContent).toBe("provider");
  });
});
