import { ContextMenu } from "@suru-ui/react";
import { LinkIcon, MailIcon, Share2Icon, Trash2Icon, DownloadIcon } from "lucide-react";
import * as React from "react";

const areaStyle: React.CSSProperties = {
  color: "#525252",
  width: "20rem",
  border: "1px dashed #a3a3a3",
  height: "10rem",
  display: "flex",
  fontSize: "0.875rem",
  alignItems: "center",
  background: "#f5f5f5",
  borderRadius: "0.75rem",
  justifyContent: "center",
};

const labelStyle: React.CSSProperties = {
  gap: "0.5rem",
  display: "flex",
  alignItems: "center",
};

export default function ContextMenuItemsExample(): React.ReactNode {
  return (
    <ContextMenu
      items={[
        {
          items: [
            {
              label: (
                <span style={labelStyle}>
                  <LinkIcon size={16} aria-hidden="true" />
                  リンクをコピー
                </span>
              ),
            },
            {
              label: (
                <span style={labelStyle}>
                  <DownloadIcon size={16} aria-hidden="true" />
                  ダウンロード
                </span>
              ),
            },
          ],
        },
        {
          items: [
            {
              type: "submenu",
              items: [
                {
                  label: (
                    <span style={labelStyle}>
                      <MailIcon size={16} aria-hidden="true" />
                      メールで送る
                    </span>
                  ),
                },
                {
                  label: (
                    <span style={labelStyle}>
                      <Share2Icon size={16} aria-hidden="true" />
                      共有リンクを作成
                    </span>
                  ),
                },
              ],
              label: (
                <span style={labelStyle}>
                  <Share2Icon size={16} aria-hidden="true" />
                  共有
                </span>
              ),
            },
          ],
        },
        {
          items: [
            {
              color: "red",
              label: (
                <span style={labelStyle}>
                  <Trash2Icon size={16} aria-hidden="true" />
                  完全に削除
                </span>
              ),
            },
          ],
        },
      ]}
      trigger={<div style={areaStyle}>右クリックでメニューを開く</div>}
    />
  );
}
