import { Form } from "@base-ui/react/form";
import type * as React from "react";
import partialize from "../../shared/partialize.js";

function DisplayContents(props: { children?: React.ReactNode }) {
  return props.children;
}

export type FormErrorsProviderProps = {
  errors: Record<string, string | string[]> | 0 | false | null | undefined;
  children: React.ReactNode;
};

export default function FormErrorsProvider(props: FormErrorsProviderProps): React.ReactElement {
  const {
    errors,
    children,
  } = props;
  const formProps: Form.Props = partialize({
    errors: errors || undefined,
    render: <DisplayContents />,
  });

  return <Form {...formProps}>{children}</Form>;
}
