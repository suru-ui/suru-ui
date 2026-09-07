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

export const ChevronLeftIcon: IComponent = function SuiChevronLeftIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M10 4l-4 4 4 4" />
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

export const CheckIcon: IComponent = function SuiCheckIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m3 8 3 3 7-7" />
    </svg>
  );
};

export const PlusIcon: IComponent = function SuiPlusIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
};

export const MoreIcon: IComponent = function SuiMoreIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 8h.01M8 8h.01M12 8h.01" />
    </svg>
  );
};

export const MinusIcon: IComponent = function SuiMinusIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3 8h10" />
    </svg>
  );
};

export const CursorGrowIcon: IComponent = function SuiCursorGrowIcon() {
  return (
    <svg
      fill="none"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      stroke="currentColor"
      viewBox="0 0 24 24"
      focusable="false"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <polyline points="8 8 4 12 8 16" />
      <polyline points="16 8 20 12 16 16" />
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
