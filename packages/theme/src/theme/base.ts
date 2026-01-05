import { $, create } from "./_tools.ts";

const FONTSIZE_SCALE = "var(--sui-scale-fontsize)";

const BORDER_WIDTH_SCALE = "var(--sui-scale-border-width)";

const FOCUSRING_WIDTH_SCALE = "var(--sui-scale-focusring-width)";

const FOCUSRING_OFFSET_SCALE = "var(--sui-scale-focusring-offset)";

const HEIHGT_SM_SCALE = "var(--sui-scale-height-sm)";

const HEIHGT_MD_SCALE = "var(--sui-scale-height-md)";

const HEIHGT_LG_SCALE = "var(--sui-scale-height-lg)";

export default create({
  sui: {
    scale: {
      default: 1,
      fontsize: $.string("sui.scale.default"),
      border: {
        width: $.string("sui.scale.default"),
      },
      focusring: {
        default: $.string("sui.scale.default"),
        width: $.string("sui.scale.focusring.default"),
        offset: $.string("sui.scale.focusring.default"),
      },
      height: {
        default: $.string("sui.scale.default"),
        sm: $.string("sui.scale.height.default"),
        md: $.string("sui.scale.height.default"),
        lg: $.string("sui.scale.height.default"),
      },
    },
    fontfamily: {
      sans: `"Noto Sans JP", sans-serif`,
      mono: `"Noto Sans Mono", monospace`,
    },
    text: {
      dsp: {
        "64n": {
          4: {
            fontsize: $("_digital_go_jp.typography.dsp_64n_4.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dsp_64n_4.weight"),
            lineheight: $("_digital_go_jp.typography.dsp_64n_4.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dsp_64n_4.letterspacing"),
          },
        },
        "57n": {
          4: {
            fontsize: $("_digital_go_jp.typography.dsp_57n_4.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dsp_57n_4.weight"),
            lineheight: $("_digital_go_jp.typography.dsp_57n_4.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dsp_57n_4.letterspacing"),
          },
        },
        "48n": {
          4: {
            fontsize: $("_digital_go_jp.typography.dsp_48n_4.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dsp_48n_4.weight"),
            lineheight: $("_digital_go_jp.typography.dsp_48n_4.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dsp_48n_4.letterspacing"),
          },
        },
      },
      std: {
        "45b": {
          4: {
            fontsize: $("_digital_go_jp.typography.std_45b_4.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_45b_4.weight"),
            lineheight: $("_digital_go_jp.typography.std_45b_4.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_45b_4.letterspacing"),
          },
        },
        "36b": {
          4: {
            fontsize: $("_digital_go_jp.typography.std_36b_4.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_36b_4.weight"),
            lineheight: $("_digital_go_jp.typography.std_36b_4.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_36b_4.letterspacing"),
          },
        },
        "32b": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_32b_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_32b_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_32b_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_32b_5.letterspacing"),
          },
        },
        "28b": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_28b_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_28b_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_28b_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_28b_5.letterspacing"),
          },
        },
        "24b": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_24b_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_24b_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_24b_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_24b_5.letterspacing"),
          },
        },
        "22b": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_22b_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_22b_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_22b_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_22b_5.letterspacing"),
          },
        },
        "20b": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_20b_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_20b_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_20b_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_20b_5.letterspacing"),
          },
        },
        "18b": {
          6: {
            fontsize: $("_digital_go_jp.typography.std_18b_6.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_18b_6.weight"),
            lineheight: $("_digital_go_jp.typography.std_18b_6.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_18b_6.letterspacing"),
          },
        },
        "17b": {
          7: {
            fontsize: $("_digital_go_jp.typography.std_17b_7.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_17b_7.weight"),
            lineheight: $("_digital_go_jp.typography.std_17b_7.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_17b_7.letterspacing"),
          },
        },
        "16b": {
          7: {
            fontsize: $("_digital_go_jp.typography.std_16b_7.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_16b_7.weight"),
            lineheight: $("_digital_go_jp.typography.std_16b_7.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_16b_7.letterspacing"),
          },
        },
        "32m": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_32m_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_32m_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_32m_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_32m_5.letterspacing"),
          },
        },
        "28m": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_28m_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_28m_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_28m_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_28m_5.letterspacing"),
          },
        },
        "24m": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_24m_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_24m_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_24m_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_24m_5.letterspacing"),
          },
        },
        "20m": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_20m_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_20m_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_20m_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_20m_5.letterspacing"),
          },
        },
        "17m": {
          7: {
            fontsize: $("_digital_go_jp.typography.std_17m_7.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_17m_7.weight"),
            lineheight: $("_digital_go_jp.typography.std_17m_7.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_17m_7.letterspacing"),
          },
        },
        "16m": {
          7: {
            fontsize: $("_digital_go_jp.typography.std_16m_7.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_16m_7.weight"),
            lineheight: $("_digital_go_jp.typography.std_16m_7.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_16m_7.letterspacing"),
          },
        },
        "45n": {
          4: {
            fontsize: $("_digital_go_jp.typography.std_45n_4.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_45n_4.weight"),
            lineheight: $("_digital_go_jp.typography.std_45n_4.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_45n_4.letterspacing"),
          },
        },
        "36n": {
          4: {
            fontsize: $("_digital_go_jp.typography.std_36n_4.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_36n_4.weight"),
            lineheight: $("_digital_go_jp.typography.std_36n_4.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_36n_4.letterspacing"),
          },
        },
        "32n": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_32n_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_32n_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_32n_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_32n_5.letterspacing"),
          },
        },
        "28n": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_28n_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_28n_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_28n_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_28n_5.letterspacing"),
          },
        },
        "26n": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_26n_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_26n_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_26n_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_26n_5.letterspacing"),
          },
        },
        "24n": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_24n_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_24n_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_24n_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_24n_5.letterspacing"),
          },
        },
        "22n": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_22n_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_22n_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_22n_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_22n_5.letterspacing"),
          },
        },
        "20n": {
          5: {
            fontsize: $("_digital_go_jp.typography.std_20n_5.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_20n_5.weight"),
            lineheight: $("_digital_go_jp.typography.std_20n_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_20n_5.letterspacing"),
          },
        },
        "18n": {
          6: {
            fontsize: $("_digital_go_jp.typography.std_18n_6.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_18n_6.weight"),
            lineheight: $("_digital_go_jp.typography.std_18n_6.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_18n_6.letterspacing"),
          },
        },
        "17n": {
          7: {
            fontsize: $("_digital_go_jp.typography.std_17n_7.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_17n_7.weight"),
            lineheight: $("_digital_go_jp.typography.std_17n_7.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_17n_7.letterspacing"),
          },
        },
        "16n": {
          7: {
            fontsize: $("_digital_go_jp.typography.std_16n_7.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.std_16n_7.weight"),
            lineheight: $("_digital_go_jp.typography.std_16n_7.lineheight"),
            letterspacing: $("_digital_go_jp.typography.std_16n_7.letterspacing"),
          },
        },
      },
      dns: {
        "17b": {
          3: {
            fontsize: $("_digital_go_jp.typography.dns_17b_3.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_17b_3.weight"),
            lineheight: $("_digital_go_jp.typography.dns_17b_3.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_17b_3.letterspacing"),
          },
          2: {
            fontsize: $("_digital_go_jp.typography.dns_17b_2.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_17b_2.weight"),
            lineheight: $("_digital_go_jp.typography.dns_17b_2.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_17b_2.letterspacing"),
          },
        },
        "17n": {
          3: {
            fontsize: $("_digital_go_jp.typography.dns_17n_3.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_17n_3.weight"),
            lineheight: $("_digital_go_jp.typography.dns_17n_3.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_17n_3.letterspacing"),
          },
          2: {
            fontsize: $("_digital_go_jp.typography.dns_17n_2.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_17n_2.weight"),
            lineheight: $("_digital_go_jp.typography.dns_17n_2.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_17n_2.letterspacing"),
          },
        },
        "16b": {
          3: {
            fontsize: $("_digital_go_jp.typography.dns_16b_3.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_16b_3.weight"),
            lineheight: $("_digital_go_jp.typography.dns_16b_3.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_16b_3.letterspacing"),
          },
          2: {
            fontsize: $("_digital_go_jp.typography.dns_16b_2.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_16b_2.weight"),
            lineheight: $("_digital_go_jp.typography.dns_16b_2.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_16b_2.letterspacing"),
          },
        },
        "16n": {
          3: {
            fontsize: $("_digital_go_jp.typography.dns_16n_3.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_16n_3.weight"),
            lineheight: $("_digital_go_jp.typography.dns_16n_3.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_16n_3.letterspacing"),
          },
          2: {
            fontsize: $("_digital_go_jp.typography.dns_16n_2.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_16n_2.weight"),
            lineheight: $("_digital_go_jp.typography.dns_16n_2.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_16n_2.letterspacing"),
          },
        },
        "14b": {
          3: {
            fontsize: $("_digital_go_jp.typography.dns_14b_3.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_14b_3.weight"),
            lineheight: $("_digital_go_jp.typography.dns_14b_3.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_14b_3.letterspacing"),
          },
          2: {
            fontsize: $("_digital_go_jp.typography.dns_14b_2.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_14b_2.weight"),
            lineheight: $("_digital_go_jp.typography.dns_14b_2.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_14b_2.letterspacing"),
          },
        },
        "14n": {
          3: {
            fontsize: $("_digital_go_jp.typography.dns_14n_3.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_14n_3.weight"),
            lineheight: $("_digital_go_jp.typography.dns_14n_3.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_14n_3.letterspacing"),
          },
          2: {
            fontsize: $("_digital_go_jp.typography.dns_14n_2.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.dns_14n_2.weight"),
            lineheight: $("_digital_go_jp.typography.dns_14n_2.lineheight"),
            letterspacing: $("_digital_go_jp.typography.dns_14n_2.letterspacing"),
          },
        },
      },
      oln: {
        "17b": {
          1: {
            fontsize: $("_digital_go_jp.typography.oln_17b_1.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.oln_17b_1.weight"),
            lineheight: $("_digital_go_jp.typography.oln_17b_1.lineheight"),
            letterspacing: $("_digital_go_jp.typography.oln_17b_1.letterspacing"),
          },
        },
        "17m": {
          1: {
            fontsize: $("_digital_go_jp.typography.oln_17m_1.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.oln_17m_1.weight"),
            lineheight: $("_digital_go_jp.typography.oln_17m_1.lineheight"),
            letterspacing: $("_digital_go_jp.typography.oln_17m_1.letterspacing"),
          },
        },
        "17n": {
          1: {
            fontsize: $("_digital_go_jp.typography.oln_17n_1.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.oln_17n_1.weight"),
            lineheight: $("_digital_go_jp.typography.oln_17n_1.lineheight"),
            letterspacing: $("_digital_go_jp.typography.oln_17n_1.letterspacing"),
          },
        },
        "16b": {
          1: {
            fontsize: $("_digital_go_jp.typography.oln_16b_1.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.oln_16b_1.weight"),
            lineheight: $("_digital_go_jp.typography.oln_16b_1.lineheight"),
            letterspacing: $("_digital_go_jp.typography.oln_16b_1.letterspacing"),
          },
        },
        "16m": {
          1: {
            fontsize: $("_digital_go_jp.typography.oln_16m_1.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.oln_16m_1.weight"),
            lineheight: $("_digital_go_jp.typography.oln_16m_1.lineheight"),
            letterspacing: $("_digital_go_jp.typography.oln_16m_1.letterspacing"),
          },
        },
        "16n": {
          1: {
            fontsize: $("_digital_go_jp.typography.oln_16n_1.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.oln_16n_1.weight"),
            lineheight: $("_digital_go_jp.typography.oln_16n_1.lineheight"),
            letterspacing: $("_digital_go_jp.typography.oln_16n_1.letterspacing"),
          },
        },
        "14b": {
          1: {
            fontsize: $("_digital_go_jp.typography.oln_14b_1.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.oln_14b_1.weight"),
            lineheight: $("_digital_go_jp.typography.oln_14b_1.lineheight"),
            letterspacing: $("_digital_go_jp.typography.oln_14b_1.letterspacing"),
          },
        },
        "14m": {
          1: {
            fontsize: $("_digital_go_jp.typography.oln_14m_1.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.oln_14m_1.weight"),
            lineheight: $("_digital_go_jp.typography.oln_14m_1.lineheight"),
            letterspacing: $("_digital_go_jp.typography.oln_14m_1.letterspacing"),
          },
        },
        "14n": {
          1: {
            fontsize: $("_digital_go_jp.typography.oln_14n_1.size"),
            fontfamily: $("sui.fontfamily.sans"),
            fontweight: $("_digital_go_jp.typography.oln_14n_1.weight"),
            lineheight: $("_digital_go_jp.typography.oln_14n_1.lineheight"),
            letterspacing: $("_digital_go_jp.typography.oln_14n_1.letterspacing"),
          },
        },
      },
      mono: {
        "17b": {
          5: {
            fontsize: $("_digital_go_jp.typography.mono_17b_5.size"),
            fontfamily: $("sui.fontfamily.mono"),
            fontweight: $("_digital_go_jp.typography.mono_17b_5.weight"),
            lineheight: $("_digital_go_jp.typography.mono_17b_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.mono_17b_5.letterspacing"),
          },
        },
        "17n": {
          5: {
            fontsize: $("_digital_go_jp.typography.mono_17n_5.size"),
            fontfamily: $("sui.fontfamily.mono"),
            fontweight: $("_digital_go_jp.typography.mono_17n_5.weight"),
            lineheight: $("_digital_go_jp.typography.mono_17n_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.mono_17n_5.letterspacing"),
          },
        },
        "16b": {
          5: {
            fontsize: $("_digital_go_jp.typography.mono_16b_5.size"),
            fontfamily: $("sui.fontfamily.mono"),
            fontweight: $("_digital_go_jp.typography.mono_16b_5.weight"),
            lineheight: $("_digital_go_jp.typography.mono_16b_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.mono_16b_5.letterspacing"),
          },
        },
        "16n": {
          5: {
            fontsize: $("_digital_go_jp.typography.mono_16n_5.size"),
            fontfamily: $("sui.fontfamily.mono"),
            fontweight: $("_digital_go_jp.typography.mono_16n_5.weight"),
            lineheight: $("_digital_go_jp.typography.mono_16n_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.mono_16n_5.letterspacing"),
          },
        },
        "14b": {
          5: {
            fontsize: $("_digital_go_jp.typography.mono_14b_5.size"),
            fontfamily: $("sui.fontfamily.mono"),
            fontweight: $("_digital_go_jp.typography.mono_14b_5.weight"),
            lineheight: $("_digital_go_jp.typography.mono_14b_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.mono_14b_5.letterspacing"),
          },
        },
        "14n": {
          5: {
            fontsize: $("_digital_go_jp.typography.mono_14n_5.size"),
            fontfamily: $("sui.fontfamily.mono"),
            fontweight: $("_digital_go_jp.typography.mono_14n_5.weight"),
            lineheight: $("_digital_go_jp.typography.mono_14n_5.lineheight"),
            letterspacing: $("_digital_go_jp.typography.mono_14n_5.letterspacing"),
          },
        },
      },
    },
    border: {
      width: {
        main: `calc(2px * ${BORDER_WIDTH_SCALE})`,
        hover: `calc(3px * ${BORDER_WIDTH_SCALE})`,
        active: `calc(3px * ${BORDER_WIDTH_SCALE})`,
        disabled: `calc(1px * ${BORDER_WIDTH_SCALE})`,
      },
    },
    focusring: {
      width: `calc(4px * ${FOCUSRING_WIDTH_SCALE})`,
      offset: `calc(2px * ${FOCUSRING_OFFSET_SCALE})`,
    },
    overlay: {
      blur: "4px",
    },
    height: {
      sm: `calc(24px * ${HEIHGT_SM_SCALE})`,
      md: `calc(32px * ${HEIHGT_MD_SCALE})`,
      lg: `calc(40px * ${HEIHGT_LG_SCALE})`,
    },
    size: {
      offset: "0px",
      base: "2px",
      pow: {
        base: 2,
        numscale: 0.4,
      },
      0: "0px",
      ...Object.fromEntries(
        Array.from({ length: 20 }).map((_, i) => [
          i + 1,
          `calc(var(--sui-size-offset) + var(--sui-size-base) * pow(var(--sui-size-pow-base), calc(${i} * var(--sui-size-pow-numscale))))`,
        ]),
      ) as Record<
        // dprint-ignore
        |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10
        | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20,
        string
      >,
    },
  },
  // https://design.digital.go.jp/foundations/typography/
  _digital_go_jp: {
    typography: {
      dsp_64n_4: {
        size: `calc(64px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.4,
        letterspacing: 0,
      },
      dsp_57n_4: {
        size: `calc(57px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.4,
        letterspacing: 0,
      },
      dsp_48n_4: {
        size: `calc(48px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.4,
        letterspacing: 0,
      },
      std_45b_4: {
        size: `calc(45px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.4,
        letterspacing: ".02em",
      },
      std_36b_4: {
        size: `calc(36px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.4,
        letterspacing: ".02em",
      },
      std_32b_5: {
        size: `calc(32px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_28b_5: {
        size: `calc(28px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_24b_5: {
        size: `calc(24px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_22b_5: {
        size: `calc(22px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_20b_5: {
        size: `calc(20px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_18b_6: {
        size: `calc(18px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.6,
        letterspacing: ".02em",
      },
      std_17b_7: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.7,
        letterspacing: ".02em",
      },
      std_16b_7: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.7,
        letterspacing: ".02em",
      },
      std_32m_5: {
        size: `calc(32px * ${FONTSIZE_SCALE})`,
        weight: 500,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_28m_5: {
        size: `calc(28px * ${FONTSIZE_SCALE})`,
        weight: 500,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_24m_5: {
        size: `calc(24px * ${FONTSIZE_SCALE})`,
        weight: 500,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_20m_5: {
        size: `calc(20px * ${FONTSIZE_SCALE})`,
        weight: 500,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_17m_7: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 500,
        lineheight: 1.7,
        letterspacing: ".02em",
      },
      std_16m_7: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 500,
        lineheight: 1.7,
        letterspacing: ".02em",
      },
      std_45n_4: {
        size: `calc(45px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.4,
        letterspacing: ".02em",
      },
      std_36n_4: {
        size: `calc(36px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.4,
        letterspacing: ".02em",
      },
      std_32n_5: {
        size: `calc(32px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_28n_5: {
        size: `calc(28px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_26n_5: {
        size: `calc(26px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_24n_5: {
        size: `calc(24px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_22n_5: {
        size: `calc(22px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_20n_5: {
        size: `calc(20px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.5,
        letterspacing: ".02em",
      },
      std_18n_6: {
        size: `calc(18px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.6,
        letterspacing: ".02em",
      },
      std_17n_7: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.7,
        letterspacing: ".02em",
      },
      std_16n_7: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.7,
        letterspacing: ".02em",
      },
      dns_17b_3: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.3,
        letterspacing: 0,
      },
      dns_17n_3: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.3,
        letterspacing: 0,
      },
      dns_17b_2: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.2,
        letterspacing: 0,
      },
      dns_17n_2: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.2,
        letterspacing: 0,
      },
      dns_16b_3: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.3,
        letterspacing: 0,
      },
      dns_16n_3: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.3,
        letterspacing: 0,
      },
      dns_16b_2: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.2,
        letterspacing: 0,
      },
      dns_16n_2: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.2,
        letterspacing: 0,
      },
      dns_14b_3: {
        size: `calc(14px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.3,
        letterspacing: 0,
      },
      dns_14n_3: {
        size: `calc(14px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.3,
        letterspacing: 0,
      },
      dns_14b_2: {
        size: `calc(14px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.2,
        letterspacing: 0,
      },
      dns_14n_2: {
        size: `calc(14px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.2,
        letterspacing: 0,
      },
      oln_17b_1: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.1,
        letterspacing: ".02em",
      },
      oln_17m_1: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 500,
        lineheight: 1.1,
        letterspacing: ".02em",
      },
      oln_17n_1: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.1,
        letterspacing: ".02em",
      },
      oln_16b_1: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.1,
        letterspacing: ".02em",
      },
      oln_16m_1: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 500,
        lineheight: 1.1,
        letterspacing: ".02em",
      },
      oln_16n_1: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.1,
        letterspacing: ".02em",
      },
      oln_14b_1: {
        size: `calc(14px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.1,
        letterspacing: ".02em",
      },
      oln_14m_1: {
        size: `calc(14px * ${FONTSIZE_SCALE})`,
        weight: 500,
        lineheight: 1.1,
        letterspacing: ".02em",
      },
      oln_14n_1: {
        size: `calc(14px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.1,
        letterspacing: ".02em",
      },
      mono_17b_5: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.5,
        letterspacing: 0,
      },
      mono_17n_5: {
        size: `calc(17px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.5,
        letterspacing: 0,
      },
      mono_16b_5: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.5,
        letterspacing: 0,
      },
      mono_16n_5: {
        size: `calc(16px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.5,
        letterspacing: 0,
      },
      mono_14b_5: {
        size: `calc(14px * ${FONTSIZE_SCALE})`,
        weight: 700,
        lineheight: 1.5,
        letterspacing: 0,
      },
      mono_14n_5: {
        size: `calc(14px * ${FONTSIZE_SCALE})`,
        weight: 400,
        lineheight: 1.5,
        letterspacing: 0,
      },
    },
  },
});
