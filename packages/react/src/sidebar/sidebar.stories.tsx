import {
  PlusIcon,
  UsersIcon,
  SettingsIcon,
  PanelLeftIcon,
  CircleHelpIcon,
  ShieldCheckIcon,
  FolderKanbanIcon,
  ChevronsUpDownIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Avatar } from "../avatar/index.js";
import { Breadcrumb } from "../breadcrumb/index.js";
import { Button } from "../button/index.js";
import cn from "../cn.js";
import { Menu } from "../menu/index.js";
import { Sidebar } from "./index.js";
import type { SidebarSide, SidebarProps, SidebarVariant, SidebarCollapsible } from "./index.js";

const meta = preview.meta({
  title: "Sidebar",
  component: Sidebar,
});

export default meta;

const ctrl = controls(Sidebar, {
  defaultOpen: {
    control: "boolean",
  },
});

type NavItem = {
  readonly href: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly label: string;
  readonly active?: boolean;
};

const PLATFORM_NAV: readonly NavItem[] = [
  { href: "#dashboard", icon: LayoutDashboardIcon, label: "ダッシュボード", active: true },
  { href: "#projects", icon: FolderKanbanIcon, label: "プロジェクト" },
  { href: "#members", icon: UsersIcon, label: "メンバー" },
];

const ACCOUNT_NAV: readonly NavItem[] = [
  { href: "#settings", icon: SettingsIcon, label: "設定" },
  { href: "#security", icon: ShieldCheckIcon, label: "セキュリティー" },
  { href: "#help", icon: CircleHelpIcon, label: "ヘルプ" },
];

/**
 * アイコン折りたたみ中かどうかを返します。
 */
function useIconOnly(): boolean {
  const ctx = Sidebar.useContext();

  return ctx.collapsible === "icon" && ctx.state === "collapsed";
}

/**
 * サイドバーの項目です。アイコン折りたたみ中はラベルを読み上げ用に残します。
 */
function NavLink({ href, icon: Icon, label, active }: NavItem) {
  const iconOnly = useIconOnly();

  return (
    <a
      href={href}
      title={iconOnly ? label : undefined}
      className={cn(
        "flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors",
        iconOnly && "justify-center px-0",
        active
          ? "bg-canvas-2 font-medium text-canvas_text-1"
          : "text-canvas_text-2 hover:bg-canvas-2 hover:text-canvas_text-1",
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="size-4 shrink-0" />
      <span className={iconOnly ? "sr-only" : "truncate"}>{label}</span>
    </a>
  );
}

/**
 * 関連する項目をまとめたグループです。
 */
function NavGroup({
  items,
  label,
}: {
  readonly items: readonly NavItem[];
  readonly label: string;
}) {
  const iconOnly = useIconOnly();

  return (
    <Sidebar.Group>
      {!iconOnly && <Sidebar.GroupLabel>{label}</Sidebar.GroupLabel>}
      <Sidebar.GroupContent>
        {items.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </Sidebar.GroupContent>
    </Sidebar.Group>
  );
}

/**
 * ワークスペースを切り替えるメニューです。
 */
function WorkspaceSwitcher() {
  const iconOnly = useIconOnly();

  return (
    <Menu
      size="sm"
      items={[{ label: "Suru UI" }, { label: "Acme Inc." }, { label: "個人ワークスペース" }]}
      trigger={
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 rounded-md border-0 bg-transparent p-2 text-left transition-colors hover:bg-canvas-2",
            iconOnly && "justify-center p-0",
          )}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-blue-solid-canvas_text-normal text-xs font-bold text-blue-solid-canvas-normal">
            S
          </span>
          {!iconOnly && (
            <>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold">Suru UI</span>
                <span className="truncate text-xs text-canvas_text-2">Enterprise</span>
              </span>
              <ChevronsUpDownIcon className="ms-auto size-4 shrink-0 text-canvas_text-3" />
            </>
          )}
        </button>
      }
    />
  );
}

/**
 * ログイン中のユーザーを表示するメニューです。
 */
function UserMenu() {
  const iconOnly = useIconOnly();

  return (
    <Menu
      size="sm"
      items={[{ label: "アカウント" }, { label: "請求" }, { color: "red", label: "ログアウト" }]}
      trigger={
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 rounded-md border-0 bg-transparent p-2 text-left transition-colors hover:bg-canvas-2",
            iconOnly && "justify-center p-0",
          )}
        >
          <Avatar alt="田中 太郎" size="sm" color="blue" radius="full">
            田
          </Avatar>
          {!iconOnly && (
            <>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium">田中 太郎</span>
                <span className="truncate text-xs text-canvas_text-2">tanaka@example.com</span>
              </span>
              <ChevronsUpDownIcon className="ms-auto size-4 shrink-0 text-canvas_text-3" />
            </>
          )}
        </button>
      }
    />
  );
}

