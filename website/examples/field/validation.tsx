import { Form, Field, Button } from "@suru-ui/react";
import * as React from "react";

const formStyle: React.CSSProperties = {
  gap: "0.75rem",
  width: "20rem",
  display: "grid",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #d4d4d4",
  padding: "0.5rem 0.625rem",
  fontSize: "0.875rem",
  boxSizing: "border-box",
  fontFamily: "inherit",
  borderRadius: "0.375rem",
};

type ValidityRenderState = {
  readonly validity: {
    readonly valid: boolean | null;
  };
};

function renderValidity(state: ValidityRenderState): React.ReactNode {
  return state.validity.valid === true ? (
    <span
      style={{
        color: "#15803d",
        fontSize: "0.8125rem",
      }}
    >
      このユーザー名は使用できます。
    </span>
  ) : null;
}

export default function FieldValidationExample(): React.ReactNode {
  return (
    <Form
      style={formStyle}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Field
        label="ユーザー名"
        validate={(value) => {
          if (typeof value !== "string" || value.length < 3) {
            return "3 文字以上で入力してください。";
          }

          if (value.toLowerCase() === "admin") {
            return "このユーザー名は使用できません。";
          }

          return null;
        }}
        validity={renderValidity}
        description="3 文字以上で入力してください。admin は使用できません。"
        errorMatches={{
          customError: "このユーザー名は使用できません。",
        }}
        validationMode="onChange"
      >
        <Field.Control style={inputStyle} required placeholder="suru-taro" />
      </Field>
      <Button type="submit">保存</Button>
    </Form>
  );
}
