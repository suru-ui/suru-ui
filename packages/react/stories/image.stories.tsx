import { preview, controls } from "../.config/storybook/preview.js";
import demoImage from "../assets/demo-image.svg";
import { Image } from "../src/image/index.js";

const RADII = ["none", "sm", "md", "lg", "full"] as const;
const FITS = ["cover", "contain", "fill", "none", "scale-down"] as const;

const meta = preview.meta({
  title: "Data Display / Image",
  component: Image,
});

export default meta;

const ctrl = controls(Image, {
  alt: {
    control: "text",
  },
  src: {
    control: "text",
  },
  fit: {
    options: FITS,
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
    alt: "風景写真",
    src: demoImage,
    radius: "md",
  }),
  render(props) {
    return (
      <div className="w-[320px]">
        <Image {...props} style={{ width: "100%", height: 180 }} />
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    alt: "風景写真",
    src: demoImage,
    fit: "cover",
  }),
  render(props) {
    return (
      <div className="flex w-[640px] flex-wrap gap-4">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-1">
            <span>{radius}</span>
            <Image {...props} style={{ width: 120, height: 80 }} radius={radius} />
          </div>
        ))}
      </div>
    );
  },
});

export const Fit = meta.story({
  name: "表示方法",
  ...ctrl({
    alt: "風景写真",
    src: demoImage,
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-[640px] flex-wrap gap-4">
        {FITS.map((fit) => (
          <div key={fit} className="flex flex-col items-center gap-1">
            <span>{fit}</span>
            <Image {...props} fit={fit} style={{ width: 120, height: 80 }} />
          </div>
        ))}
      </div>
    );
  },
});
