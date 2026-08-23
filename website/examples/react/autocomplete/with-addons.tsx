import "../../_fixture";
import type * as React from "react";
import { Autocomplete } from "@suru-ui/react/autocomplete";

function SearchIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

export default function WithAddons() {
  return (
    <Autocomplete
      startAddons={[<SearchIcon key="search" />]}
      items={["東京", "大阪", "京都", "福岡"]}
      placeholder="都市を検索"
    />
  );
}
