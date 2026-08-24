# 実装候補

指定ライブラリーのコンポーネント一覧（2026-08-10 時点）と `packages/react/src/index.ts` を比較し、Suru UI にまだ公開されていないコンポーネントを整理したものです。

優先順位は、複数ライブラリーで提供されていること、一般的な利用頻度、既存コンポーネントとの組み合わせやすさ、Base UI を利用してアクセシビリティを担保しやすいことを基準にしています。同じ役割の別名は統合しています。

## 優先度 P0

最初に実装する基盤的なコンポーネントです。

- [x] `Popover`（shadcn/ui, Base UI, HeroUI, Mantine, Chakra UI, MUI, PrimeReact）
- [ ] `Separator` / `Divider`（shadcn/ui, Base UI, Chakra UI, daisyUI, MUI, PrimeReact）
- [x] `Textarea`（shadcn/ui, Mantine, Chakra UI, daisyUI, PrimeReact）
- [x] `Label`（shadcn/ui, Mantine, Chakra UI, daisyUI, PrimeReact）
- [x] `Badge`（shadcn/ui, HeroUI, Mantine, Chakra UI, daisyUI, MUI, PrimeReact）
- [ ] `Card`（shadcn/ui, HeroUI, Mantine, Chakra UI, daisyUI, MUI, PrimeReact）
- [x] `Skeleton`（shadcn/ui, HeroUI, Mantine, Chakra UI, MUI, PrimeReact）
- [ ] `Table`（shadcn/ui, HeroUI, Mantine, Chakra UI, daisyUI, MUI）
- [x] `Pagination`（shadcn/ui, HeroUI, Mantine, Chakra UI, daisyUI, MUI, PrimeReact）
- [x] `Breadcrumb`（shadcn/ui, HeroUI, Mantine, Chakra UI, daisyUI, MUI, PrimeReact）

## 優先度 P1

一般的なアプリケーションで使用頻度が高く、P0 の次に価値が高いコンポーネントです。

- [ ] `Calendar`（shadcn/ui, HeroUI, Mantine, Chakra UI, daisyUI, PrimeReact）
- [ ] `DatePicker`（shadcn/ui, HeroUI, Mantine, Chakra UI, PrimeReact）
- [x] `FileInput` / `FileUpload`（shadcn/ui, HeroUI, Mantine, Chakra UI, daisyUI, PrimeReact）
- [ ] `InputOTP` / `OTPField`（shadcn/ui, Base UI, daisyUI, PrimeReact）
- [ ] `Rating`（HeroUI, Mantine, Chakra UI, daisyUI, MUI, PrimeReact）
- [ ] `TagsInput`（HeroUI, Mantine, Chakra UI, PrimeReact）
- [ ] `NativeSelect`（shadcn/ui, Mantine, Chakra UI）
- [x] `HoverCard`（shadcn/ui, Mantine, Chakra UI）
- [ ] `NavigationMenu`（shadcn/ui, Base UI, Chakra UI, PrimeReact）
- [ ] `Command` / `CommandPalette`（shadcn/ui, Base UI）
- [ ] `Carousel`（shadcn/ui, HeroUI, Chakra UI, daisyUI, PrimeReact）
- [ ] `Spinner` / `Loader`（shadcn/ui, HeroUI, Mantine, Chakra UI, daisyUI）
- [ ] `ProgressCircle` / `CircularProgress`（HeroUI, Chakra UI, daisyUI, PrimeReact）

## 優先度 P2

複合 UI やナビゲーション、データ操作向けのコンポーネントです。

