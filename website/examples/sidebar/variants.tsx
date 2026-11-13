import { type SidebarVariant, Sidebar } from "@suru-ui/react";
import { SettingsIcon, LayoutDashboardIcon } from "lucide-react";
import * as React from "react";

const VARIANTS: readonly SidebarVariant[] = ["sidebar", "floating", "inset"];

type SidebarRootStyle = React.CSSProperties & {
  "--sui_sidebar-width": string;
};

const ROOT_STYLE: SidebarRootStyle = { "--sui_sidebar-width": "11rem" };

function MiniSidebar({ variant }: { variant: SidebarVariant }): React.ReactNode {
  return (
    <div
      style={{
        border: "1px solid var(--sui-border-1)",
        height: "16rem",
        overflow: "hidden",
        borderRadius: "0.75rem",
        backgroundColor: "var(--sui-canvas-2)",
      }}
    >
      <Sidebar style={{ height: "100%" }}>
        <Sidebar.Root style={ROOT_STYLE} variant={variant}>
          <Sidebar.Header>
            <strong
              style={{
                padding: "0 0.25rem",
                fontSize: "0.875rem",
              }}
            >
              Suru UI
            </strong>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>メニュー</Sidebar.GroupLabel>
              <Sidebar.GroupContent>
                <span
                  style={{
                    gap: "0.4rem",
                    display: "flex",
                    padding: "0.35rem 0.5rem",
                    fontSize: "0.75rem",
                    alignItems: "center",
                    borderRadius: "0.375rem",
                    backgroundColor: "var(--sui-canvas-2)",
                  }}
                >
                  <LayoutDashboardIcon size={14} aria-hidden="true" />
                  概要
                </span>
                <span
                  style={{
                    gap: "0.4rem",
                    color: "var(--sui-canvas_text-2)",
                    display: "flex",
                    padding: "0.35rem 0.5rem",
                    fontSize: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <SettingsIcon size={14} aria-hidden="true" />
                  設定
                </span>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Rail />
        </Sidebar.Root>
        <Sidebar.Inset>
          <header
            style={{
              gap: "0.4rem",
              height: "2.5rem",
              display: "flex",
              padding: "0 0.75rem",
              alignItems: "center",
              borderBottom: "1px solid var(--sui-border-1)",
            }}
          >
            <Sidebar.Trigger />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              概要
            </span>
          </header>
          <div
            style={{
              color: "var(--sui-canvas_text-2)",
              padding: "0.75rem",
              fontSize: "0.75rem",
            }}
          >
            メインコンテンツ
          </div>
        </Sidebar.Inset>
      </Sidebar>
    </div>
  );
}

export default function SidebarVariantsExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        width: "100%",
        display: "grid",
        maxWidth: "46rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
      }}
    >
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          style={{
            gap: "0.5rem",
            display: "grid",
          }}
        >
          <span
            style={{
              color: "var(--sui-canvas_text-2)",
              fontSize: "0.75rem",
            }}
          >
            variant: {variant}
          </span>
          <MiniSidebar variant={variant} />
        </div>
      ))}
    </div>
  );
}
