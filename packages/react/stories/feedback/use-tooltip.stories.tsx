import preview from "../../.config/storybook/preview.js";
import Button from "../../src/actions/button/button.jsx";
import { useTooltip } from "../../src/feedback/use-tooltip/index.js";

const meta = preview.meta({
  title: "Feedback / useTooltip",
});

export default meta;

export const Usage = meta.story({
  name: "使い方",
  render() {
    const [Trigger, Content] = useTooltip();

    return (
      <Button render={<Trigger />}>
        ボタン
        <Content>ツールチップの内容</Content>
      </Button>
    );
  },
});
