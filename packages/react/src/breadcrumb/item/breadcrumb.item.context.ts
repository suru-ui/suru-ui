import { BreadcrumbContext, useBreadcrumbContext } from "../root/breadcrumb.root.context.js";

// BreadcrumbItem は Context を変更・拡張しないため、親の BreadcrumbContext をそのまま使う。
export {
  BreadcrumbContext as ItemContext,
  useBreadcrumbContext as useItemContext,
  BreadcrumbContext as BreadcrumbItemContext,
  useBreadcrumbContext as useBreadcrumbItemContext,
};
