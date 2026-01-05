import preview from "../../.config/storybook/preview.js";
import Button from "../../src/actions/button/button.jsx";
import TooltipGroup from "../../src/feedback/tooltip-group/tooltip-group.jsx";
import { useTooltip } from "../../src/feedback/use-tooltip/index.js";

const meta = preview.meta({
  title: "Feedback / TooltipGroup",
});

export default meta;

export const Usage = meta.story({
  name: "使い方",
  render() {
    const [Trigger1, Content1] = useTooltip();
    const [Trigger2, Content2] = useTooltip();
    const [Trigger3, Content3] = useTooltip();

    return (
      <div className="space-x-2">
        <TooltipGroup>
          <Button render={<Trigger1 />}>
            ボタン1
            <Content1>ツールチップの内容1</Content1>
          </Button>
          <Button render={<Trigger2 />}>
            ボタン2
            <Content2>ツールチップの内容2</Content2>
          </Button>
          <Button render={<Trigger3 />}>
            ボタン3
            <Content3>ツールチップの内容3</Content3>
          </Button>
        </TooltipGroup>
      </div>
    );
  },
});
