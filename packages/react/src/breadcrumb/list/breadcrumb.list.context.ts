import { BreadcrumbContext, useBreadcrumbContext } from "../root/breadcrumb.root.context.js";

// BreadcrumbList は Context を変更・拡張しないため、親の BreadcrumbContext をそのまま使う。
export {
  BreadcrumbContext as ListContext,
  BreadcrumbContext as BreadcrumbListContext,
  useBreadcrumbContext as useListContext,
  useBreadcrumbContext as useBreadcrumbListContext,
};
