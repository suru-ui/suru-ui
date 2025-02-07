import "../../dist/suru.css";

import { getFormProps, getSelectProps, useForm } from "@conform-to/react";
import type { Story, StoryDefault } from "@ladle/react";
import { getValibotConstraint, parseWithValibot } from "conform-to-valibot";
import * as React from "react";
import * as v from "valibot";
import Select from ".";

export default {
  title: "Forms / Select",
} satisfies StoryDefault;

export const Basic: Story = () => {
  const schema = v.object({
    fruit: v.optional(
      v.enum({
        "りんご": "apple",
        "みかん": "orange",
        "いちご": "strawberry",
      }),
      "strawberry", // デフォルト値
    ),
  });
  const [payload, setPayload] = React.useState("");
  const [form, fields] = useForm({
    constraint: getValibotConstraint(schema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
    onSubmit(event, context) {
      event.preventDefault();

      if (context.submission?.payload == null) {
        setPayload("");
      } else {
        setPayload(JSON.stringify(context.submission?.payload, null, 4));
      }
    },
  });

  return (
    <form
      method="POST"
      className="space-y-3"
      {...getFormProps(form)}
    >
      <Select
        conform={getSelectProps(fields.fruit)}
        placeholder="未選択"
      >
        <Select.Option value="apple">りんご</Select.Option>
        <Select.Option value="orange">みかん</Select.Option>
        <Select.Option value="strawberry">いちご</Select.Option>
      </Select>
      <div id={fields.fruit.errorId}>{fields.fruit.errors}</div>

      <button type="submit">決定</button>

      <pre><code>{payload}</code></pre>
    </form>
  );
};
Basic.storyName = "基本的な使い方";

export const Disabled: Story = () => {
  const schema = v.object({
    fruit: v.union([
      v.literal("りんご"),
      v.literal("みかん"),
      v.literal("いちご"),
    ]),
  });
  const [payload, setPayload] = React.useState("");
  const [form, fields] = useForm({
    constraint: getValibotConstraint(schema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
    onSubmit(event, context) {
      event.preventDefault();

      if (context.submission?.payload == null) {
        setPayload("");
      } else {
        setPayload(JSON.stringify(context.submission?.payload, null, 4));
      }
    },
  });

  return (
    <form
      method="POST"
      className="space-y-3"
      {...getFormProps(form)}
    >
      <Select
        conform={getSelectProps(fields.fruit)}
        disabled
      >
        <Select.Option value="りんご">りんご</Select.Option>
        <Select.Option value="みかん">みかん</Select.Option>
        <Select.Option value="いちご">いちご</Select.Option>
      </Select>
      <div>{fields.fruit.errors}</div>

      <button type="submit">決定</button>

      <pre><code>{payload}</code></pre>
    </form>
  );
};
Disabled.storyName = "非活性化";
