import { defineConfig } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

export default defineConfig({
  oxc: { target: "es2020" },
  test: {
    exclude: ["src/**/*.server.test.{ts,tsx}", "tests/**/*.server.test.{ts,tsx}"],
    include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.{ts,tsx}"],

    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [
        { browser: "chromium" },
        // 未対応：
        // { browser: "firefox" },
        // { browser: "webkit" },
      ],
    },
    coverage: {
      include: ["src/**/*.ts", "src/**/*.tsx"],

      provider: "istanbul",
      reporter: ["text", "json-summary", "html"],
      thresholds: {
        lines: 85,
        branches: 85,
        functions: 85,
        statements: 85,
      },
      reportsDirectory: "./coverage/client",
    },
    setupFiles: [".config/_reset-pointer.ts"],
  },
  // ブラウザーテスト中に依存関係が再最適化されてテストが再読み込みされるのを防ぎます。
  optimizeDeps: {
    include: [
      "@base-ui/react",
      "@base-ui/react/accordion",
      "@base-ui/react/alert-dialog",
      "@base-ui/react/autocomplete",
      "@base-ui/react/avatar",
      "@base-ui/react/button",
      "@base-ui/react/checkbox",
      "@base-ui/react/checkbox-group",
      "@base-ui/react/collapsible",
      "@base-ui/react/combobox",
      "@base-ui/react/context-menu",
      "@base-ui/react/dialog",
      "@base-ui/react/drawer",
      "@base-ui/react/field",
      "@base-ui/react/fieldset",
      "@base-ui/react/form",
      "@base-ui/react/input",
      "@base-ui/react/menu",
      "@base-ui/react/menubar",
      "@base-ui/react/merge-props",
      "@base-ui/react/meter",
      "@base-ui/react/number-field",
      "@base-ui/react/popover",
      "@base-ui/react/preview-card",
      "@base-ui/react/progress",
      "@base-ui/react/radio",
      "@base-ui/react/radio-group",
      "@base-ui/react/scroll-area",
      "@base-ui/react/select",
      "@base-ui/react/slider",
      "@base-ui/react/switch",
      "@base-ui/react/tabs",
      "@base-ui/react/toast",
      "@base-ui/react/toggle",
      "@base-ui/react/tooltip",
    ],
  },
});
