import { BreadcrumbContext, useBreadcrumbContext } from "../root/breadcrumb.root.context.js";

// BreadcrumbSeparator は Context を変更・拡張しないため、親の BreadcrumbContext をそのまま使う。
export {
  BreadcrumbContext as SeparatorContext,
  useBreadcrumbContext as useSeparatorContext,
  BreadcrumbContext as BreadcrumbSeparatorContext,
  useBreadcrumbContext as useBreadcrumbSeparatorContext,
};
