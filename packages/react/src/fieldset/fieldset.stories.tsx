import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { CheckboxGroup } from "../checkbox-group/index.js";
import { Checkbox } from "../checkbox/index.js";
import { Field } from "../field/index.js";
import { Form } from "../form/index.js";
import { Input } from "../input/index.js";
import { RadioGroup } from "../radio-group/index.js";
import { Radio } from "../radio/index.js";
import { TextField } from "../text-field/index.js";
import { Textarea } from "../textarea/index.js";
import {
  Root as FieldsetPartsRoot,
  Legend as FieldsetPartsLegend,
  useAPI as useFieldsetAPI,
  Fieldset,
} from "./index.js";

const meta = preview.meta({
  title: "Fieldset",
  component: Fieldset,
});

export default meta;

const ctrl = controls(Fieldset, {
  legend: {
    control: "text",
  },
  disabled: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    legend: "お支払い情報",
    disabled: false,
  }),
  render(props) {
    return (
      <Form onSubmit={(event) => event.preventDefault()}>
        <Fieldset {...props} className="w-80">
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

export const Disabled = meta.story({
  name: "無効なグループ",
  ...ctrl({
    legend: "お届け先",
    disabled: true,
  }),
  render(props) {
    return (
      <Form onSubmit={(event) => event.preventDefault()}>
        <Fieldset {...props} className="w-80">
          <Field name="sui:name" label="氏名">
            <Input placeholder="例: 山田 太郎" />
          </Field>
          <Field name="sui:address" label="住所">
            <Input placeholder="例: 東京都千代田区" />
          </Field>
          <Button type="submit">送信</Button>
        </Fieldset>
      </Form>
    );
  },
});

export const WithoutLegend = meta.story({
  name: "凡例なし",
  ...ctrl({
    legend: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <Form onSubmit={(event) => event.preventDefault()}>
        <Fieldset {...props} className="w-80">
          <Field name="sui:nickname" label="ニックネーム">
            <Input placeholder="例: すーるー" />
          </Field>
          <Button type="submit">送信</Button>
        </Fieldset>
      </Form>
    );
  },
});

export const ContactForm = meta.story({
  name: "お問い合わせフォーム",
  ...ctrl({
    legend: "お問い合わせ内容",
    disabled: false,
  }),
  render(props) {
    return (
      <Form onSubmit={(event) => event.preventDefault()}>
        <Fieldset {...props} className="w-96">
          <Field name="sui:contactName" label="お名前">
            <TextField required placeholder="例: 山田 太郎" />
          </Field>
          <Field name="sui:contactEmail" label="メールアドレス">
            <TextField type="email" required placeholder="you@example.com" />
          </Field>
          <Field name="sui:contactBody" label="内容">
            <Textarea rows={4} required placeholder="お問い合わせ内容を入力してください。" />
          </Field>
          <Button type="submit">送信する</Button>
        </Fieldset>
      </Form>
    );
  },
});

export const Selections = meta.story({
  name: "選択肢のグループ化",
  ...ctrl({
    legend: undefined,
    disabled: false,
  }),
  render(props) {
    const { legend: _legend, ...otherProps } = props;

    return (
      <div className="flex w-96 flex-col gap-6">
        <Fieldset {...otherProps} legend="興味のある分野">
          <CheckboxGroup defaultValue={["engineering"]}>
            <label className="flex items-center gap-2">
              <Checkbox value="design" />
              デザイン
            </label>
            <label className="flex items-center gap-2">
              <Checkbox value="engineering" />
              エンジニアリング
            </label>
            <label className="flex items-center gap-2">
              <Checkbox value="marketing" />
              マーケティング
            </label>
          </CheckboxGroup>
        </Fieldset>
        <Fieldset {...otherProps} legend="プラン">
          <RadioGroup defaultValue="free">
            <label className="flex items-center gap-2">
              <Radio value="free" />
              無料
            </label>
            <label className="flex items-center gap-2">
              <Radio value="pro" />
              プロ
            </label>
            <label className="flex items-center gap-2">
              <Radio value="enterprise" />
              エンタープライズ
            </label>
          </RadioGroup>
        </Fieldset>
      </div>
    );
  },
});

export const SlotProps = meta.story({
  name: "パーツの個別指定",
  ...ctrl({
    legend: "配送オプション",
    disabled: false,
  }),
  render(props) {
    return (
      <Form onSubmit={(event) => event.preventDefault()}>
        <Fieldset
          {...props}
          className="w-80 gap-6"
          slotProps={{
            legend: { className: "text-red-500" },
          }}
        >
          <RadioGroup defaultValue="standard">
            <label className="flex items-center gap-2">
              <Radio value="standard" />
              通常配送
            </label>
            <label className="flex items-center gap-2">
              <Radio value="express" />
              速達
            </label>
          </RadioGroup>
          <Button type="submit">確定する</Button>
        </Fieldset>
      </Form>
    );
  },
});

export const Parts = meta.story({
  name: "パーツで組み立てる",
  ...ctrl({
    legend: undefined,
    disabled: false,
  }),
  render(props) {
    const { disabled } = props;

    return (
      <Form onSubmit={(event) => event.preventDefault()}>
        <FieldsetPartsRoot disabled={disabled} className="w-80">
          <FieldsetPartsLegend>パーツで組み立てる例</FieldsetPartsLegend>
          <Field name="sui:partsCompany" label="会社名">
            <Input placeholder="例: Suru UI 株式会社" />
          </Field>
          <Field name="sui:partsEmail" label="メールアドレス">
            <TextField type="email" placeholder="you@example.com" />
          </Field>
          <Button type="submit">送信</Button>
        </FieldsetPartsRoot>
      </Form>
    );
  },
});

export const WithAPI = meta.story({
  name: "APIで組み立てる",
  ...ctrl({
    legend: "APIで組み立てる例",
    disabled: false,
  }),
  render(props) {
    const api = useFieldsetAPI(props);
    const legendProps = api.getLegendProps();

    return (
      <Form onSubmit={(event) => event.preventDefault()}>
        <FieldsetPartsRoot {...api.getRootProps()} className="w-80">
          {legendProps && <FieldsetPartsLegend {...legendProps} />}
          <Field name="sui:apiName" label="氏名">
            <Input placeholder="例: 山田 太郎" />
          </Field>
          <Button type="submit">送信</Button>
        </FieldsetPartsRoot>
      </Form>
    );
  },
});
