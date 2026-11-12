import * as theme from "@suru-ui/theme";

import { preview, controls } from "../../.config/storybook/preview.js";
import imgUrl from "./_assets/kagoshima_yamanoyu.jpg?url";
import { AspectRatio } from "./index.js";

const RADII: readonly AspectRatio.Radius[] = ["none", ...theme.SIZES];
const RATIOS = [
  {
    label: "1:1",
    value: "1 / 1",
  },
  {
    label: "4:3",
    value: "4 / 3",
  },
  {
    label: "16:9",
    value: "16 / 9",
  },
  {
    label: "21:9",
    value: "21 / 9",
  },
] as const;

const meta = preview.meta({
  title: "AspectRatio",
  component: AspectRatio,
});

export default meta;

const ctrl = controls(AspectRatio, {
  ratio: {
    control: "select",
    options: ["1 / 1", "4 / 3", "16 / 9", "21 / 9", "9 / 16", "16 / 9"],
  },
  radius: {
    control: "select",
    options: RADII,
  },
});

export const Basic = meta.story({
  name: "基本",
  ...ctrl({
    ratio: "16 / 9",
    radius: "none",
  }),
  render(props) {
    return (
      <AspectRatio {...props} className="w-xl p-3">
        <img alt="風景写真" src={imgUrl} className="h-full w-full object-cover" />
      </AspectRatio>
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
      <div className="grid w-sm grid-cols-1 gap-6">
        {RATIOS.map(({ label, value }) => (
          <AspectRatio {...props} key={label} ratio={value} className="rounded-xl border">
            <div className="flex h-full w-full items-center justify-center">{label}</div>
          </AspectRatio>
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    ratio: "16 / 9",
    radius: "none",
  }),
  render(props) {
    return (
      <div className="flex w-sm flex-wrap gap-6">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2">
            <span>{radius}</span>
            <AspectRatio {...props} radius={radius} className="w-sm">
              <img alt="風景写真" src={imgUrl} className="h-full w-full object-cover" />
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
    ratio: "9 / 16",
    radius: "none",
  }),
  render(props) {
    return (
      <AspectRatio {...props} className="w-xs">
        <img alt="風景写真" src={imgUrl} className="h-full w-full object-cover" />
      </AspectRatio>
    );
  },
});

export const Video = meta.story({
  name: "動画",
  ...ctrl({
    ratio: "16 / 9",
    radius: "none",
  }),
  render(props) {
    return (
      <AspectRatio {...props} className="w-xl">
        <iframe
          src="https://www.youtube.com/embed/WMCodrKjpeM"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          sandbox="allow-scripts allow-presentation"
          allowFullScreen
        />
      </AspectRatio>
    );
  },
});

export const StreetMap = meta.story({
  name: "地図",
  ...ctrl({
    ratio: "16 / 9",
    radius: "none",
  }),
  render(props) {
    return (
      <AspectRatio {...props} className="w-xl">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=139.7000%2C35.6700%2C139.7800%2C35.7000&layer=mapnik&marker=35.6850%2C139.7400"
          title="東京周辺の地図"
          sandbox="allow-scripts"
        />
      </AspectRatio>
    );
  },
});