- [x] `Sidebar`（shadcn/ui, HeroUI, PrimeReact）
- [ ] `Stepper` / `Steps`（HeroUI, Mantine, Chakra UI, daisyUI, MUI, PrimeReact）
- [x] `Tree` / `TreeView`（HeroUI, Mantine, Chakra UI, MUI X, PrimeReact）
- [ ] `DataTable`（shadcn/ui, HeroUI, PrimeReact）
- [x] `List`（shadcn/ui, Mantine, Chakra UI, daisyUI, MUI）
- [ ] `TransferList` / `PickList`（MUI, PrimeReact）
- [ ] `ColorPicker`（HeroUI, Mantine, Chakra UI）
- [x] `SegmentedControl`（HeroUI, Mantine, Chakra UI）
- [x] `PasswordInput`（HeroUI, Mantine, Chakra UI）
- [ ] `NumberInput`（HeroUI, Mantine, Chakra UI）
- [ ] `Editable` / `Inplace`（HeroUI, Chakra UI, PrimeReact）
- [ ] `ActionBar` / `FloatingActionButton` / `SpeedDial`（HeroUI, Chakra UI, MUI, PrimeReact）
- [ ] `ToggleTip`（Chakra UI）
- [ ] `Toolbar`（Base UI, PrimeReact）

## 優先度 P3

特定用途、表示専用、レイアウト補助、ライブラリー固有のコンポーネントです。必要なユースケースが発生した時点で実装します。

- [x] `AspectRatio`（shadcn/ui, HeroUI, Mantine, Chakra UI）
- [x] `Image` / `ImageList` / `Gallery`（HeroUI, Mantine, MUI, PrimeReact）
- [ ] `Typography` / `Text` / `Heading`（shadcn/ui, Mantine, Chakra UI, MUI）
- [ ] `Kbd`（shadcn/ui, Mantine, Chakra UI, daisyUI）
- [ ] `Timeline`（HeroUI, Mantine, Chakra UI, daisyUI, MUI, PrimeReact）
- [ ] `DataList`（HeroUI, Mantine, Chakra UI）
- [x] `Stat`（HeroUI, Chakra UI, daisyUI）
- [ ] `Status` / `Indicator`（HeroUI, Mantine, Chakra UI, daisyUI）
- [ ] `EmptyState` / `Empty`（shadcn/ui, HeroUI, Mantine, Chakra UI）
- [ ] `AlertDialog` 相当ではないインライン `Message`（shadcn/ui, PrimeReact）
- [ ] `Navbar` / `AppBar` / `BottomNavigation`（daisyUI, MUI）
- [ ] `AspectRatio`、`Container`、`Stack`、`Grid` などのレイアウトプリミティブ
- [ ] `Portal`、`FocusTrap`、`VisuallyHidden` などのユーティリティ
- [ ] `Mask`、`Countdown`、`Diff`、`Mockup`、`Hero` など daisyUI 固有の表示部品
- [ ] `Compare`、`OrganizationChart`、`TreeTable`、`OrderList` など PrimeReact 固有の高度な部品

## 対象外

以下はすでに Suru UI に実装・公開されています。

- `Accordion`, `Alert`, `AlertDialog`, `Autocomplete`, `Avatar`, `Button`, `ButtonGroup`
- `Checkbox`, `CheckboxGroup`, `Collapsible`, `Combobox`, `ContextMenu`, `Dialog`, `Drawer`
- `Field`, `Fieldset`, `Form`, `Input`, `Menu`, `Menubar`, `Meter`, `NumberField`
- `PasswordField`, `Progress`, `Radio`, `RadioGroup`, `Resizable`, `ScrollArea`, `Select`, `Slider`
- `Switch`, `Tabs`, `Toast`, `Toggle`, `ToggleGroup`, `Tooltip`
- `Chip`, `AvatarGroup`

## 参照先

- [shadcn/ui components](https://ui.shadcn.com/docs/components)
- [Base UI components](https://base-ui.com/react/components)
- [HeroUI components](https://heroui.com/en/docs/react/components)
- [Mantine Core components](https://mantine.dev/core/package/)
- [Chakra UI components](https://chakra-ui.com/docs/components/concepts/overview)
- [daisyUI components](https://daisyui.com/components/)
- [Material UI components](https://mui.com/material-ui/all-components/)
- [PrimeReact components](https://primereact.dev/components)
