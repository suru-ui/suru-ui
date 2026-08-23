import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { Field } from "@suru-ui/react/field";
import { Fieldset } from "@suru-ui/react/fieldset";
import { Form } from "@suru-ui/react/form";
import { Input } from "@suru-ui/react/input";

export default function Basic() {
  return (
    <Form onSubmit={(evt) => evt.preventDefault()}>
      <Fieldset className="w-80">
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
}
