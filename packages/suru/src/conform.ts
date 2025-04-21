import type { getSelectProps } from "@conform-to/react";

export type SelectProps = Omit<ReturnType<typeof getSelectProps>, "key">;
