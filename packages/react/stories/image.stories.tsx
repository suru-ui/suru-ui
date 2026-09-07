import { preview, controls } from "../.config/storybook/preview.js";
import demoImage from "../assets/demo-image.svg";
import { AspectRatio } from "../src/aspect-ratio/index.js";
import { Image } from "../src/image/index.js";

const LANDSCAPE_IMAGE = "https://picsum.photos/seed/suru-landscape/640/400";
const PORTRAIT_IMAGE = "https://picsum.photos/seed/suru-portrait/400/640";

const RADII: readonly Image.Radius[] = ["none", "sm", "md", "lg", "full"];
const FITS: readonly Image.Fit[] = ["cover", "contain", "fill", "none", "scale-down"];

const meta = preview.meta({
  title: "Image",
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

export const Orientation = meta.story({
  name: "縦横の組み合わせ",
  ...ctrl({
    alt: "ポートレート写真",
    src: PORTRAIT_IMAGE,
    fit: "cover",
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-[640px] flex-wrap gap-4">
        <div className="flex flex-col items-center gap-1">
          <span>横長枠に縦長画像</span>
          <Image {...props} style={{ width: 200, height: 120 }} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span>縦長枠に横長画像</span>
          <Image
            {...props}
            alt="風景写真"
            src={LANDSCAPE_IMAGE}
            style={{ width: 120, height: 200 }}
          />
        </div>
      </div>
    );
  },
});

export const Circle = meta.story({
  name: "円形",
  ...ctrl({
    alt: "利用者の写真",
    src: demoImage,
    fit: "cover",
    radius: "full",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-end gap-4">
        {[96, 64, 40].map((size) => (
          <div key={size} className="flex flex-col items-center gap-1">
            <span>{size}px</span>
            <Image {...props} style={{ width: size, height: size }} />
          </div>
        ))}
      </div>
    );
  },
});

export const Loading = meta.story({
  name: "遅延読み込み",
  ...ctrl({
    alt: "風景写真",
    src: LANDSCAPE_IMAGE,
    fit: "cover",
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-[640px] flex-col gap-4">
        <Image {...props} style={{ width: "100%", height: 240 }} loading="lazy" decoding="async" />
        <Image {...props} style={{ width: "100%", height: 240 }} loading="lazy" decoding="async" />
      </div>
    );
  },
});

export const AlternativeText = meta.story({
  name: "代替テキスト",
  ...ctrl({
    src: demoImage,
    fit: "cover",
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-[640px] flex-wrap gap-4">
        <div className="flex flex-col items-center gap-1">
          <span>内容を伝える alt</span>
          <Image {...props} alt="夕焼けに染まる山並み" style={{ width: 200, height: 120 }} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span>装飾画像の空 alt</span>
          <Image {...props} alt="" style={{ width: 200, height: 120 }} aria-hidden="true" />
        </div>
      </div>
    );
  },
});

export const WithAspectRatio = meta.story({
  name: "比率固定との組み合わせ",
  ...ctrl({
    alt: "風景写真",
    src: LANDSCAPE_IMAGE,
    fit: "cover",
    radius: "md",
  }),
  render(props) {
    return (
      <div className="w-[480px]">
        <AspectRatio ratio={16 / 9}>
          <Image {...props} style={{ width: "100%", height: "100%" }} />
        </AspectRatio>
      </div>
    );
  },
});

export const Gallery = meta.story({
  name: "ギャラリー",
  ...ctrl({
    fit: "cover",
    radius: "md",
  }),
  render(props) {
    const items = [
      { alt: "ギャラリー画像1", src: "https://picsum.photos/seed/suru-gallery-1/400/300" },
      { alt: "ギャラリー画像2", src: "https://picsum.photos/seed/suru-gallery-2/400/300" },
      { alt: "ギャラリー画像3", src: "https://picsum.photos/seed/suru-gallery-3/400/300" },
      { alt: "ギャラリー画像4", src: "https://picsum.photos/seed/suru-gallery-4/400/300" },
    ] as const;
    return (
      <div className="grid w-[640px] grid-cols-2 gap-4">
        {items.map((item) => (
          <Image
            alt={item.alt}
            {...props}
            key={item.src}
            src={item.src}
            style={{ width: "100%", height: 160 }}
          />
        ))}
      </div>
    );
  },
});

export const Card = meta.story({
  name: "カード内での利用",
  ...ctrl({
    alt: "風景写真",
    src: LANDSCAPE_IMAGE,
    fit: "cover",
    radius: "md",
  }),
  render(props) {
    return (
      <div className="w-[320px] overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3)">
        <Image {...props} style={{ width: "100%", height: 180 }} radius="none" />
        <div className="flex flex-col gap-1 p-4">
          <span className="text-base font-bold">山並みの風景</span>
          <span className="text-sm text-(--sui-canvas_text-2)">
            画像の下に文章や操作を配置する記事カードの例です。
          </span>
        </div>
      </div>
    );
  },
});
