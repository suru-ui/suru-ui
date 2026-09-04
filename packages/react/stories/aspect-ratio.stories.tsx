import { preview, controls } from "../.config/storybook/preview.js";
import { AspectRatio } from "../src/aspect-ratio/index.js";

const LANDSCAPE_IMAGE = "https://picsum.photos/seed/suru-landscape/1280/720";
const PORTRAIT_IMAGE = "https://picsum.photos/seed/suru-portrait/720/1280";

const RATIOS = [
  { label: "1 / 1", value: 1 },
  { label: "4 / 3", value: 4 / 3 },
  { label: "16 / 9", value: 16 / 9 },
  { label: "21 / 9", value: 21 / 9 },
] as const;

const RADII = ["none", "sm", "md", "lg"] as const;

const meta = preview.meta({
  title: "AspectRatio",
  component: AspectRatio,
});

export default meta;

const ctrl = controls(AspectRatio, {
  ratio: {
    options: [1, 4 / 3, 16 / 9, 21 / 9, 9 / 16, "16 / 9"],
    control: "select",
  },
  radius: {
    options: RADII,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    ratio: 16 / 9,
    radius: "none",
  }),
  render(props) {
    return (
      <div className="w-[640px]">
        <AspectRatio {...props} className="w-full">
          <img alt="風景写真" src={LANDSCAPE_IMAGE} className="h-full w-full object-cover" />
        </AspectRatio>
      </div>
    );
  },
});

export const Ratios = meta.story({
  name: "比率指定",
  ...ctrl({
    radius: "none",
  }),
  render(props) {
    return (
      <div className="grid w-[360px] grid-cols-1 gap-6">
        {RATIOS.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-2">
            <span className="text-sm">ratio = {label}</span>
            <AspectRatio
              {...props}
              ratio={value}
              className="overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3) bg-(--sui-canvas-2)"
            >
              <div className="flex h-full w-full items-center justify-center">{label}</div>
            </AspectRatio>
          </div>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    ratio: 16 / 9,
    radius: "none",
  }),
  render(props) {
    return (
      <div className="flex w-[640px] flex-wrap gap-4">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-2">
            <span className="text-sm">{radius}</span>
            <AspectRatio {...props} radius={radius} className="w-[280px]">
              <img alt="風景写真" src={LANDSCAPE_IMAGE} className="h-full w-full object-cover" />
            </AspectRatio>
          </div>
        ))}
      </div>
    );
  },
});

export const Portrait = meta.story({
  name: "縦長",
  ...ctrl({
    ratio: 9 / 16,
    radius: "none",
  }),
  render(props) {
    return (
      <div className="w-[320px]">
        <AspectRatio {...props} className="w-full">
          <img alt="風景写真" src={PORTRAIT_IMAGE} className="h-full w-full object-cover" />
        </AspectRatio>
      </div>
    );
  },
});

export const Video = meta.story({
  name: "動画",
  ...ctrl({
    ratio: 16 / 9,
    radius: "none",
  }),
  render(props) {
    return (
      <div className="w-[640px]">
        <AspectRatio {...props} className="w-full">
          <iframe
            src="https://www.youtube.com/embed/mzJ4vCjSt28"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="YouTube video player"
            allowFullScreen
          />
        </AspectRatio>
      </div>
    );
  },
});

export const StreatMap = meta.story({
  name: "地図",
  ...ctrl({
    ratio: 16 / 9,
    radius: "none",
  }),
  render(props) {
    return (
      <div className="w-[640px]">
        <AspectRatio {...props} className="w-full">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=139.7000%2C35.6700%2C139.7800%2C35.7000&layer=mapnik&marker=35.6850%2C139.7400"
            title="東京周辺の地図"
          />
        </AspectRatio>
      </div>
    );
  },
});
