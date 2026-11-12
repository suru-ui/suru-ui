import {
  ButtonCircularProgressContext,
  useButtonCircularProgressContext,
} from "../circular-progress/button.circular-progress.context.js";

// ButtonCircularProgressFill は Context を変更・拡張しないため、親の ButtonCircularProgressContext をそのまま使う。
export {
  ButtonCircularProgressContext as CircularProgressFillContext,
  ButtonCircularProgressContext as ButtonCircularProgressFillContext,
  useButtonCircularProgressContext as useCircularProgressFillContext,
  useButtonCircularProgressContext as useButtonCircularProgressFillContext,
};
