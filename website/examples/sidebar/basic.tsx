import { Sidebar } from "@suru-ui/react";
import {
  UsersIcon,
  SettingsIcon,
  CircleHelpIcon,
  FolderKanbanIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import * as React from "react";

type NavItem = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
};

type NavGroupProps = {
  readonly items: readonly NavItem[];
  readonly label: string;
};

const PLATFORM_NAV: readonly NavItem[] = [
  {
    icon: LayoutDashboardIcon,
    label: "ダッシュボード",
    active: true,
  },
  {
    icon: FolderKanbanIcon,
    label: "プロジェクト",
  },
  {
    icon: UsersIcon,
    label: "メンバー",
  },
];

const ACCOUNT_NAV: readonly NavItem[] = [
  {
    icon: SettingsIcon,
    label: "設定",
  },
  {
    icon: CircleHelpIcon,
    label: "ヘルプ",
  },
];

function NavButton({ icon: Icon, label, active }: NavItem): React.ReactNode {
  return (
    <button
      type="button"
      style={{
        gap: "0.5rem",
        font: "inherit",
        color: active === true ? "var(--sui-canvas_text-1)" : "var(--sui-canvas_text-2)",
        width: "100%",
        border: 0,
        cursor: "pointer",
        display: "flex",
        padding: "0.4rem 0.5rem",
        fontSize: "0.875rem",
        textAlign: "left",
        alignItems: "center",
        borderRadius: "0.375rem",
        backgroundColor: active === true ? "var(--sui-canvas-2)" : "transparent",
      }}
    >
      <Icon size={16} aria-hidden="true" />
      {label}
    </button>
  );
}

function NavGroup({ items, label }: NavGroupProps): React.ReactNode {
  return (
    <Sidebar.Group>
      <Sidebar.GroupLabel>{label}</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        {items.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}
      </Sidebar.GroupContent>
    </Sidebar.Group>
  );
}

export default function BasicSidebarExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid var(--sui-border-1)",
        height: "28rem",
        maxWidth: "46rem",
        overflow: "hidden",
        borderRadius: "0.75rem",
        backgroundColor: "var(--sui-canvas-2)",
      }}
    >
      <Sidebar style={{ height: "100%" }}>
        <Sidebar.Root>
          <Sidebar.Header>
            <div
              style={{
                gap: "0.5rem",
                display: "flex",
                padding: "0.25rem",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "var(--sui-blue-solid-canvas_text-normal)",
                  width: "2rem",
                  height: "2rem",
                  display: "grid",
                  fontSize: "0.75rem",
                  flexShrink: 0,
                  fontWeight: 700,
                  placeItems: "center",
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--sui-blue-solid-canvas-normal)",
                }}
              >
                S
              </span>
              <span
                style={{
                  display: "grid",
                  minWidth: 0,
                }}
              >
                <strong style={{ fontSize: "0.875rem" }}>Suru UI</strong>
                <span
                  style={{
                    color: "var(--sui-canvas_text-2)",
                    fontSize: "0.75rem",
                  }}
                >
                  Workspace
                </span>
              </span>
            </div>
          </Sidebar.Header>
          <Sidebar.Content>
            <NavGroup items={PLATFORM_NAV} label="プラットフォーム" />
            <NavGroup items={ACCOUNT_NAV} label="アカウント" />
          </Sidebar.Content>
          <Sidebar.Footer>
            <div
              style={{
                gap: "0.5rem",
                color: "var(--sui-canvas_text-2)",
                display: "flex",
                padding: "0.4rem 0.5rem",
                fontSize: "0.75rem",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "var(--sui-canvas_text-1)",
                  width: "1.75rem",
                  height: "1.75rem",
                  display: "grid",
                  flexShrink: 0,
                  fontWeight: 600,
                  placeItems: "center",
                  borderRadius: "9999px",
                  backgroundColor: "var(--sui-canvas-2)",
                }}
              >
                田
              </span>
              <span>田中 太郎</span>
            </div>
          </Sidebar.Footer>
          <Sidebar.Rail />
        </Sidebar.Root>
        <Sidebar.Inset>
          <header
            style={{
              gap: "0.5rem",
              height: "3rem",
              display: "flex",
              padding: "0 1rem",
              alignItems: "center",
              flexShrink: 0,
              borderBottom: "1px solid var(--sui-border-1)",
            }}
          >
            <Sidebar.Trigger />
            <strong style={{ fontSize: "0.875rem" }}>ダッシュボード</strong>
          </header>
          <main
            style={{
              gap: "1rem",
              display: "grid",
              padding: "1rem",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.125rem",
                }}
              >
                プロジェクトの概要
              </h2>
              <p
                style={{
                  color: "var(--sui-canvas_text-2)",
                  margin: "0.25rem 0 0",
                  fontSize: "0.875rem",
                }}
              >
                サイドバーの境界をドラッグするか、上部のボタンで開閉できます。
              </p>
            </div>
            <div
              style={{
                gap: "0.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              {[
                {
                  label: "進行中",
                  value: "12",
                },
                {
                  label: "レビュー待ち",
                  value: "4",
                },
                {
                  label: "完了",
                  value: "38",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    border: "1px solid var(--sui-border-1)",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "var(--sui-canvas-1)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--sui-canvas_text-2)",
                      fontSize: "0.75rem",
                    }}
                  >
                    {stat.label}
                  </span>
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </Sidebar.Inset>
      </Sidebar>
    </div>
  );
}
