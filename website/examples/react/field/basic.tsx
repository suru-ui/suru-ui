import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { Field } from "@suru-ui/react/field";
import { Form } from "@suru-ui/react/form";
import { TextField } from "@suru-ui/react/text-field";

export default function Basic() {
  return (
    <Form onSubmit={(evt) => evt.preventDefault()} className="grid grid-rows-[100px_auto]">
      <Field
        name="sui:email"
        label="名前"
        description="プロフィールに表示されます。"
        validationMode="onSubmit"
        errorMatches={{
          typeMismatch: "有効なメールアドレスを入力してください。",
          valueMissing: "メールアドレスを入力してください。",
        }}
      >
        <TextField type="email" required className="w-[320px]" placeholder="you@example.com" />
      </Field>
      <div className="flex">
        <Button type="submit" className="ml-auto">
          送信
        </Button>
      </div>
    </Form>
  );
}
