import * as React from "react";

import { getItemKey } from "../_item.js";
import type { IComponent } from "../types.js";
import {
  type ButtonContext,
  type ButtonRootSize,
  type ButtonRootColor,
  type ButtonRootProps,
  type ButtonRootState,
  type ButtonAddonProps,
  type ButtonRootRadius,
  type ButtonRootVariant,
  type IUseButtonContext,
  type ButtonContentProps,
  type ButtonPendingProps,
  type ButtonCircularProgressProps,
  type ButtonCircularProgressFillProps,
  type ButtonCircularProgressTrackProps,
  type ButtonCircularProgressFillRotationProps,
  ButtonRoot,
  ButtonAddon,
  ButtonContent,
  ButtonPending,
  useButtonContext,
  ButtonCircularProgress,
  ButtonCircularProgressFill,
  ButtonCircularProgressTrack,
  ButtonCircularProgressFillRotation,
} from "./button.parts.js";

// Types.

export type ButtonColor = ButtonRootColor;

export type ButtonRadius = ButtonRootRadius;

export type ButtonSize = ButtonRootSize;

export type ButtonVariant = ButtonRootVariant;

/**
 * {@link Button} の各パーツに渡す props です。
 */
export type ButtonSlotProps = {
  /**
   * {@link ButtonAddon} に渡す props です。
   */
  readonly addon?: Omit<ButtonAddonProps, "children"> | undefined;

  /**
   * {@link ButtonCircularProgress} に渡す props です。
   */
  readonly circularProgress?:
    | Omit<ButtonCircularProgressProps, "children" | "percentage" | "indeterminate">
    | undefined;

  /**
   * {@link ButtonCircularProgressFill} に渡す props です。
   */
  readonly circularProgressFill?: Omit<ButtonCircularProgressFillProps, "children"> | undefined;

  /**
   * {@link ButtonCircularProgressFillRotation} に渡す props です。
   */
  readonly circularProgressFillRotation?: ButtonCircularProgressFillRotationProps | undefined;

  /**
   * {@link ButtonCircularProgressTrack} に渡す props です。
   */
  readonly circularProgressTrack?: Omit<ButtonCircularProgressTrackProps, "children"> | undefined;

  /**
   * {@link ButtonContent} に渡す props です。
   */
  readonly content?: Omit<ButtonContentProps, "children"> | undefined;

  /**
   * {@link ButtonPending} に渡す props です。
   */
  readonly pending?: Omit<ButtonPendingProps, "children"> | undefined;
};

/**
 * {@link Button} が持つ状態です。
 */
export type ButtonState = ButtonRootState;

namespace ButtonProps {
  export type Button = {
    /** ボタンの末尾に表示する内容です。 */
    endAddons?: Iterable<React.ReactNode> | undefined;

    /** 各パーツに個別の props を渡すためのオブジェクトです。 */
    slotProps?: ButtonSlotProps | undefined;

    /** ボタンの先頭に表示する内容です。 */
    startAddons?: Iterable<React.ReactNode> | undefined;
  };

  export type CircularProgress = Pick<ButtonCircularProgressProps, "indeterminate" | "percentage">;

  export type Content = Pick<ButtonContentProps, "children">;

  export type Root = Omit<ButtonRootProps, keyof Button | keyof Content | keyof CircularProgress>;
}

/**
 * {@link Button} に渡す props です。
 */
export type ButtonProps = ButtonProps.Button &
  ButtonProps.Root &
  ButtonProps.Content &
  ButtonProps.CircularProgress;

export interface IUseButtonAPI {
  /**
   * {@link ButtonAPI} を作成します。
   *
   * @param props {@link Button} の props です。
   *
   * @returns ボタンの API です。
   */
  (props: ButtonProps): ButtonAPI;
}

// API.

// oxlint-disable-next-line typescript/no-unsafe-type-assertion -- 未指定を表す一意なセンチネルです。
const NONE = {} as never;

/**
 * {@link Button} を構成する各パーツの props などを作成するための API です。
 */
export class ButtonAPI {
  private readonly buttonProps: Required<Omit<ButtonProps.Button, "slotProps">>;

  private readonly contentProps: Required<ButtonProps.Content>;

  private readonly circularProgressProps: Required<ButtonProps.CircularProgress>;

  private readonly slotProps: ButtonSlotProps;

  private readonly rootProps: ButtonProps.Root;

  /**
   * @param props {@link Button} の props です。
   *
   * @internal
   */
  public constructor(props: ButtonProps) {
    const {
      children,
      endAddons = [],
      slotProps = {},
      percentage,
      startAddons = [],
      indeterminate,
      ...rootProps
    } = props;
    this.buttonProps = {
      endAddons,
      startAddons,
    };
    this.contentProps = {
      children,
    };
    this.circularProgressProps = {
      percentage,
      indeterminate,
    };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link ButtonAddon} に渡す props を取得します。
   */
  public getAddonProps(addon?: undefined): Omit<ButtonAddonProps, "children">;
  public getAddonProps(addon?: React.ReactNode): ButtonAddonProps;
  public getAddonProps(addon: React.ReactNode = NONE): ButtonAddonProps {
    const { addon: props = {} } = this.slotProps;

    if (addon === NONE) {
      return props;
    }

    return {
      ...props,
      children: addon,
    };
  }

