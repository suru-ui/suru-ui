export interface CloneableNode extends Pick<Node, "cloneNode"> {}

export namespace SelectEvent {
  export type Option = {
    pkey: string;
    ref: React.RefObject<CloneableNode | null>;
    value: string | number | readonly string[];
  };

  export type Options = {
    index: Set<string>;
    options: Option[];
  };

  export type Operation = {
    type: "ON" | "OFF";
    pkey: string;
  };

  export const channel = (id: string) => `select_${id}`;
}

export type SelectEvent = SelectEvent.Operation & SelectEvent.Options;
