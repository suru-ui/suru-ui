import { Combobox } from "@suru-ui/react";
import * as React from "react";

type Member = {
  readonly name: string;
  readonly email: string;
};

const MEMBERS: readonly Member[] = [
  {
    name: "山田 太郎",
    email: "yamada.taro@example.com",
  },
  {
    name: "鈴木 花子",
    email: "suzuki.hanako@example.com",
  },
  {
    name: "佐藤 一郎",
    email: "sato.ichiro@example.com",
  },
  {
    name: "高橋 二郎",
    email: "takahashi.jiro@example.com",
  },
  {
    name: "田中 三郎",
    email: "tanaka.saburo@example.com",
  },
];

function filterMembers(query: string): readonly Member[] {
  const keyword = query.trim().toLowerCase();

  if (keyword === "") {
    return MEMBERS;
  }

  return MEMBERS.filter(
    (member) =>
      member.name.toLowerCase().includes(keyword) || member.email.toLowerCase().includes(keyword),
  );
}

function renderMemberLabel(member: Member): React.ReactNode {
  return (
    <span
      style={{
        gap: "0.125rem",
        display: "flex",
        textAlign: "left",
        flexDirection: "column",
      }}
    >
      <span>{member.name}</span>
      <span
        style={{
          opacity: 0.7,
          fontSize: "0.75rem",
        }}
      >
        {member.email}
      </span>
    </span>
  );
}

export default function ComboboxAsyncSearchExample(): React.ReactNode {
  const [query, setQuery] = React.useState("");
  const members = filterMembers(query);

  return (
    <div style={{ width: "20rem" }}>
      <Combobox<Member>
        empty="該当する担当者がいません。"
        items={members}
        filter={null}
        status={query.trim() === "" ? null : `${members.length} 件の候補`}
        placeholder="名前またはメールアドレス"
        itemLabelRenderer={renderMemberLabel}
        itemToStringLabel={(member) => member.name}
        onValueChange={() => {
          setQuery("");
        }}
        onInputValueChange={(value) => {
          setQuery(value);
        }}
      />
    </div>
  );
}
