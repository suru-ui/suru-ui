import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { Tooltip } from "../tooltip/index.js";
import { TooltipGroup } from "./index.js";

const meta = preview.meta({
  title: "Tooltip Group",
  component: TooltipGroup,
});

export default meta;

const ctrl = controls(TooltipGroup, {
  delay: {
    control: "number",
  },
  timeout: {
    control: "number",
  },
  closeDelay: {
    control: "number",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    delay: 600,
    timeout: 400,
    closeDelay: 0,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-2 text-sm">
        <p>
          最初に開くときは遅延後に表示されます。閉じてから一定時間内に近接したツールチップを開くと、すぐに表示されます。
        </p>
        <div className="flex gap-3">
          <TooltipGroup {...props}>
            <Tooltip trigger={<Button>保存</Button>}>保存します</Tooltip>
            <Tooltip trigger={<Button>共有</Button>}>リンクを共有します</Tooltip>
            <Tooltip trigger={<Button>削除</Button>}>削除します</Tooltip>
          </TooltipGroup>
        </div>
      </div>
    );
  },
});
