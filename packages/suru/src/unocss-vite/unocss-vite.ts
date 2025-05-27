import type { Preset, StaticRule } from "unocss";
import { $, COLOR_LIST, COLOR_SCALE_LIST, COLOR_VARIANT_LIST } from "../theme";

export type UnoCssVitePresetSuiSuruOptions = Readonly<{
  /**
   * @default ""
   * @example "suru-"
   */
  prefix?: string | undefined;
}>;

export default function unoCssVitePresetSuiSuru(
  options: UnoCssVitePresetSuiSuruOptions | undefined = {},
): Preset {
  const { prefix = "" } = options;
  const toSizeVar = (
    v: string | undefined,
    unit: string | undefined,
    mode: "default" | "pad" | "gap" | "rad" = "default",
  ): string => {
    if (unit === "xs" || unit === "sm" || unit === "md" || unit === "lg" || unit === "xl") {
    } else {
      throw new Error(`Invalid sizing unit: ${unit}`);
    }

    const sizing = unit === "xs" ? "sm" : unit === "xl" ? "lg" : unit;
    const extra = unit === "xs" || unit === "xl" ? 1 : 0;
    const value = parseInt(v || "1", 10);
    const scale = (Number.isInteger(value + extra) && value > 0 ? value : 1) + extra;
    const vars = mode === "default"
      ? $.sui.sizing
      : $.sui.sizing[mode];

    return scale <= 1
      ? vars[sizing].toString()
      : `calc(${vars[sizing]} * ${scale})`;
  };

  return {
    name: "@suru-ui/suru",
    theme: $,
    prefix,
    rules: [
      /*********************************************************************************************
       *
       * Layout
       *
       ********************************************************************************************/

      // Top / Right / Bottom / Left

      [/^(top|right|bottom|left)-([0-9]+)?(xs|sm|md|lg|xl)$/, m => ({
        [m[1]!]: toSizeVar(m[2], m[3], "pad"),
      })],

      /*********************************************************************************************
       *
       * Flexbox & Grid
       *
       ********************************************************************************************/

      // Gap

      [/^gap(-[xy])?-([0-9]+)?(xs|sm|md|lg|xl)$/, m => ({
        [
          {
            "": "gap",
            "-y": "row-gap",
            "-x": "column-gap",
          }[m[1] || ""]!
        ]: toSizeVar(m[2], m[3], "gap"),
      })],

      /*********************************************************************************************
       *
       * Spacing
       *
       ********************************************************************************************/

      // padding / margin

      [/^([pm])([xytrbl])?-([0-9]+)?(xs|sm|md|lg|xl)$/, m => {
        const prop = m[1] === "p" ? "padding" : "margin";
        const dirs = {
          "": [""],
          "x": ["-left", "-right"],
          "y": ["-top", "-bottom"],
          "t": ["-top"],
          "r": ["-right"],
          "b": ["-bottom"],
          "l": ["-left"],
        }[m[2] || ""]!;
        const sizing = toSizeVar(m[3], m[4], "pad");

        return Object.fromEntries(dirs.map(dir => [prop + dir, sizing]));
      }],

      // space between

      [/^space-([xy])-([0-9]+)?(xs|sm|md|lg|xl)(-reverse)?$/, m => {
        const dir = m[1] === "x" ? "-left" : "-top";
        const preset = m[3] as "xs" | "sm" | "md" | "lg" | "xl";
        const sizing = preset === "xs" ? "sm" : preset === "xl" ? "lg" : preset;
        const extra = preset === "xs" || preset === "xl" ? 1 : 0;
        const value = parseInt(m[2] || "1", 10);
        const scale = (Number.isInteger(value + extra) ? value : 1) + extra;
        const reverse = m[4] !== undefined;

        return {
          ["margin" + dir]: !reverse
            ? scale <= 1
              ? $.sui.sizing.pad[sizing].toString()
              : `calc(${$.sui.sizing.pad[sizing]} * ${scale})`
            : scale <= 1
            ? `calc(${$.sui.sizing.pad[sizing]} * -1)`
            : `calc(${$.sui.sizing.pad[sizing]} * ${scale} * -1)`,
        };
      }],

      /*********************************************************************************************
       *
       * Sizing
       *
       ********************************************************************************************/

      // width

      [/^w-([0-9]+)?(xs|sm|md|lg|xl)$/, m => ({ width: toSizeVar(m[1], m[2]) })],

      // min-width

      [/^min-w-([0-9]+)?(xs|sm|md|lg|xl)$/, m => ({ "min-width": toSizeVar(m[1], m[2]) })],

      // max-width

      [/^max-w-([0-9]+)?(xs|sm|md|lg|xl)$/, m => ({ "max-width": toSizeVar(m[1], m[2]) })],

      // height

      [/^h-([0-9]+)?(xs|sm|md|lg|xl)$/, m => ({ height: toSizeVar(m[1], m[2]) })],

      // min-height

      [/^min-h-([0-9]+)?(xs|sm|md|lg|xl)$/, m => ({ "min-height": toSizeVar(m[1], m[2]) })],

      // max-height

      [/^max-h-([0-9]+)?(xs|sm|md|lg|xl)$/, m => ({ "max-height": toSizeVar(m[1], m[2]) })],

      // size

      [/^size-([0-9]+)?(xs|sm|md|lg|xl)$/, m => {
        const sizeVar = toSizeVar(m[1], m[2]);

        return {
          width: sizeVar,
          height: sizeVar,
        };
      }],

      /*********************************************************************************************
       *
       * Typography
       *
       ********************************************************************************************/

      // font-family

      ["font-sans", { "font-family": $.sui.fontfamily.sans.toString() }],
      ["font-mono", { "font-family": $.sui.fontfamily.mono.toString() }],

      // color

      ["text-main", { color: $.sui.canvastext.main.toString() }],
      ["text-subtle", { color: $.sui.canvastext.subtle.toString() }],
      ["text-disabled", { color: $.sui.canvastext.disabled.toString() }],
      ...COLOR_LIST.flatMap(color => [
        ...COLOR_SCALE_LIST.flatMap((scale): StaticRule[] => [
          [`text-${color}-${scale}`, { color: $.sui[color][scale].toString() }],
          [`text-${color}-${scale}-alpha`, { color: $.sui[color].alpha[scale].toString() }],
        ]),
        ...COLOR_VARIANT_LIST.flatMap((variant): StaticRule[] => [
          [`text-${color}-${variant}`, { color: $.sui[color][variant].canvastext.toString() }],
        ]),
      ]),

      // components

      ["text-dsp-64n-4", {
        "font-family": $.sui.text.dsp["64n"][4].fontfamily.toString(),
        "font-size": $.sui.text.dsp["64n"][4].fontsize.toString(),
        "font-weight": $.sui.text.dsp["64n"][4].fontweight.toString(),
        "letter-spacing": $.sui.text.dsp["64n"][4].letterspacing.toString(),
        "line-height": $.sui.text.dsp["64n"][4].lineheight.toString(),
      }],
      ["text-dsp-57n-4", {
        "font-family": $.sui.text.dsp["57n"][4].fontfamily.toString(),
        "font-size": $.sui.text.dsp["57n"][4].fontsize.toString(),
        "font-weight": $.sui.text.dsp["57n"][4].fontweight.toString(),
        "letter-spacing": $.sui.text.dsp["57n"][4].letterspacing.toString(),
        "line-height": $.sui.text.dsp["57n"][4].lineheight.toString(),
      }],
      ["text-dsp-48n-4", {
        "font-family": $.sui.text.dsp["48n"][4].fontfamily.toString(),
        "font-size": $.sui.text.dsp["48n"][4].fontsize.toString(),
        "font-weight": $.sui.text.dsp["48n"][4].fontweight.toString(),
        "letter-spacing": $.sui.text.dsp["48n"][4].letterspacing.toString(),
        "line-height": $.sui.text.dsp["48n"][4].lineheight.toString(),
      }],
      ["text-std-45b-4", {
        "font-family": $.sui.text.std["45b"][4].fontfamily.toString(),
        "font-size": $.sui.text.std["45b"][4].fontsize.toString(),
        "font-weight": $.sui.text.std["45b"][4].fontweight.toString(),
        "letter-spacing": $.sui.text.std["45b"][4].letterspacing.toString(),
        "line-height": $.sui.text.std["45b"][4].lineheight.toString(),
      }],
      ["text-std-36b-4", {
        "font-family": $.sui.text.std["36b"][4].fontfamily.toString(),
        "font-size": $.sui.text.std["36b"][4].fontsize.toString(),
        "font-weight": $.sui.text.std["36b"][4].fontweight.toString(),
        "letter-spacing": $.sui.text.std["36b"][4].letterspacing.toString(),
        "line-height": $.sui.text.std["36b"][4].lineheight.toString(),
      }],
      ["text-std-32b-5", {
        "font-family": $.sui.text.std["32b"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["32b"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["32b"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["32b"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["32b"][5].lineheight.toString(),
      }],
      ["text-std-28b-5", {
        "font-family": $.sui.text.std["28b"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["28b"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["28b"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["28b"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["28b"][5].lineheight.toString(),
      }],
      ["text-std-24b-5", {
        "font-family": $.sui.text.std["24b"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["24b"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["24b"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["24b"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["24b"][5].lineheight.toString(),
      }],
      ["text-std-22b-5", {
        "font-family": $.sui.text.std["22b"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["22b"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["22b"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["22b"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["22b"][5].lineheight.toString(),
      }],
      ["text-std-20b-5", {
        "font-family": $.sui.text.std["20b"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["20b"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["20b"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["20b"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["20b"][5].lineheight.toString(),
      }],
      ["text-std-18b-6", {
        "font-family": $.sui.text.std["18b"][6].fontfamily.toString(),
        "font-size": $.sui.text.std["18b"][6].fontsize.toString(),
        "font-weight": $.sui.text.std["18b"][6].fontweight.toString(),
        "letter-spacing": $.sui.text.std["18b"][6].letterspacing.toString(),
        "line-height": $.sui.text.std["18b"][6].lineheight.toString(),
      }],
      ["text-std-17b-7", {
        "font-family": $.sui.text.std["17b"][7].fontfamily.toString(),
        "font-size": $.sui.text.std["17b"][7].fontsize.toString(),
        "font-weight": $.sui.text.std["17b"][7].fontweight.toString(),
        "letter-spacing": $.sui.text.std["17b"][7].letterspacing.toString(),
        "line-height": $.sui.text.std["17b"][7].lineheight.toString(),
      }],
      ["text-std-16b-7", {
        "font-family": $.sui.text.std["16b"][7].fontfamily.toString(),
        "font-size": $.sui.text.std["16b"][7].fontsize.toString(),
        "font-weight": $.sui.text.std["16b"][7].fontweight.toString(),
        "letter-spacing": $.sui.text.std["16b"][7].letterspacing.toString(),
        "line-height": $.sui.text.std["16b"][7].lineheight.toString(),
      }],
      ["text-std-32m-5", {
        "font-family": $.sui.text.std["32m"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["32m"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["32m"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["32m"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["32m"][5].lineheight.toString(),
      }],
      ["text-std-28m-5", {
        "font-family": $.sui.text.std["28m"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["28m"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["28m"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["28m"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["28m"][5].lineheight.toString(),
      }],
      ["text-std-24m-5", {
        "font-family": $.sui.text.std["24m"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["24m"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["24m"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["24m"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["24m"][5].lineheight.toString(),
      }],
      ["text-std-20m-5", {
        "font-family": $.sui.text.std["20m"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["20m"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["20m"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["20m"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["20m"][5].lineheight.toString(),
      }],
      ["text-std-17m-7", {
        "font-family": $.sui.text.std["17m"][7].fontfamily.toString(),
        "font-size": $.sui.text.std["17m"][7].fontsize.toString(),
        "font-weight": $.sui.text.std["17m"][7].fontweight.toString(),
        "letter-spacing": $.sui.text.std["17m"][7].letterspacing.toString(),
        "line-height": $.sui.text.std["17m"][7].lineheight.toString(),
      }],
      ["text-std-16m-7", {
        "font-family": $.sui.text.std["16m"][7].fontfamily.toString(),
        "font-size": $.sui.text.std["16m"][7].fontsize.toString(),
        "font-weight": $.sui.text.std["16m"][7].fontweight.toString(),
        "letter-spacing": $.sui.text.std["16m"][7].letterspacing.toString(),
        "line-height": $.sui.text.std["16m"][7].lineheight.toString(),
      }],
      ["text-std-45n-4", {
        "font-family": $.sui.text.std["45n"][4].fontfamily.toString(),
        "font-size": $.sui.text.std["45n"][4].fontsize.toString(),
        "font-weight": $.sui.text.std["45n"][4].fontweight.toString(),
        "letter-spacing": $.sui.text.std["45n"][4].letterspacing.toString(),
        "line-height": $.sui.text.std["45n"][4].lineheight.toString(),
      }],
      ["text-std-36n-4", {
        "font-family": $.sui.text.std["36n"][4].fontfamily.toString(),
        "font-size": $.sui.text.std["36n"][4].fontsize.toString(),
        "font-weight": $.sui.text.std["36n"][4].fontweight.toString(),
        "letter-spacing": $.sui.text.std["36n"][4].letterspacing.toString(),
        "line-height": $.sui.text.std["36n"][4].lineheight.toString(),
      }],
      ["text-std-32n-5", {
        "font-family": $.sui.text.std["32n"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["32n"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["32n"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["32n"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["32n"][5].lineheight.toString(),
      }],
      ["text-std-28n-5", {
        "font-family": $.sui.text.std["28n"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["28n"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["28n"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["28n"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["28n"][5].lineheight.toString(),
      }],
      ["text-std-26n-5", {
        "font-family": $.sui.text.std["26n"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["26n"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["26n"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["26n"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["26n"][5].lineheight.toString(),
      }],
      ["text-std-24n-5", {
        "font-family": $.sui.text.std["24n"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["24n"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["24n"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["24n"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["24n"][5].lineheight.toString(),
      }],
      ["text-std-22n-5", {
        "font-family": $.sui.text.std["22n"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["22n"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["22n"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["22n"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["22n"][5].lineheight.toString(),
      }],
      ["text-std-20n-5", {
        "font-family": $.sui.text.std["20n"][5].fontfamily.toString(),
        "font-size": $.sui.text.std["20n"][5].fontsize.toString(),
        "font-weight": $.sui.text.std["20n"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.std["20n"][5].letterspacing.toString(),
        "line-height": $.sui.text.std["20n"][5].lineheight.toString(),
      }],
      ["text-std-18n-6", {
        "font-family": $.sui.text.std["18n"][6].fontfamily.toString(),
        "font-size": $.sui.text.std["18n"][6].fontsize.toString(),
        "font-weight": $.sui.text.std["18n"][6].fontweight.toString(),
        "letter-spacing": $.sui.text.std["18n"][6].letterspacing.toString(),
        "line-height": $.sui.text.std["18n"][6].lineheight.toString(),
      }],
      ["text-std-17n-7", {
        "font-family": $.sui.text.std["17n"][7].fontfamily.toString(),
        "font-size": $.sui.text.std["17n"][7].fontsize.toString(),
        "font-weight": $.sui.text.std["17n"][7].fontweight.toString(),
        "letter-spacing": $.sui.text.std["17n"][7].letterspacing.toString(),
        "line-height": $.sui.text.std["17n"][7].lineheight.toString(),
      }],
      ["text-std-16n-7", {
        "font-family": $.sui.text.std["16n"][7].fontfamily.toString(),
        "font-size": $.sui.text.std["16n"][7].fontsize.toString(),
        "font-weight": $.sui.text.std["16n"][7].fontweight.toString(),
        "letter-spacing": $.sui.text.std["16n"][7].letterspacing.toString(),
        "line-height": $.sui.text.std["16n"][7].lineheight.toString(),
      }],
      ["text-dns-17b-3", {
        "font-family": $.sui.text.dns["17b"][3].fontfamily.toString(),
        "font-size": $.sui.text.dns["17b"][3].fontsize.toString(),
        "font-weight": $.sui.text.dns["17b"][3].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["17b"][3].letterspacing.toString(),
        "line-height": $.sui.text.dns["17b"][3].lineheight.toString(),
      }],
      ["text-dns-17n-3", {
        "font-family": $.sui.text.dns["17n"][3].fontfamily.toString(),
        "font-size": $.sui.text.dns["17n"][3].fontsize.toString(),
        "font-weight": $.sui.text.dns["17n"][3].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["17n"][3].letterspacing.toString(),
        "line-height": $.sui.text.dns["17n"][3].lineheight.toString(),
      }],
      ["text-dns-17b-2", {
        "font-family": $.sui.text.dns["17b"][2].fontfamily.toString(),
        "font-size": $.sui.text.dns["17b"][2].fontsize.toString(),
        "font-weight": $.sui.text.dns["17b"][2].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["17b"][2].letterspacing.toString(),
        "line-height": $.sui.text.dns["17b"][2].lineheight.toString(),
      }],
      ["text-dns-17n-2", {
        "font-family": $.sui.text.dns["17n"][2].fontfamily.toString(),
        "font-size": $.sui.text.dns["17n"][2].fontsize.toString(),
        "font-weight": $.sui.text.dns["17n"][2].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["17n"][2].letterspacing.toString(),
        "line-height": $.sui.text.dns["17n"][2].lineheight.toString(),
      }],
      ["text-dns-16b-3", {
        "font-family": $.sui.text.dns["16b"][3].fontfamily.toString(),
        "font-size": $.sui.text.dns["16b"][3].fontsize.toString(),
        "font-weight": $.sui.text.dns["16b"][3].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["16b"][3].letterspacing.toString(),
        "line-height": $.sui.text.dns["16b"][3].lineheight.toString(),
      }],
      ["text-dns-16n-3", {
        "font-family": $.sui.text.dns["16n"][3].fontfamily.toString(),
        "font-size": $.sui.text.dns["16n"][3].fontsize.toString(),
        "font-weight": $.sui.text.dns["16n"][3].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["16n"][3].letterspacing.toString(),
        "line-height": $.sui.text.dns["16n"][3].lineheight.toString(),
      }],
      ["text-dns-16b-2", {
        "font-family": $.sui.text.dns["16b"][2].fontfamily.toString(),
        "font-size": $.sui.text.dns["16b"][2].fontsize.toString(),
        "font-weight": $.sui.text.dns["16b"][2].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["16b"][2].letterspacing.toString(),
        "line-height": $.sui.text.dns["16b"][2].lineheight.toString(),
      }],
      ["text-dns-16n-2", {
        "font-family": $.sui.text.dns["16n"][2].fontfamily.toString(),
        "font-size": $.sui.text.dns["16n"][2].fontsize.toString(),
        "font-weight": $.sui.text.dns["16n"][2].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["16n"][2].letterspacing.toString(),
        "line-height": $.sui.text.dns["16n"][2].lineheight.toString(),
      }],
      ["text-dns-14b-3", {
        "font-family": $.sui.text.dns["14b"][3].fontfamily.toString(),
        "font-size": $.sui.text.dns["14b"][3].fontsize.toString(),
        "font-weight": $.sui.text.dns["14b"][3].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["14b"][3].letterspacing.toString(),
        "line-height": $.sui.text.dns["14b"][3].lineheight.toString(),
      }],
      ["text-dns-14n-3", {
        "font-family": $.sui.text.dns["14n"][3].fontfamily.toString(),
        "font-size": $.sui.text.dns["14n"][3].fontsize.toString(),
        "font-weight": $.sui.text.dns["14n"][3].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["14n"][3].letterspacing.toString(),
        "line-height": $.sui.text.dns["14n"][3].lineheight.toString(),
      }],
      ["text-dns-14b-2", {
        "font-family": $.sui.text.dns["14b"][2].fontfamily.toString(),
        "font-size": $.sui.text.dns["14b"][2].fontsize.toString(),
        "font-weight": $.sui.text.dns["14b"][2].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["14b"][2].letterspacing.toString(),
        "line-height": $.sui.text.dns["14b"][2].lineheight.toString(),
      }],
      ["text-dns-14n-2", {
        "font-family": $.sui.text.dns["14n"][2].fontfamily.toString(),
        "font-size": $.sui.text.dns["14n"][2].fontsize.toString(),
        "font-weight": $.sui.text.dns["14n"][2].fontweight.toString(),
        "letter-spacing": $.sui.text.dns["14n"][2].letterspacing.toString(),
        "line-height": $.sui.text.dns["14n"][2].lineheight.toString(),
      }],
      ["text-oln-17b-1", {
        "font-family": $.sui.text.oln["17b"][1].fontfamily.toString(),
        "font-size": $.sui.text.oln["17b"][1].fontsize.toString(),
        "font-weight": $.sui.text.oln["17b"][1].fontweight.toString(),
        "letter-spacing": $.sui.text.oln["17b"][1].letterspacing.toString(),
        "line-height": $.sui.text.oln["17b"][1].lineheight.toString(),
      }],
      ["text-oln-17m-1", {
        "font-family": $.sui.text.oln["17m"][1].fontfamily.toString(),
        "font-size": $.sui.text.oln["17m"][1].fontsize.toString(),
        "font-weight": $.sui.text.oln["17m"][1].fontweight.toString(),
        "letter-spacing": $.sui.text.oln["17m"][1].letterspacing.toString(),
        "line-height": $.sui.text.oln["17m"][1].lineheight.toString(),
      }],
      ["text-oln-17n-1", {
        "font-family": $.sui.text.oln["17n"][1].fontfamily.toString(),
        "font-size": $.sui.text.oln["17n"][1].fontsize.toString(),
        "font-weight": $.sui.text.oln["17n"][1].fontweight.toString(),
        "letter-spacing": $.sui.text.oln["17n"][1].letterspacing.toString(),
        "line-height": $.sui.text.oln["17n"][1].lineheight.toString(),
      }],
      ["text-oln-16b-1", {
        "font-family": $.sui.text.oln["16b"][1].fontfamily.toString(),
        "font-size": $.sui.text.oln["16b"][1].fontsize.toString(),
        "font-weight": $.sui.text.oln["16b"][1].fontweight.toString(),
        "letter-spacing": $.sui.text.oln["16b"][1].letterspacing.toString(),
        "line-height": $.sui.text.oln["16b"][1].lineheight.toString(),
      }],
      ["text-oln-16m-1", {
        "font-family": $.sui.text.oln["16m"][1].fontfamily.toString(),
        "font-size": $.sui.text.oln["16m"][1].fontsize.toString(),
        "font-weight": $.sui.text.oln["16m"][1].fontweight.toString(),
        "letter-spacing": $.sui.text.oln["16m"][1].letterspacing.toString(),
        "line-height": $.sui.text.oln["16m"][1].lineheight.toString(),
      }],
      ["text-oln-16n-1", {
        "font-family": $.sui.text.oln["16n"][1].fontfamily.toString(),
        "font-size": $.sui.text.oln["16n"][1].fontsize.toString(),
        "font-weight": $.sui.text.oln["16n"][1].fontweight.toString(),
        "letter-spacing": $.sui.text.oln["16n"][1].letterspacing.toString(),
        "line-height": $.sui.text.oln["16n"][1].lineheight.toString(),
      }],
      ["text-oln-14b-1", {
        "font-family": $.sui.text.oln["14b"][1].fontfamily.toString(),
        "font-size": $.sui.text.oln["14b"][1].fontsize.toString(),
        "font-weight": $.sui.text.oln["14b"][1].fontweight.toString(),
        "letter-spacing": $.sui.text.oln["14b"][1].letterspacing.toString(),
        "line-height": $.sui.text.oln["14b"][1].lineheight.toString(),
      }],
      ["text-oln-14m-1", {
        "font-family": $.sui.text.oln["14m"][1].fontfamily.toString(),
        "font-size": $.sui.text.oln["14m"][1].fontsize.toString(),
        "font-weight": $.sui.text.oln["14m"][1].fontweight.toString(),
        "letter-spacing": $.sui.text.oln["14m"][1].letterspacing.toString(),
        "line-height": $.sui.text.oln["14m"][1].lineheight.toString(),
      }],
      ["text-oln-14n-1", {
        "font-family": $.sui.text.oln["14n"][1].fontfamily.toString(),
        "font-size": $.sui.text.oln["14n"][1].fontsize.toString(),
        "font-weight": $.sui.text.oln["14n"][1].fontweight.toString(),
        "letter-spacing": $.sui.text.oln["14n"][1].letterspacing.toString(),
        "line-height": $.sui.text.oln["14n"][1].lineheight.toString(),
      }],
      ["text-mono-17b-5", {
        "font-family": $.sui.text.mono["17b"][5].fontfamily.toString(),
        "font-size": $.sui.text.mono["17b"][5].fontsize.toString(),
        "font-weight": $.sui.text.mono["17b"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.mono["17b"][5].letterspacing.toString(),
        "line-height": $.sui.text.mono["17b"][5].lineheight.toString(),
      }],
      ["text-mono-17n-5", {
        "font-family": $.sui.text.mono["17n"][5].fontfamily.toString(),
        "font-size": $.sui.text.mono["17n"][5].fontsize.toString(),
        "font-weight": $.sui.text.mono["17n"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.mono["17n"][5].letterspacing.toString(),
        "line-height": $.sui.text.mono["17n"][5].lineheight.toString(),
      }],
      ["text-mono-16b-5", {
        "font-family": $.sui.text.mono["16b"][5].fontfamily.toString(),
        "font-size": $.sui.text.mono["16b"][5].fontsize.toString(),
        "font-weight": $.sui.text.mono["16b"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.mono["16b"][5].letterspacing.toString(),
        "line-height": $.sui.text.mono["16b"][5].lineheight.toString(),
      }],
      ["text-mono-16n-5", {
        "font-family": $.sui.text.mono["16n"][5].fontfamily.toString(),
        "font-size": $.sui.text.mono["16n"][5].fontsize.toString(),
        "font-weight": $.sui.text.mono["16n"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.mono["16n"][5].letterspacing.toString(),
        "line-height": $.sui.text.mono["16n"][5].lineheight.toString(),
      }],
      ["text-mono-14b-5", {
        "font-family": $.sui.text.mono["14b"][5].fontfamily.toString(),
        "font-size": $.sui.text.mono["14b"][5].fontsize.toString(),
        "font-weight": $.sui.text.mono["14b"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.mono["14b"][5].letterspacing.toString(),
        "line-height": $.sui.text.mono["14b"][5].lineheight.toString(),
      }],
      ["text-mono-14n-5", {
        "font-family": $.sui.text.mono["14n"][5].fontfamily.toString(),
        "font-size": $.sui.text.mono["14n"][5].fontsize.toString(),
        "font-weight": $.sui.text.mono["14n"][5].fontweight.toString(),
        "letter-spacing": $.sui.text.mono["14n"][5].letterspacing.toString(),
        "line-height": $.sui.text.mono["14n"][5].lineheight.toString(),
      }],

      // linktext

      ["linktext", {
        "text-decoration": "underline",
        "text-underline-offset": $.sui.linktext.underline.offset.toString(),
        "text-underline-style": "solid",
        color: $.sui.linktext.canvastext.main.toString(),
        "background-color": $.sui.linktext.canvas.main.toString(),
        "text-underline-color": $.sui.linktext.underline.color.main.toString(),
        "text-decoration-thickness": $.sui.linktext.underline.width.main.toString(),
      }],
      ["linktext-hover", {
        "text-decoration": "underline",
        "text-underline-offset": $.sui.linktext.underline.offset.toString(),
        "text-underline-style": "solid",
        color: $.sui.linktext.canvastext.hover.toString(),
        "background-color": $.sui.linktext.canvas.hover.toString(),
        "text-underline-color": $.sui.linktext.underline.color.hover.toString(),
        "text-decoration-thickness": $.sui.linktext.underline.width.hover.toString(),
      }],
      ["linktext-focus", {
        "text-decoration": "underline",
        "text-underline-offset": $.sui.linktext.underline.offset.toString(),
        "text-underline-style": "solid",
        color: $.sui.linktext.canvastext.focus.toString(),
        "background-color": $.sui.linktext.canvas.focus.toString(),
        "text-underline-color": $.sui.linktext.underline.color.focus.toString(),
        "text-decoration-thickness": $.sui.linktext.underline.width.focus.toString(),
        "outline-width": $.sui.linktext.focusring.width.toString(),
        "outline-color": $.sui.linktext.focusring.color.toString(),
        "outline-offset": $.sui.linktext.focusring.offset.toString(),
      }],
      ["linktext-active", {
        "text-decoration": "underline",
        "text-underline-offset": $.sui.linktext.underline.offset.toString(),
        "text-underline-style": "solid",
        color: $.sui.linktext.canvastext.active.toString(),
        "background-color": $.sui.linktext.canvas.active.toString(),
        "text-underline-color": $.sui.linktext.underline.color.active.toString(),
        "text-decoration-thickness": $.sui.linktext.underline.width.active.toString(),
      }],
      ["linktext-visited", {
        "text-decoration": "underline",
        "text-underline-offset": $.sui.linktext.underline.offset.toString(),
        "text-underline-style": "solid",
        color: $.sui.linktext.canvastext.visited.toString(),
        "background-color": $.sui.linktext.canvas.visited.toString(),
        "text-underline-color": $.sui.linktext.underline.color.visited.toString(),
        "text-decoration-thickness": $.sui.linktext.underline.width.visited.toString(),
      }],
      ["linktext-disabled", {
        "text-decoration": "underline",
        "text-underline-offset": $.sui.linktext.underline.offset.toString(),
        "text-underline-style": "solid",
        color: $.sui.canvastext.disabled.toString(),
        "background-color": "transparent",
        "text-underline-color": $.sui.canvastext.disabled.toString(),
        "text-decoration-thickness": $.sui.linktext.underline.width.disabled.toString(),
      }],

      /*********************************************************************************************
       *
       * Backgrounds
       *
       ********************************************************************************************/

      // color

      ["bg-main", { "background-color": $.sui.canvas.main.toString() }],
      ["bg-paper", { "background-color": $.sui.canvas.paper.toString() }],
      ["bg-disabled", { "background-color": $.sui.canvas.disabled.toString() }],
      ...COLOR_LIST.flatMap(color => [
        ...COLOR_SCALE_LIST.flatMap((scale): StaticRule[] => [
          [`bg-${color}-${scale}`, { "background-color": $.sui[color][scale].toString() }],
          [`bg-${color}-${scale}-alpha`, {
            "background-color": $.sui[color].alpha[scale].toString(),
          }],
        ]),
        ...COLOR_VARIANT_LIST.flatMap((variant): StaticRule[] => [
          [`bg-${color}-${variant}`, {
            "background-color": $.sui[color][variant].canvas.toString(),
          }],
          [`bg-${color}-${variant}-subtle`, {
            "background-color": $.sui[color][variant].subtle.toString(),
          }],
          [`bg-${color}-${variant}-action`, {
            "background-color": $.sui[color][variant].action.toString(),
          }],
        ]),
      ]),

      /*********************************************************************************************
       *
       * Borders
       *
       ********************************************************************************************/

      // border-radius

      [/^rounded(-(?:[setrbl]|[se][se]|[tb][lr]))?-([0-9]+)?(xs|sm|md|lg|xl)$/, m => {
        const corner = (m[1] || "").slice(1) as
          | ""
          | "s"
          | "e"
          | "t"
          | "r"
          | "b"
          | "l"
          | "ss"
          | "se"
          | "ee"
          | "es"
          | "tl"
          | "tr"
          | "br"
          | "bl";
        const sizeVar = toSizeVar(m[2], m[3], "rad");

        return {
          "": { "border-radius": sizeVar },
          "s": {
            "border-start-start-radius": sizeVar,
            "border-end-start-radius": sizeVar,
          },
          "e": {
            "border-start-end-radius": sizeVar,
            "border-end-end-radius": sizeVar,
          },
          "t": {
            "border-top-right-radius": sizeVar,
            "border-top-left-radius": sizeVar,
          },
          "r": {
            "border-top-right-radius": sizeVar,
            "border-bottom-right-radius": sizeVar,
          },
          "b": {
            "border-bottom-right-radius": sizeVar,
            "border-bottom-left-radius": sizeVar,
          },
          "l": {
            "border-top-left-radius": sizeVar,
            "border-bottom-left-radius": sizeVar,
          },
          "ss": { "border-start-start-radius": sizeVar },
          "se": { "border-start-end-radius": sizeVar },
          "ee": { "border-end-end-radius": sizeVar },
          "es": { "border-end-start-radius": sizeVar },
          "tl": { "border-top-left-radius": sizeVar },
          "tr": { "border-top-right-radius": sizeVar },
          "br": { "border-bottom-right-radius": sizeVar },
          "bl": { "border-bottom-left-radius": sizeVar },
        }[corner];
      }],

      // border-color

      ["border-text-main", { "border-color": $.sui.canvastext.main.toString() }],
      ["border-text-subtle", { "border-color": $.sui.canvastext.subtle.toString() }],
      ["border-text-disabled", { "border-color": $.sui.canvastext.disabled.toString() }],
      ["border-bg-main", { "border-color": $.sui.canvas.main.toString() }],
      ["border-bg-paper", { "border-color": $.sui.canvas.paper.toString() }],
      ["border-bg-disabled", { "border-color": $.sui.canvas.disabled.toString() }],
      ...COLOR_LIST.flatMap(color => [
        ...COLOR_SCALE_LIST.flatMap((scale): StaticRule[] => [
          [`border-${color}-${scale}`, { "border-color": $.sui[color][scale].toString() }],
          [`border-${color}-${scale}-alpha`, {
            "border-color": $.sui[color].alpha[scale].toString(),
          }],
        ]),
        ...COLOR_VARIANT_LIST.flatMap((variant): StaticRule[] => [
          [`border-${color}-${variant}`, {
            "border-color": $.sui[color][variant].border.toString(),
          }],
        ]),
      ]),

      // outline-color

      ["outline-text-main", { "outline-color": $.sui.canvastext.main.toString() }],
      ["outline-text-subtle", { "outline-color": $.sui.canvastext.subtle.toString() }],
      ["outline-text-disabled", { "outline-color": $.sui.canvastext.disabled.toString() }],
      ["outline-bg-main", { "outline-color": $.sui.canvas.main.toString() }],
      ["outline-bg-paper", { "outline-color": $.sui.canvas.paper.toString() }],
      ["outline-bg-disabled", { "outline-color": $.sui.canvas.disabled.toString() }],
      ...COLOR_LIST.flatMap(color => [
        ...COLOR_SCALE_LIST.flatMap((scale): StaticRule[] => [
          [`outline-${color}-${scale}`, { "outline-color": $.sui[color][scale].toString() }],
          [`outline-${color}-${scale}-alpha`, {
            "outline-color": $.sui[color].alpha[scale].toString(),
          }],
        ]),
        ...COLOR_VARIANT_LIST.flatMap((variant): StaticRule[] => [
          [`outline-${color}-${variant}`, {
            "outline-color": $.sui[color][variant].border.toString(),
          }],
        ]),
      ]),

      // focusring

      ["focusring", {
        "outline-style": "solid",
        "outline-width": $.sui.focusring.width.toString(),
        "outline-color": $.sui.focusring.color.toString(),
        "outline-offset": $.sui.focusring.offset.toString(),
      }],

      /*********************************************************************************************
       *
       * Filters
       *
       ********************************************************************************************/

      // overlay

      ["overlay", {
        blur: `blur(${$.sui.overlay.blur})`,
        "background-color": $.sui.overlay.canvas.toString(),
      }],
    ],
  } satisfies Preset<any>;
}
