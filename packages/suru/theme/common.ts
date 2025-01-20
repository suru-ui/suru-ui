import { $, define, global } from "./_utils.ts";
import base from "./base.ts";

export default define({
  ...global(base),
  sui: {
    linkText: {
      focus: {
        ring: {
          width: ".1875rem", // calc(3 / 16 * 1rem)
          offset: ".125rem", // calc (2 / 16 * 1rem)
        },
      },
      underline: {
        main: ".0625rem", // calc(1 / 16 * 1rem)
        hover: ".1875rem", // calc(3 / 16 * 1rem)
        offset: ".125rem", // calc (2 / 16 * 1rem)
      },
    },
    focusRing: {
      width: "3px",
      offset: "2px",
    },
    overlay: {
      blur: "10px",
    },
    sizing: {
      sm: "1.625rem",
      md: "2.25rem",
      lg: "2.625rem",
    },
    font: {
      sans: "\"Noto Serif JP\" serif",
      mono: "\"Noto Sans Mono\" monospace",
    },
    text: {
      dsp: {
        "64n": {
          4: {
            font: $("sui.font.sans"),
            size: $("typography.dsp-64n-4.size"),
            weight: $("typography.dsp-64n-4.weight"),
            leading: $("typography.dsp-64n-4.leading"),
            tracking: $("typography.dsp-64n-4.tracking"),
          },
        },
        "57n": {
          4: {
            font: $("sui.font.sans"),
            size: $("typography.dsp-57n-4.size"),
            weight: $("typography.dsp-57n-4.weight"),
            leading: $("typography.dsp-57n-4.leading"),
            tracking: $("typography.dsp-57n-4.tracking"),
          },
        },
        "48n": {
          4: {
            font: $("sui.font.sans"),
            size: $("typography.dsp-48n-4.size"),
            weight: $("typography.dsp-48n-4.weight"),
            leading: $("typography.dsp-48n-4.leading"),
            tracking: $("typography.dsp-48n-4.tracking"),
          },
        },
      },
      std: {
        "45b": {
          4: {
            font: $("sui.font.sans"),
            size: $("typography.std-45b-4.size"),
            weight: $("typography.std-45b-4.weight"),
            leading: $("typography.std-45b-4.leading"),
            tracking: $("typography.std-45b-4.tracking"),
          },
        },
        "36b": {
          4: {
            font: $("sui.font.sans"),
            size: $("typography.std-36b-4.size"),
            weight: $("typography.std-36b-4.weight"),
            leading: $("typography.std-36b-4.leading"),
            tracking: $("typography.std-36b-4.tracking"),
          },
        },
        "32b": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-32b-5.size"),
            weight: $("typography.std-32b-5.weight"),
            leading: $("typography.std-32b-5.leading"),
            tracking: $("typography.std-32b-5.tracking"),
          },
        },
        "28b": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-28b-5.size"),
            weight: $("typography.std-28b-5.weight"),
            leading: $("typography.std-28b-5.leading"),
            tracking: $("typography.std-28b-5.tracking"),
          },
        },
        "24b": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-24b-5.size"),
            weight: $("typography.std-24b-5.weight"),
            leading: $("typography.std-24b-5.leading"),
            tracking: $("typography.std-24b-5.tracking"),
          },
        },
        "22b": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-22b-5.size"),
            weight: $("typography.std-22b-5.weight"),
            leading: $("typography.std-22b-5.leading"),
            tracking: $("typography.std-22b-5.tracking"),
          },
        },
        "20b": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-20b-5.size"),
            weight: $("typography.std-20b-5.weight"),
            leading: $("typography.std-20b-5.leading"),
            tracking: $("typography.std-20b-5.tracking"),
          },
        },
        "18b": {
          6: {
            font: $("sui.font.sans"),
            size: $("typography.std-18b-6.size"),
            weight: $("typography.std-18b-6.weight"),
            leading: $("typography.std-18b-6.leading"),
            tracking: $("typography.std-18b-6.tracking"),
          },
        },
        "17b": {
          7: {
            font: $("sui.font.sans"),
            size: $("typography.std-17b-7.size"),
            weight: $("typography.std-17b-7.weight"),
            leading: $("typography.std-17b-7.leading"),
            tracking: $("typography.std-17b-7.tracking"),
          },
        },
        "16b": {
          7: {
            font: $("sui.font.sans"),
            size: $("typography.std-16b-7.size"),
            weight: $("typography.std-16b-7.weight"),
            leading: $("typography.std-16b-7.leading"),
            tracking: $("typography.std-16b-7.tracking"),
          },
        },
        "32m": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-32m-5.size"),
            weight: $("typography.std-32m-5.weight"),
            leading: $("typography.std-32m-5.leading"),
            tracking: $("typography.std-32m-5.tracking"),
          },
        },
        "28m": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-28m-5.size"),
            weight: $("typography.std-28m-5.weight"),
            leading: $("typography.std-28m-5.leading"),
            tracking: $("typography.std-28m-5.tracking"),
          },
        },
        "24m": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-24m-5.size"),
            weight: $("typography.std-24m-5.weight"),
            leading: $("typography.std-24m-5.leading"),
            tracking: $("typography.std-24m-5.tracking"),
          },
        },
        "20m": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-20m-5.size"),
            weight: $("typography.std-20m-5.weight"),
            leading: $("typography.std-20m-5.leading"),
            tracking: $("typography.std-20m-5.tracking"),
          },
        },
        "17m": {
          7: {
            font: $("sui.font.sans"),
            size: $("typography.std-17m-7.size"),
            weight: $("typography.std-17m-7.weight"),
            leading: $("typography.std-17m-7.leading"),
            tracking: $("typography.std-17m-7.tracking"),
          },
        },
        "16m": {
          7: {
            font: $("sui.font.sans"),
            size: $("typography.std-16m-7.size"),
            weight: $("typography.std-16m-7.weight"),
            leading: $("typography.std-16m-7.leading"),
            tracking: $("typography.std-16m-7.tracking"),
          },
        },
        "45n": {
          4: {
            font: $("sui.font.sans"),
            size: $("typography.std-45n-4.size"),
            weight: $("typography.std-45n-4.weight"),
            leading: $("typography.std-45n-4.leading"),
            tracking: $("typography.std-45n-4.tracking"),
          },
        },
        "36n": {
          4: {
            font: $("sui.font.sans"),
            size: $("typography.std-36n-4.size"),
            weight: $("typography.std-36n-4.weight"),
            leading: $("typography.std-36n-4.leading"),
            tracking: $("typography.std-36n-4.tracking"),
          },
        },
        "32n": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-32n-5.size"),
            weight: $("typography.std-32n-5.weight"),
            leading: $("typography.std-32n-5.leading"),
            tracking: $("typography.std-32n-5.tracking"),
          },
        },
        "28n": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-28n-5.size"),
            weight: $("typography.std-28n-5.weight"),
            leading: $("typography.std-28n-5.leading"),
            tracking: $("typography.std-28n-5.tracking"),
          },
        },
        "26n": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-26n-5.size"),
            weight: $("typography.std-26n-5.weight"),
            leading: $("typography.std-26n-5.leading"),
            tracking: $("typography.std-26n-5.tracking"),
          },
        },
        "24n": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-24n-5.size"),
            weight: $("typography.std-24n-5.weight"),
            leading: $("typography.std-24n-5.leading"),
            tracking: $("typography.std-24n-5.tracking"),
          },
        },
        "22n": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-22n-5.size"),
            weight: $("typography.std-22n-5.weight"),
            leading: $("typography.std-22n-5.leading"),
            tracking: $("typography.std-22n-5.tracking"),
          },
        },
        "20n": {
          5: {
            font: $("sui.font.sans"),
            size: $("typography.std-20n-5.size"),
            weight: $("typography.std-20n-5.weight"),
            leading: $("typography.std-20n-5.leading"),
            tracking: $("typography.std-20n-5.tracking"),
          },
        },
        "18n": {
          6: {
            font: $("sui.font.sans"),
            size: $("typography.std-18n-6.size"),
            weight: $("typography.std-18n-6.weight"),
            leading: $("typography.std-18n-6.leading"),
            tracking: $("typography.std-18n-6.tracking"),
          },
        },
        "17n": {
          7: {
            font: $("sui.font.sans"),
            size: $("typography.std-17n-7.size"),
            weight: $("typography.std-17n-7.weight"),
            leading: $("typography.std-17n-7.leading"),
            tracking: $("typography.std-17n-7.tracking"),
          },
        },
        "16n": {
          7: {
            font: $("sui.font.sans"),
            size: $("typography.std-16n-7.size"),
            weight: $("typography.std-16n-7.weight"),
            leading: $("typography.std-16n-7.leading"),
            tracking: $("typography.std-16n-7.tracking"),
          },
        },
      },
      dns: {
        "17b": {
          3: {
            font: $("sui.font.sans"),
            size: $("typography.dns-17b-3.size"),
            weight: $("typography.dns-17b-3.weight"),
            leading: $("typography.dns-17b-3.leading"),
            tracking: $("typography.dns-17b-3.tracking"),
          },
          2: {
            font: $("sui.font.sans"),
            size: $("typography.dns-17b-2.size"),
            weight: $("typography.dns-17b-2.weight"),
            leading: $("typography.dns-17b-2.leading"),
            tracking: $("typography.dns-17b-2.tracking"),
          },
        },
        "17n": {
          3: {
            font: $("sui.font.sans"),
            size: $("typography.dns-17n-3.size"),
            weight: $("typography.dns-17n-3.weight"),
            leading: $("typography.dns-17n-3.leading"),
            tracking: $("typography.dns-17n-3.tracking"),
          },
          2: {
            font: $("sui.font.sans"),
            size: $("typography.dns-17n-2.size"),
            weight: $("typography.dns-17n-2.weight"),
            leading: $("typography.dns-17n-2.leading"),
            tracking: $("typography.dns-17n-2.tracking"),
          },
        },
        "16b": {
          3: {
            font: $("sui.font.sans"),
            size: $("typography.dns-16b-3.size"),
            weight: $("typography.dns-16b-3.weight"),
            leading: $("typography.dns-16b-3.leading"),
            tracking: $("typography.dns-16b-3.tracking"),
          },
          2: {
            font: $("sui.font.sans"),
            size: $("typography.dns-16b-2.size"),
            weight: $("typography.dns-16b-2.weight"),
            leading: $("typography.dns-16b-2.leading"),
            tracking: $("typography.dns-16b-2.tracking"),
          },
        },
        "16n": {
          3: {
            font: $("sui.font.sans"),
            size: $("typography.dns-16n-3.size"),
            weight: $("typography.dns-16n-3.weight"),
            leading: $("typography.dns-16n-3.leading"),
            tracking: $("typography.dns-16n-3.tracking"),
          },
          2: {
            font: $("sui.font.sans"),
            size: $("typography.dns-16n-2.size"),
            weight: $("typography.dns-16n-2.weight"),
            leading: $("typography.dns-16n-2.leading"),
            tracking: $("typography.dns-16n-2.tracking"),
          },
        },
        "14b": {
          3: {
            font: $("sui.font.sans"),
            size: $("typography.dns-14b-3.size"),
            weight: $("typography.dns-14b-3.weight"),
            leading: $("typography.dns-14b-3.leading"),
            tracking: $("typography.dns-14b-3.tracking"),
          },
          2: {
            font: $("sui.font.sans"),
            size: $("typography.dns-14b-2.size"),
            weight: $("typography.dns-14b-2.weight"),
            leading: $("typography.dns-14b-2.leading"),
            tracking: $("typography.dns-14b-2.tracking"),
          },
        },
        "14n": {
          3: {
            font: $("sui.font.sans"),
            size: $("typography.dns-14n-3.size"),
            weight: $("typography.dns-14n-3.weight"),
            leading: $("typography.dns-14n-3.leading"),
            tracking: $("typography.dns-14n-3.tracking"),
          },
          2: {
            font: $("sui.font.sans"),
            size: $("typography.dns-14n-2.size"),
            weight: $("typography.dns-14n-2.weight"),
            leading: $("typography.dns-14n-2.leading"),
            tracking: $("typography.dns-14n-2.tracking"),
          },
        },
      },
      oln: {
        "17b": {
          1: {
            font: $("sui.font.sans"),
            size: $("typography.oln-17b-1.size"),
            weight: $("typography.oln-17b-1.weight"),
            leading: $("typography.oln-17b-1.leading"),
            tracking: $("typography.oln-17b-1.tracking"),
          },
        },
        "17m": {
          1: {
            font: $("sui.font.sans"),
            size: $("typography.oln-17m-1.size"),
            weight: $("typography.oln-17m-1.weight"),
            leading: $("typography.oln-17m-1.leading"),
            tracking: $("typography.oln-17m-1.tracking"),
          },
        },
        "17n": {
          1: {
            font: $("sui.font.sans"),
            size: $("typography.oln-17n-1.size"),
            weight: $("typography.oln-17n-1.weight"),
            leading: $("typography.oln-17n-1.leading"),
            tracking: $("typography.oln-17n-1.tracking"),
          },
        },
        "16b": {
          1: {
            font: $("sui.font.sans"),
            size: $("typography.oln-16b-1.size"),
            weight: $("typography.oln-16b-1.weight"),
            leading: $("typography.oln-16b-1.leading"),
            tracking: $("typography.oln-16b-1.tracking"),
          },
        },
        "16m": {
          1: {
            font: $("sui.font.sans"),
            size: $("typography.oln-16m-1.size"),
            weight: $("typography.oln-16m-1.weight"),
            leading: $("typography.oln-16m-1.leading"),
            tracking: $("typography.oln-16m-1.tracking"),
          },
        },
        "16n": {
          1: {
            font: $("sui.font.sans"),
            size: $("typography.oln-16n-1.size"),
            weight: $("typography.oln-16n-1.weight"),
            leading: $("typography.oln-16n-1.leading"),
            tracking: $("typography.oln-16n-1.tracking"),
          },
        },
        "14b": {
          1: {
            font: $("sui.font.sans"),
            size: $("typography.oln-14b-1.size"),
            weight: $("typography.oln-14b-1.weight"),
            leading: $("typography.oln-14b-1.leading"),
            tracking: $("typography.oln-14b-1.tracking"),
          },
        },
        "14m": {
          1: {
            font: $("sui.font.sans"),
            size: $("typography.oln-14m-1.size"),
            weight: $("typography.oln-14m-1.weight"),
            leading: $("typography.oln-14m-1.leading"),
            tracking: $("typography.oln-14m-1.tracking"),
          },
        },
        "14n": {
          1: {
            font: $("sui.font.sans"),
            size: $("typography.oln-14n-1.size"),
            weight: $("typography.oln-14n-1.weight"),
            leading: $("typography.oln-14n-1.leading"),
            tracking: $("typography.oln-14n-1.tracking"),
          },
        },
      },
      mono: {
        "17b": {
          5: {
            font: $("sui.font.mono"),
            size: $("typography.mono-17b-5.size"),
            weight: $("typography.mono-17b-5.weight"),
            leading: $("typography.mono-17b-5.leading"),
            tracking: $("typography.mono-17b-5.tracking"),
          },
        },
        "17n": {
          5: {
            font: $("sui.font.mono"),
            size: $("typography.mono-17n-5.size"),
            weight: $("typography.mono-17n-5.weight"),
            leading: $("typography.mono-17n-5.leading"),
            tracking: $("typography.mono-17n-5.tracking"),
          },
        },
        "16b": {
          5: {
            font: $("sui.font.mono"),
            size: $("typography.mono-16b-5.size"),
            weight: $("typography.mono-16b-5.weight"),
            leading: $("typography.mono-16b-5.leading"),
            tracking: $("typography.mono-16b-5.tracking"),
          },
        },
        "16n": {
          5: {
            font: $("sui.font.mono"),
            size: $("typography.mono-16n-5.size"),
            weight: $("typography.mono-16n-5.weight"),
            leading: $("typography.mono-16n-5.leading"),
            tracking: $("typography.mono-16n-5.tracking"),
          },
        },
        "14b": {
          5: {
            font: $("sui.font.mono"),
            size: $("typography.mono-14b-5.size"),
            weight: $("typography.mono-14b-5.weight"),
            leading: $("typography.mono-14b-5.leading"),
            tracking: $("typography.mono-14b-5.tracking"),
          },
        },
        "14n": {
          5: {
            font: $("sui.font.mono"),
            size: $("typography.mono-14n-5.size"),
            weight: $("typography.mono-14n-5.weight"),
            leading: $("typography.mono-14n-5.leading"),
            tracking: $("typography.mono-14n-5.tracking"),
          },
        },
      },
    },
  },
});