/**
 * メインコンテンツの上部に表示するツールバーです。
 */
function InsetHeader() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border-1 px-4">
      <Sidebar.Trigger />
      <span className="h-4 w-px bg-border-1" />
      <Breadcrumb items={[{ href: "#", label: "ホーム" }, { label: "ダッシュボード" }]} />
    </header>
  );
}

const STATS = [
  { label: "進行中", value: "12" },
  { label: "レビュー待ち", value: "4" },
  { label: "完了", value: "38" },
] as const;

const ACTIVITIES = [
  { time: "5分前", actor: "鈴木 花子", action: "「デザインシステム」を更新しました" },
  { time: "1時間前", actor: "佐藤 次郎", action: "「モバイルアプリ」にコメントしました" },
  { time: "昨日", actor: "田中 太郎", action: "「Web サイト」を完了にしました" },
] as const;

/**
 * サイドバーの横に表示するダッシュボードの内容です。
 */
function DashboardContent() {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">ダッシュボード</h2>
            <p className="text-sm text-canvas_text-2">
              プロジェクトの進捗と最近のアクティビティを確認できます。
            </p>
          </div>
          <Button size="sm" color="blue">
            <PlusIcon />
            新規プロジェクト
          </Button>
        </div>

        <div
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))" }}
          className="grid gap-3"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 rounded-lg border border-border-1 bg-canvas-1 p-4"
            >
              <p className="text-xs text-canvas_text-2">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border-1 bg-canvas-1">
          <div className="border-b border-border-1 p-4">
            <h3 className="text-sm font-semibold">最近のアクティビティ</h3>
          </div>
          <ul className="m-0 flex list-none flex-col p-0">
            {ACTIVITIES.map((activity) => (
              <li
                key={`${activity.actor}-${activity.time}`}
                className="flex items-center gap-3 border-b border-border-1 p-4 last:border-b-0"
              >
                <Avatar alt={activity.actor} size="sm" color="grey" radius="full">
                  {activity.actor.slice(0, 1)}
                </Avatar>
                <p className="min-w-0 flex-1 text-sm">
                  <span className="font-medium">{activity.actor}</span>
                  <span className="text-canvas_text-2"> さんが{activity.action}</span>
                </p>
                <span className="shrink-0 text-xs text-canvas_text-3">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type AppSidebarProps = Pick<SidebarProps, "defaultOpen" | "onOpenChange" | "open"> & {
  readonly className?: string | undefined;
  readonly collapsible?: SidebarCollapsible | undefined;
  readonly header?: React.ReactNode | undefined;
  readonly side?: SidebarSide | undefined;
  readonly variant?: SidebarVariant | undefined;
};

/**
 * 実際のアプリケーションに近い構成のサイドバーです。
 */
function AppSidebar({
  open,
  side = "left",
  header,
  variant = "sidebar",
  className,
  collapsible = "offcanvas",
  defaultOpen = true,
  onOpenChange,
}: AppSidebarProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border border-border-1 bg-canvas-2",
        className,
      )}
    >
      <Sidebar open={open} className="h-full" defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <Sidebar.Root side={side} variant={variant} collapsible={collapsible}>
          <Sidebar.Header>
            <WorkspaceSwitcher />
          </Sidebar.Header>
          <Sidebar.Content>
            <NavGroup items={PLATFORM_NAV} label="プラットフォーム" />
            <NavGroup items={ACCOUNT_NAV} label="アカウント" />
          </Sidebar.Content>
          <Sidebar.Footer>
            <UserMenu />
          </Sidebar.Footer>
          <Sidebar.Rail />
        </Sidebar.Root>
        <Sidebar.Inset>
          {header ?? <InsetHeader />}
          <DashboardContent />
        </Sidebar.Inset>
      </Sidebar>
    </div>
  );
}

