import { BreadcrumbContext, useBreadcrumbContext } from "../root/breadcrumb.root.context.js";

// BreadcrumbList は Context を変更・拡張しないため、親の BreadcrumbContext をそのまま使う。
export {
  BreadcrumbContext as ListContext,
  useBreadcrumbContext as useListContext,
  BreadcrumbContext as BreadcrumbListContext,
  useBreadcrumbContext as useBreadcrumbListContext,
};
