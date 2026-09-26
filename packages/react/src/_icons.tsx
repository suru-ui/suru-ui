import type * as React from "react";

import type { IComponent } from "./types.js";

export const XIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiXIcon(props) {
  return (
    <svg
      {...props}
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

export const ClearIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiClearIcon(props) {
  return (
    <svg
      {...props}
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

export const ChevronIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiChevronIcon(
  props,
) {
  return (
    <svg
      {...props}
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

export const ChevronLeftIcon: IComponent<React.SVGProps<SVGSVGElement>> =
  function SuiChevronLeftIcon(props) {
    return (
      <svg
        {...props}
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

export const ChevronRightIcon: IComponent<React.SVGProps<SVGSVGElement>> =
  function SuiChevronRightIcon(props) {
    return (
      <svg
        {...props}
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

export const CheckIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiCheckIcon(props) {
  return (
    <svg
      {...props}
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

export const PlusIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiPlusIcon(props) {
  return (
    <svg
      {...props}
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

export const MoreIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiMoreIcon(props) {
  return (
    <svg
      {...props}
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

export const MinusIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiMinusIcon(props) {
  return (
    <svg
      {...props}
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

export const CursorGrowIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiCursorGrowIcon(
  props,
) {
  return (
    <svg
      {...props}
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
export const CheckboxIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiCheckboxIcon(
  props,
) {
  return (
    <svg
      {...props}
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

export const EyeIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiEyeIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      viewBox="0 0 24 24"
      focusable="false"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle r="3" cx="12" cy="12" />
    </svg>
  );
};

export const EyeOffIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiEyeOffIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      viewBox="0 0 24 24"
      focusable="false"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
};

/**
 * サイドバーの既定の切り替えアイコンです。
 */
export const SidebarIcon: IComponent<React.SVGProps<SVGSVGElement>> = function SuiSidebarIcon(
  props,
) {
  return (
    <svg
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      viewBox="0 0 24 24"
      focusable="false"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" rx="2" width="18" height="18" />
      <path d="M9 3v18" />
    </svg>
  );
};
