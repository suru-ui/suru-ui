// conform (https://github.com/edmundhung/conform) を参照

export type FormControlProps = {
  // key: string | undefined;
  id: string;
  name: string;
  form: string;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

export type SelectProps = FormControlProps & {
  defaultValue?: string | number | readonly string[] | undefined;
  multiple?: boolean;
};
