import * as React from "react";

export type DotsProps = Omit<React.ComponentProps<"svg">, "children" | "viewBox" | "xmlns">;

export default function SuiLoaderDots(props: DotsProps): React.ReactElement {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <circle r="3" cx="4" cy="12" className="SuiLoaderDot SuiLoaderDot-1" />
      <circle r="3" cx="12" cy="12" className="SuiLoaderDot SuiLoaderDot-2" />
      <circle r="3" cx="20" cy="12" className="SuiLoaderDot SuiLoaderDot-3" />
    </svg>
  );
}
