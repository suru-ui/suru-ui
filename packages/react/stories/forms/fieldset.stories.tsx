import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { Field } from "../../src/forms/field/index.js";
import { Fieldset } from "../../src/forms/fieldset/index.js";

const meta = preview.meta({
  title: "Forms / Fieldset",
  component: Fieldset.Root,
});

export default meta;

const ctrl = controls(Fieldset.Root, {
  disabled: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    disabled: false,
  }),
  render(props) {
    return (
      <form onSubmit={(event) => event.preventDefault()}>
        <Fieldset {...props} className="w-80">
          <Fieldset.Legend>お支払い情報</Fieldset.Legend>
          <Field.Root name="company">
            <Field.Label>会社名</Field.Label>
            <Field.Control required placeholder="例: Suru UI 株式会社" />
          </Field.Root>
          <Field.Root name="taxId">
            <Field.Label>法人番号</Field.Label>
            <Field.Control required placeholder="例: 1234567890123" />
          </Field.Root>
          <Button type="submit">送信</Button>
        </Fieldset>
      </form>
    );
  },
});