function StoryShell({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-[64rem] max-w-[calc(100vw-2rem)] flex-col gap-3">{children}</div>
  );
}

function SidebarLabel({ children }: { readonly children: React.ReactNode }) {
  return <p className="text-sm font-medium text-canvas_text-2">{children}</p>;
}

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    defaultOpen: true,
  }),
  render(props) {
    return (
      <StoryShell>
        <AppSidebar className="h-[36rem]" defaultOpen={props.defaultOpen} />
      </StoryShell>
    );
  },
});

export const Sides = meta.story({
  name: "辺",
  ...ctrl({
    defaultOpen: true,
  }),
  render(props) {
    return (
      <StoryShell>
        <div className="grid gap-4 lg:grid-cols-2">
          {(["left", "right"] as readonly SidebarSide[]).map((side) => (
            <div key={side} className="flex flex-col gap-2">
              <SidebarLabel>{`辺: ${side}`}</SidebarLabel>
              <AppSidebar side={side} className="h-[28rem]" defaultOpen={props.defaultOpen} />
            </div>
          ))}
        </div>
      </StoryShell>
    );
  },
});

export const Variants = meta.story({
  name: "バリアント",
  ...ctrl({
    defaultOpen: true,
  }),
  render(props) {
    return (
      <StoryShell>
        <div className="grid gap-4 lg:grid-cols-2">
          {(["sidebar", "floating", "inset"] as readonly SidebarVariant[]).map((variant) => (
            <div key={variant} className="flex flex-col gap-2">
              <SidebarLabel>{`バリアント: ${variant}`}</SidebarLabel>
              <AppSidebar variant={variant} className="h-[28rem]" defaultOpen={props.defaultOpen} />
            </div>
          ))}
        </div>
      </StoryShell>
    );
  },
});

export const Collapsibles = meta.story({
  name: "折りたたみ",
  render() {
    return (
      <StoryShell>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <SidebarLabel>offcanvas（展開）</SidebarLabel>
            <AppSidebar className="h-[28rem]" collapsible="offcanvas" defaultOpen />
          </div>
          <div className="flex flex-col gap-2">
            <SidebarLabel>icon（折りたたみ）</SidebarLabel>
            <AppSidebar className="h-[28rem]" collapsible="icon" defaultOpen={false} />
          </div>
          <div className="flex flex-col gap-2">
            <SidebarLabel>none（折りたたみ不可）</SidebarLabel>
            <AppSidebar className="h-[28rem]" collapsible="none" defaultOpen />
          </div>
        </div>
      </StoryShell>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  render() {
    const [open, setOpen] = React.useState(true);

    return (
      <StoryShell>
        <AppSidebar open={open} className="h-[32rem]" onOpenChange={setOpen} />
        <p className="text-sm text-canvas_text-2">{`開閉状態: ${open ? "展開" : "折りたたみ"}`}</p>
      </StoryShell>
    );
  },
});

export const Closed = meta.story({
  name: "閉じた状態",
  render() {
    return (
      <StoryShell>
        <AppSidebar className="h-[28rem]" defaultOpen={false} />
      </StoryShell>
    );
  },
});

/**
 * `useSidebar` 相当のフックを使って独自の開閉ボタンを描画します。
 */
function CustomTriggerButton() {
  const { open, toggle } = Sidebar.useContext();

  return (
    <Button size="sm" onClick={toggle} variant="liquid">
      <PanelLeftIcon />
      {open ? "サイドバーを閉じる" : "サイドバーを開く"}
    </Button>
  );
}

export const CustomTrigger = meta.story({
  name: "独自トリガー",
  render() {
    return (
      <StoryShell>
        <AppSidebar
          header={
            <header className="flex h-12 shrink-0 items-center border-b border-border-1 px-4">
              <CustomTriggerButton />
            </header>
          }
          className="h-[32rem]"
        />
      </StoryShell>
    );
  },
});