  /**
   * {@link ButtonCircularProgressFill} に渡す props を取得します。
   */
  public getCircularProgressFillProps(): Omit<ButtonCircularProgressFillProps, "children"> {
    const { circularProgressFill: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ButtonCircularProgressFillRotation} に渡す props を取得します。
   */
  public getCircularProgressFillRotationProps(): ButtonCircularProgressFillRotationProps {
    const { circularProgressFillRotation: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ButtonCircularProgress} に渡す props を取得します。
   */
  public getCircularProgressProps(): Omit<ButtonCircularProgressProps, "children"> {
    const { circularProgress: props = {} } = this.slotProps;

    return {
      ...props,
      ...this.circularProgressProps,
    };
  }

  /**
   * {@link ButtonCircularProgressTrack} に渡す props を取得します。
   */
  public getCircularProgressTrackProps(): Omit<ButtonCircularProgressTrackProps, "children"> {
    const { circularProgressTrack: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ButtonContent} に渡す props を取得します。
   */
  public getContentProps(): ButtonContentProps {
    const { content: props = {} } = this.slotProps;

    return {
      ...props,
      ...this.contentProps,
    };
  }

  /**
   * {@link ButtonPending} に渡す props を取得します。
   */
  public getPendingProps(): Omit<ButtonPendingProps, "children"> {
    const { pending: { overlay = true, ...props } = {} } = this.slotProps;

    return {
      ...props,
      overlay,
    };
  }

  /**
   * {@link ButtonRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<ButtonRootProps, "children"> {
    return this.rootProps;
  }

  /**
   * ボタンの末尾に表示する {@link ButtonAddon} の一覧を取得します。
   *
   * @template T コールバックの返り値の型です。
   *
   * @returns コールバックの返り値の一覧です。
   */
  public mapEndAddons<T>(callback: (addon: React.ReactNode, index: number) => T): T[] {
    const { endAddons: addons = [] } = this.buttonProps;
    const result: T[] = [];
    let index = 0;

    for (const addon of addons) {
      result.push(callback(addon, index++));
    }

    return result;
  }

  /**
   * ボタンの先頭に表示する {@link ButtonAddon} の一覧を取得します。
   *
   * @template T コールバックの返り値の型です。
   *
   * @returns コールバックの返り値の一覧です。
   */
  public mapStartAddons<T>(callback: (addon: React.ReactNode, index: number) => T): T[] {
    const { startAddons: addons = [] } = this.buttonProps;
    const result: T[] = [];
    let index = 0;

    for (const addon of addons) {
      result.push(callback(addon, index++));
    }

    return result;
  }
}

/**
 * {@link ButtonAPI} を作成するフックです。
 */
export const useButtonAPI: IUseButtonAPI = (props) => new ButtonAPI(props);

export { ButtonAPI as API, useButtonAPI as useAPI };

// Component.

export interface IButton extends IComponent<ButtonProps> {
  readonly useContext: IUseButtonContext;
}

/** 複数の主な外観と状態を持つクリック可能なボタンコンポーネントです。 */
export const Button: IButton = /*#__PURE__*/ Object.assign(
  (props: ButtonProps) => {
    const api = useButtonAPI(props);

    return (
      <ButtonRoot {...api.getRootProps()}>
        {api.mapStartAddons((addon, index) => (
          <ButtonAddon {...api.getAddonProps(addon)} key={getItemKey(addon) ?? index} />
        ))}
        <ButtonContent {...api.getContentProps()} />
        {api.mapEndAddons((addon, index) => (
          <ButtonAddon {...api.getAddonProps(addon)} key={getItemKey(addon) ?? index} />
        ))}
        <ButtonPending {...api.getPendingProps()}>
          <ButtonCircularProgress {...api.getCircularProgressProps()}>
            <ButtonCircularProgressTrack {...api.getCircularProgressTrackProps()} />
            <ButtonCircularProgressFill {...api.getCircularProgressFillProps()}>
              <ButtonCircularProgressFillRotation {...api.getCircularProgressFillRotationProps()} />
            </ButtonCircularProgressFill>
          </ButtonCircularProgress>
        </ButtonPending>
      </ButtonRoot>
    );
  },
  {
    useContext: useButtonContext,
  },
);

export namespace Button {
  export type State = ButtonState;

  export type Props = ButtonProps;

  export type SlotProps = ButtonSlotProps;

  export type Context = ButtonContext;

  export type Color = ButtonColor;

  export type Radius = ButtonRadius;

  export type Size = ButtonSize;

  export type Variant = ButtonVariant;
}
