import { Chip } from "@suru-ui/react";
import { XIcon, TagIcon, CheckIcon } from "lucide-react";
import * as React from "react";

const INITIAL_TAGS = ["デザイン", "フロントエンド", "アクセシビリティ"];

export default function BasicChipExample(): React.ReactNode {
  const [tags, setTags] = React.useState(INITIAL_TAGS);

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
    >
      <div
        style={{
          gap: "0.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Chip color="blue">
          <TagIcon size={14} aria-hidden="true" />
          新着
        </Chip>
        <Chip color="green" variant="solid">
          <CheckIcon size={14} aria-hidden="true" />
          完了
        </Chip>
        <Chip color="orange" outlined>
          保留
        </Chip>
      </div>
      <div
        style={{
          gap: "0.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {tags.map((tag) => (
          <Chip
            key={tag}
            color="blue"
            render={<button type="button" />}
            variant="naked"
            onClick={() => {
              setTags((current) => current.filter((item) => item !== tag));
            }}
            aria-label={`${tag} を削除`}
          >
            {tag}
            <XIcon size={14} aria-hidden="true" />
          </Chip>
        ))}
      </div>
    </div>
  );
}
