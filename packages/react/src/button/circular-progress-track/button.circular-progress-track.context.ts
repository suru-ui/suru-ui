import {
  ButtonCircularProgressContext,
  useButtonCircularProgressContext,
} from "../circular-progress/button.circular-progress.context.js";

// ButtonCircularProgressTrack は Context を変更・拡張しないため、親の ButtonCircularProgressContext をそのまま使う。
export {
  ButtonCircularProgressContext as CircularProgressTrackContext,
  ButtonCircularProgressContext as ButtonCircularProgressTrackContext,
  useButtonCircularProgressContext as useCircularProgressTrackContext,
  useButtonCircularProgressContext as useButtonCircularProgressTrackContext,
};
