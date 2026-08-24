import { preview, controls } from "../../.config/storybook/preview.js";
import { AspectRatio } from "../../src/layout/aspect-ratio/index.js";
import demoImage from "../assets/demo-image.svg";

const meta = preview.meta({
  title: "Layout / AspectRatio",
  component: AspectRatio,
});

export default meta;

const ctrl = controls(AspectRatio, {});

const RATIOS = [
  { label: "1 / 1", value: 1 },
  { label: "4 / 3", value: 4 / 3 },
  { label: "16 / 9", value: 16 / 9 },
  { label: "21 / 9", value: 21 / 9 },
];

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({}),
  render(props) {
    return (
      <AspectRatio
        {...props}
        ratio={16 / 9}
        className="w-full max-w-2xl overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3)"
      >
        <img alt="湖と山々の風景" src={demoImage} className="h-full w-full object-cover" />
      </AspectRatio>
    );
  },
});

export const Ratios = meta.story({
  name: "主な比率",
  ...ctrl({}),
  render(props) {
    return (
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6">
        {RATIOS.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-2">
            <span className="text-sm">{label}</span>
            <AspectRatio
              {...props}
              ratio={value}
              className="overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3) bg-(--sui-canvas-2)"
            >
              <div className="flex h-full w-full items-center justify-center">ratio={label}</div>
            </AspectRatio>
          </div>
        ))}
      </div>
    );
  },
});

export const StringRatio = meta.story({
  name: "文字列による比率",
  ...ctrl({}),
  render(props) {
    return (
      <AspectRatio
        {...props}
        ratio="16 / 9"
        className="w-full max-w-2xl overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3)"
      >
        <iframe
          src="https://www.youtube.com/embed/mzJ4vCjSt28"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          allowFullScreen
        />
      </AspectRatio>
    );
  },
});
