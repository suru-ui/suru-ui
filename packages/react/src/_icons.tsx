import type { IComponent } from "./types.js";

export const XIcon: IComponent = function SuiXIcon() {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      viewBox="0 0 24 24"
      focusable="false"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
};

export const ClearIcon: IComponent = function SuiClearIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
};

export const ChevronIcon: IComponent = function SuiChevronIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
};

export const ChevronRightIcon: IComponent = function SuiChevronRightIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
};

/**
 * チェックボックスの既定のアイコンです。
 */
export const CheckboxIcon: IComponent = function SuiCheckboxIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3 8h10" className="sui_checkbox_icon-dash" />
      <path d="m2.5 8.5 4 4 7-9" className="sui_checkbox_icon-check" />
    </svg>
  );
};
