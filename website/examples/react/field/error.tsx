import * as React from "react";

import "../../_fixture";
import { Field } from "@suru-ui/react/field";
import { Form } from "@suru-ui/react/form";
import { TextField } from "@suru-ui/react/text-field";

export default function Error() {
  const actionsRef = React.useRef<Form.Actions>(null);

  React.useEffect(() => {
    actionsRef.current?.validate("sui:name");
  }, []);

  return (
    <Form className="grid grid-rows-[100px_auto]" actionsRef={actionsRef}>
      <Field
        name="sui:name"
        label="名前"
        description="プロフィールに表示されます。"
        validationMode="onSubmit"
        errorMatches={{
          valueMissing: "名前を入力してください。",
        }}
      >
        <TextField required className="w-[320px]" placeholder="田中 太郎" />
      </Field>
    </Form>
  );
}
