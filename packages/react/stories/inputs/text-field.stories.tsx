import { HEIGHT_LIST } from "@suru-ui/theme";
import * as v from "valibot";
import preview from "../../.config/storybook/preview.js";
import { CharacterCount } from "../../src/inputs/character-count/index.js";
import FormErrorsProvider from "../../src/inputs/form-errors-provider/form-errors-provider.jsx";
import { TextField } from "../../src/inputs/text-field/index.js";

const meta = preview.meta({
  title: "Inputs / TextField",
  component: TextField,
});

export default meta;

export const Usage = meta.story({
  name: "使い方",
  argTypes: {
    description: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    name: {
      control: "text",
    },
    sizing: {
      options: HEIGHT_LIST,
      control: "select",
    },
    validate: {
      control: false,
    },
    validationDebounceTime: {
      control: "number",
    },
    validationMode: {
      options: ["onBlur", "onChange", "onSubmit"],
      control: "select",
    },
    variant: {
      options: ["outlined", "underlined"],
      control: "select",
    },
  },
  args: {
    label: "氏名",
    description: "氏と名を空白で区切ってください",
    placeholder: "入力内容",
    sizing: "md",
    variant: "outlined",
    disabled: false,
    validationMode: "onBlur",
    validationDebounceTime: 0,
  },
});

export const Sizing = meta.story({
  name: "大きさ",
  render(args) {
    return (
      <div className="space-y-6">
        {HEIGHT_LIST.map(sizing => (
          <TextField
            {...args}
            key={sizing}
            sizing={sizing}
          />
        ))}
      </div>
    );
  },
  args: {
    label: "氏名",
    description: "氏と名を空白で区切ってください",
    placeholder: "入力内容",
  },
});

export const Required = meta.story({
  name: "必須",
  args: {
    label: "氏名",
    description: "氏と名を空白で区切ってください",
    placeholder: "入力内容",
    required: true,
  },
});

export const Validation = meta.story({
  name: "検証",
  render(args) {
    return (
      <form className="space-y-6">
        <FormErrorsProvider
          errors={{
            username: "エラーテキスト",
            email: ["エラーテキスト１", "エラーテキスト２"],
          }}
        >
          <TextField
            {...args}
            name="username"
          />
          <TextField
            {...args}
            label={
              <>
                ユーザー名<CharacterCount />
              </>
            }
            validate={value => {
              const schema = v.pipe(
                v.string(),
                v.minLength(3),
                v.maxLength(10),
                v.regex(/^x[0-9]+$/),
              );
              const result = v.safeParse(schema, value);
              return result.success
                ? null
                : result.issues.map(i => i.message);
            }}
          />
          <TextField
            {...args}
            name="email"
          />
        </FormErrorsProvider>
      </form>
    );
  },
  args: {
    label: "ユーザー名",
    description: "ユーザー名を入力してください",
  },
});
