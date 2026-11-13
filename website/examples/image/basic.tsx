import { Image } from "@suru-ui/react";
import * as React from "react";

const GRADIENT_IMAGE = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#38bdf8"/>
        <stop offset="0.55" stop-color="#6366f1"/>
        <stop offset="1" stop-color="#a855f7"/>
      </linearGradient>
    </defs>
    <rect width="640" height="400" fill="url(#g)"/>
    <circle cx="500" cy="110" r="64" fill="#ffffff" fill-opacity="0.35"/>
    <path d="M0 330 L150 190 L280 310 L420 210 L640 350 L640 400 L0 400 Z" fill="#1e1b4b" fill-opacity="0.35"/>
  </svg>`,
)}`;

export default function BasicImageExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
      }}
    >
      <Image
        alt="青から紫へのグラデーション"
        fit="cover"
        src={GRADIENT_IMAGE}
        style={{
          width: 320,
          height: 200,
        }}
        radius="md"
      />
      <Image
        alt=""
        fit="cover"
        src={GRADIENT_IMAGE}
        style={{
          width: 96,
          height: 96,
        }}
        radius="full"
        aria-hidden="true"
      />
    </div>
  );
}
