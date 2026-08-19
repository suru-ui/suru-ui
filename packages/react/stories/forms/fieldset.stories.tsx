import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { Field } from "../../src/forms/field/index.js";
import { Fieldset } from "../../src/forms/fieldset/index.js";
import { Form } from "../../src/forms/form/index.js";
import { Input } from "../../src/forms/input/index.js";

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
      <Form onSubmit={(event) => event.preventDefault()}>
        <Fieldset {...props} className="w-80">
          <Fieldset.Legend>お支払い情報</Fieldset.Legend>
          <Field name="sui:company" label="会社名">
            <Input required placeholder="例: Suru UI 株式会社" />
          </Field>
          <Field name="sui:taxId" label="法人番号">
            <Input required placeholder="例: 1234567890123" />
          </Field>
          <Button type="submit">送信</Button>
        </Fieldset>
      </Form>
    );
  },
});
