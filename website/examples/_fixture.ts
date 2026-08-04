if (typeof document !== "undefined") {
  // Blume は Tailwind CSS が前提に作られているため、通常の CSS と組み合わせることはできません。
  // コンポーネントが通常の CSS によってスタイリングされている場合、そのスタイルを Tailwind CSS で上書きできません。
  // このパッチを当てることで、Suru UI のコンポーネントのスタイリングよりも、Tailwind CSS の utilities を優先させます。

  const style = document.createElement("style");
  style.innerHTML = `
@layer properties;
@layer theme, base, components, sui, utilities;
`;
  document.head.prepend(style);
}
