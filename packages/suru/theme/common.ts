import base from "./base.ts";
import { $, define, global } from "./utils/index.ts";

export default define({
  ...global(base),
  sui: {
    // https://design.digital.go.jp/foundations/link-text/
    linkText: {
      focusRing: {
        width: ".125rem", // calc (2 / 16 * 1rem)
        offset: ".0625rem", // calc(1 / 16 * 1rem)
      },
      underline: {
        width: {
          main: ".0625rem", // calc(1 / 16 * 1rem)
          hover: ".1875rem", // calc(3 / 16 * 1rem)
          focus: $("sui.linkText.underline.width.main"),
          active: $("sui.linkText.underline.width.hover"),
          visited: $("sui.linkText.underline.width.main"),
        },
        offset: ".125rem", // calc (2 / 16 * 1rem)
      },
    },
    focusRing: {
      width: ".1875rem", // calc(3 / 16 * 1rem)
      offset: ".125rem", // calc (2 / 16 * 1rem)
    },
    overlay: {
      blurRadius: "4px",
    },
    sizing: {
      sm: "1.625rem",
      md: "2.25rem",
      lg: "2.75rem",
      pad: {
        sm: .25,
        md: .375,
        lg: .5,
      },
      gap: {
        sm: .125,
        md: .25,
        lg: .3,
      },
      rad: {
        sm: .25,
        md: .25,
        lg: .3,
      },
    },
    fontFamily: {
      // https://ics.media/entry/200317/
      sans:
        `"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif`,
      mono: `"SF Mono", "Noto Sans Mono", "Courier New", monospace`,
    },
    text: {
      dsp: {
        "64n": {
          4: {
            fontSize: $("typography.dsp-64n-4.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dsp-64n-4.weight"),
            lineHeight: $("typography.dsp-64n-4.lineHeight"),
            letterSpacing: $("typography.dsp-64n-4.letterSpacing"),
          },
        },
        "57n": {
          4: {
            fontSize: $("typography.dsp-57n-4.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dsp-57n-4.weight"),
            lineHeight: $("typography.dsp-57n-4.lineHeight"),
            letterSpacing: $("typography.dsp-57n-4.letterSpacing"),
          },
        },
        "48n": {
          4: {
            fontSize: $("typography.dsp-48n-4.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dsp-48n-4.weight"),
            lineHeight: $("typography.dsp-48n-4.lineHeight"),
            letterSpacing: $("typography.dsp-48n-4.letterSpacing"),
          },
        },
      },
      std: {
        "45b": {
          4: {
            fontSize: $("typography.std-45b-4.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-45b-4.weight"),
            lineHeight: $("typography.std-45b-4.lineHeight"),
            letterSpacing: $("typography.std-45b-4.letterSpacing"),
          },
        },
        "36b": {
          4: {
            fontSize: $("typography.std-36b-4.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-36b-4.weight"),
            lineHeight: $("typography.std-36b-4.lineHeight"),
            letterSpacing: $("typography.std-36b-4.letterSpacing"),
          },
        },
        "32b": {
          5: {
            fontSize: $("typography.std-32b-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-32b-5.weight"),
            lineHeight: $("typography.std-32b-5.lineHeight"),
            letterSpacing: $("typography.std-32b-5.letterSpacing"),
          },
        },
        "28b": {
          5: {
            fontSize: $("typography.std-28b-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-28b-5.weight"),
            lineHeight: $("typography.std-28b-5.lineHeight"),
            letterSpacing: $("typography.std-28b-5.letterSpacing"),
          },
        },
        "24b": {
          5: {
            fontSize: $("typography.std-24b-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-24b-5.weight"),
            lineHeight: $("typography.std-24b-5.lineHeight"),
            letterSpacing: $("typography.std-24b-5.letterSpacing"),
          },
        },
        "22b": {
          5: {
            fontSize: $("typography.std-22b-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-22b-5.weight"),
            lineHeight: $("typography.std-22b-5.lineHeight"),
            letterSpacing: $("typography.std-22b-5.letterSpacing"),
          },
        },
        "20b": {
          5: {
            fontSize: $("typography.std-20b-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-20b-5.weight"),
            lineHeight: $("typography.std-20b-5.lineHeight"),
            letterSpacing: $("typography.std-20b-5.letterSpacing"),
          },
        },
        "18b": {
          6: {
            fontSize: $("typography.std-18b-6.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-18b-6.weight"),
            lineHeight: $("typography.std-18b-6.lineHeight"),
            letterSpacing: $("typography.std-18b-6.letterSpacing"),
          },
        },
        "17b": {
          7: {
            fontSize: $("typography.std-17b-7.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-17b-7.weight"),
            lineHeight: $("typography.std-17b-7.lineHeight"),
            letterSpacing: $("typography.std-17b-7.letterSpacing"),
          },
        },
        "16b": {
          7: {
            fontSize: $("typography.std-16b-7.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-16b-7.weight"),
            lineHeight: $("typography.std-16b-7.lineHeight"),
            letterSpacing: $("typography.std-16b-7.letterSpacing"),
          },
        },
        "32m": {
          5: {
            fontSize: $("typography.std-32m-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-32m-5.weight"),
            lineHeight: $("typography.std-32m-5.lineHeight"),
            letterSpacing: $("typography.std-32m-5.letterSpacing"),
          },
        },
        "28m": {
          5: {
            fontSize: $("typography.std-28m-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-28m-5.weight"),
            lineHeight: $("typography.std-28m-5.lineHeight"),
            letterSpacing: $("typography.std-28m-5.letterSpacing"),
          },
        },
        "24m": {
          5: {
            fontSize: $("typography.std-24m-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-24m-5.weight"),
            lineHeight: $("typography.std-24m-5.lineHeight"),
            letterSpacing: $("typography.std-24m-5.letterSpacing"),
          },
        },
        "20m": {
          5: {
            fontSize: $("typography.std-20m-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-20m-5.weight"),
            lineHeight: $("typography.std-20m-5.lineHeight"),
            letterSpacing: $("typography.std-20m-5.letterSpacing"),
          },
        },
        "17m": {
          7: {
            fontSize: $("typography.std-17m-7.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-17m-7.weight"),
            lineHeight: $("typography.std-17m-7.lineHeight"),
            letterSpacing: $("typography.std-17m-7.letterSpacing"),
          },
        },
        "16m": {
          7: {
            fontSize: $("typography.std-16m-7.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-16m-7.weight"),
            lineHeight: $("typography.std-16m-7.lineHeight"),
            letterSpacing: $("typography.std-16m-7.letterSpacing"),
          },
        },
        "45n": {
          4: {
            fontSize: $("typography.std-45n-4.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-45n-4.weight"),
            lineHeight: $("typography.std-45n-4.lineHeight"),
            letterSpacing: $("typography.std-45n-4.letterSpacing"),
          },
        },
        "36n": {
          4: {
            fontSize: $("typography.std-36n-4.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-36n-4.weight"),
            lineHeight: $("typography.std-36n-4.lineHeight"),
            letterSpacing: $("typography.std-36n-4.letterSpacing"),
          },
        },
        "32n": {
          5: {
            fontSize: $("typography.std-32n-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-32n-5.weight"),
            lineHeight: $("typography.std-32n-5.lineHeight"),
            letterSpacing: $("typography.std-32n-5.letterSpacing"),
          },
        },
        "28n": {
          5: {
            fontSize: $("typography.std-28n-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-28n-5.weight"),
            lineHeight: $("typography.std-28n-5.lineHeight"),
            letterSpacing: $("typography.std-28n-5.letterSpacing"),
          },
        },
        "26n": {
          5: {
            fontSize: $("typography.std-26n-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-26n-5.weight"),
            lineHeight: $("typography.std-26n-5.lineHeight"),
            letterSpacing: $("typography.std-26n-5.letterSpacing"),
          },
        },
        "24n": {
          5: {
            fontSize: $("typography.std-24n-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-24n-5.weight"),
            lineHeight: $("typography.std-24n-5.lineHeight"),
            letterSpacing: $("typography.std-24n-5.letterSpacing"),
          },
        },
        "22n": {
          5: {
            fontSize: $("typography.std-22n-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-22n-5.weight"),
            lineHeight: $("typography.std-22n-5.lineHeight"),
            letterSpacing: $("typography.std-22n-5.letterSpacing"),
          },
        },
        "20n": {
          5: {
            fontSize: $("typography.std-20n-5.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-20n-5.weight"),
            lineHeight: $("typography.std-20n-5.lineHeight"),
            letterSpacing: $("typography.std-20n-5.letterSpacing"),
          },
        },
        "18n": {
          6: {
            fontSize: $("typography.std-18n-6.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-18n-6.weight"),
            lineHeight: $("typography.std-18n-6.lineHeight"),
            letterSpacing: $("typography.std-18n-6.letterSpacing"),
          },
        },
        "17n": {
          7: {
            fontSize: $("typography.std-17n-7.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-17n-7.weight"),
            lineHeight: $("typography.std-17n-7.lineHeight"),
            letterSpacing: $("typography.std-17n-7.letterSpacing"),
          },
        },
        "16n": {
          7: {
            fontSize: $("typography.std-16n-7.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.std-16n-7.weight"),
            lineHeight: $("typography.std-16n-7.lineHeight"),
            letterSpacing: $("typography.std-16n-7.letterSpacing"),
          },
        },
      },
      dns: {
        "17b": {
          3: {
            fontSize: $("typography.dns-17b-3.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-17b-3.weight"),
            lineHeight: $("typography.dns-17b-3.lineHeight"),
            letterSpacing: $("typography.dns-17b-3.letterSpacing"),
          },
          2: {
            fontSize: $("typography.dns-17b-2.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-17b-2.weight"),
            lineHeight: $("typography.dns-17b-2.lineHeight"),
            letterSpacing: $("typography.dns-17b-2.letterSpacing"),
          },
        },
        "17n": {
          3: {
            fontSize: $("typography.dns-17n-3.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-17n-3.weight"),
            lineHeight: $("typography.dns-17n-3.lineHeight"),
            letterSpacing: $("typography.dns-17n-3.letterSpacing"),
          },
          2: {
            fontSize: $("typography.dns-17n-2.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-17n-2.weight"),
            lineHeight: $("typography.dns-17n-2.lineHeight"),
            letterSpacing: $("typography.dns-17n-2.letterSpacing"),
          },
        },
        "16b": {
          3: {
            fontSize: $("typography.dns-16b-3.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-16b-3.weight"),
            lineHeight: $("typography.dns-16b-3.lineHeight"),
            letterSpacing: $("typography.dns-16b-3.letterSpacing"),
          },
          2: {
            fontSize: $("typography.dns-16b-2.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-16b-2.weight"),
            lineHeight: $("typography.dns-16b-2.lineHeight"),
            letterSpacing: $("typography.dns-16b-2.letterSpacing"),
          },
        },
        "16n": {
          3: {
            fontSize: $("typography.dns-16n-3.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-16n-3.weight"),
            lineHeight: $("typography.dns-16n-3.lineHeight"),
            letterSpacing: $("typography.dns-16n-3.letterSpacing"),
          },
          2: {
            fontSize: $("typography.dns-16n-2.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-16n-2.weight"),
            lineHeight: $("typography.dns-16n-2.lineHeight"),
            letterSpacing: $("typography.dns-16n-2.letterSpacing"),
          },
        },
        "14b": {
          3: {
            fontSize: $("typography.dns-14b-3.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-14b-3.weight"),
            lineHeight: $("typography.dns-14b-3.lineHeight"),
            letterSpacing: $("typography.dns-14b-3.letterSpacing"),
          },
          2: {
            fontSize: $("typography.dns-14b-2.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-14b-2.weight"),
            lineHeight: $("typography.dns-14b-2.lineHeight"),
            letterSpacing: $("typography.dns-14b-2.letterSpacing"),
          },
        },
        "14n": {
          3: {
            fontSize: $("typography.dns-14n-3.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-14n-3.weight"),
            lineHeight: $("typography.dns-14n-3.lineHeight"),
            letterSpacing: $("typography.dns-14n-3.letterSpacing"),
          },
          2: {
            fontSize: $("typography.dns-14n-2.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.dns-14n-2.weight"),
            lineHeight: $("typography.dns-14n-2.lineHeight"),
            letterSpacing: $("typography.dns-14n-2.letterSpacing"),
          },
        },
      },
      oln: {
        "17b": {
          1: {
            fontSize: $("typography.oln-17b-1.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.oln-17b-1.weight"),
            lineHeight: $("typography.oln-17b-1.lineHeight"),
            letterSpacing: $("typography.oln-17b-1.letterSpacing"),
          },
        },
        "17m": {
          1: {
            fontSize: $("typography.oln-17m-1.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.oln-17m-1.weight"),
            lineHeight: $("typography.oln-17m-1.lineHeight"),
            letterSpacing: $("typography.oln-17m-1.letterSpacing"),
          },
        },
        "17n": {
          1: {
            fontSize: $("typography.oln-17n-1.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.oln-17n-1.weight"),
            lineHeight: $("typography.oln-17n-1.lineHeight"),
            letterSpacing: $("typography.oln-17n-1.letterSpacing"),
          },
        },
        "16b": {
          1: {
            fontSize: $("typography.oln-16b-1.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.oln-16b-1.weight"),
            lineHeight: $("typography.oln-16b-1.lineHeight"),
            letterSpacing: $("typography.oln-16b-1.letterSpacing"),
          },
        },
        "16m": {
          1: {
            fontSize: $("typography.oln-16m-1.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.oln-16m-1.weight"),
            lineHeight: $("typography.oln-16m-1.lineHeight"),
            letterSpacing: $("typography.oln-16m-1.letterSpacing"),
          },
        },
        "16n": {
          1: {
            fontSize: $("typography.oln-16n-1.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.oln-16n-1.weight"),
            lineHeight: $("typography.oln-16n-1.lineHeight"),
            letterSpacing: $("typography.oln-16n-1.letterSpacing"),
          },
        },
        "14b": {
          1: {
            fontSize: $("typography.oln-14b-1.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.oln-14b-1.weight"),
            lineHeight: $("typography.oln-14b-1.lineHeight"),
            letterSpacing: $("typography.oln-14b-1.letterSpacing"),
          },
        },
        "14m": {
          1: {
            fontSize: $("typography.oln-14m-1.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.oln-14m-1.weight"),
            lineHeight: $("typography.oln-14m-1.lineHeight"),
            letterSpacing: $("typography.oln-14m-1.letterSpacing"),
          },
        },
        "14n": {
          1: {
            fontSize: $("typography.oln-14n-1.size"),
            fontFamily: $("sui.fontFamily.sans"),
            fontWeight: $("typography.oln-14n-1.weight"),
            lineHeight: $("typography.oln-14n-1.lineHeight"),
            letterSpacing: $("typography.oln-14n-1.letterSpacing"),
          },
        },
      },
      mono: {
        "17b": {
          5: {
            fontSize: $("typography.mono-17b-5.size"),
            fontFamily: $("sui.fontFamily.mono"),
            fontWeight: $("typography.mono-17b-5.weight"),
            lineHeight: $("typography.mono-17b-5.lineHeight"),
            letterSpacing: $("typography.mono-17b-5.letterSpacing"),
          },
        },
        "17n": {
          5: {
            fontSize: $("typography.mono-17n-5.size"),
            fontFamily: $("sui.fontFamily.mono"),
            fontWeight: $("typography.mono-17n-5.weight"),
            lineHeight: $("typography.mono-17n-5.lineHeight"),
            letterSpacing: $("typography.mono-17n-5.letterSpacing"),
          },
        },
        "16b": {
          5: {
            fontSize: $("typography.mono-16b-5.size"),
            fontFamily: $("sui.fontFamily.mono"),
            fontWeight: $("typography.mono-16b-5.weight"),
            lineHeight: $("typography.mono-16b-5.lineHeight"),
            letterSpacing: $("typography.mono-16b-5.letterSpacing"),
          },
        },
        "16n": {
          5: {
            fontSize: $("typography.mono-16n-5.size"),
            fontFamily: $("sui.fontFamily.mono"),
            fontWeight: $("typography.mono-16n-5.weight"),
            lineHeight: $("typography.mono-16n-5.lineHeight"),
            letterSpacing: $("typography.mono-16n-5.letterSpacing"),
          },
        },
        "14b": {
          5: {
            fontSize: $("typography.mono-14b-5.size"),
            fontFamily: $("sui.fontFamily.mono"),
            fontWeight: $("typography.mono-14b-5.weight"),
            lineHeight: $("typography.mono-14b-5.lineHeight"),
            letterSpacing: $("typography.mono-14b-5.letterSpacing"),
          },
        },
        "14n": {
          5: {
            fontSize: $("typography.mono-14n-5.size"),
            fontFamily: $("sui.fontFamily.mono"),
            fontWeight: $("typography.mono-14n-5.weight"),
            lineHeight: $("typography.mono-14n-5.lineHeight"),
            letterSpacing: $("typography.mono-14n-5.letterSpacing"),
          },
        },
      },
    },
  },
});
