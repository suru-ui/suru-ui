import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
import {
  type CardRootSize,
  type CardRootProps,
  type CardRootState,
  type CardRootRadius,
  type CardTitleProps,
  type CardActionProps,
  type CardFooterProps,
  type CardHeaderProps,
  type CardContentProps,
  type CardDescriptionProps,
  CardRoot,
  CardTitle,
  CardAction,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "./card.parts.js";

// Types
// -----

export type CardRadius = CardRootRadius;

export type CardSize = CardRootSize;

/**
 * {@link Card} の各パーツに渡す props です。
 */
export type CardSlotProps = {
  /**
   * {@link CardAction} に渡す props です。
   */
  readonly action?: Omit<CardActionProps, "children"> | undefined;

  /**
   * {@link CardContent} に渡す props です。
   */
  readonly content?: Omit<CardContentProps, "children"> | undefined;

  /**
   * {@link CardDescription} に渡す props です。
   */
  readonly description?: Omit<CardDescriptionProps, "children"> | undefined;

  /**
   * {@link CardFooter} に渡す props です。
   */
  readonly footer?: Omit<CardFooterProps, "children"> | undefined;

  /**
   * {@link CardHeader} に渡す props です。
   *
   * タイトル・説明・操作要素のいずれも指定しないときはヘッダーを描画しないため、無視されます。
   */
  readonly header?: Omit<CardHeaderProps, "children"> | undefined;

  /**
   * {@link CardTitle} に渡す props です。
   */
  readonly title?: Omit<CardTitleProps, "children"> | undefined;
};

/**
 * {@link Card} が持つ状態です。
 */
export type CardState = CardRootState;

namespace CardProps {
  export type Card = {
    /**
     * カードのヘッダー右上に表示する操作要素です。
     */
    action?: CardActionProps["children"] | undefined;

    /**
     * カードの本文です。
     */
    children?: CardContentProps["children"] | undefined;

    /**
     * カードのタイトルを補足する説明です。
     */
    description?: CardDescriptionProps["children"] | undefined;

    /**
     * カードの末尾に表示する操作や補足情報です。
     */
    footer?: CardFooterProps["children"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: CardSlotProps | undefined;

    /**
     * カードのタイトルです。
     */
    title?: CardTitleProps["children"] | undefined;
  };

  export type Root = Omit<CardRootProps, keyof Card>;
}

/**
 * {@link Card} に渡す props です。
 */
export type CardProps = CardProps.Card & CardProps.Root;

// API
// ---

/**
 * {@link Card} を構成する各パーツの props を作成するための API です。
 */
export class CardAPI {
  private readonly cardProps: Required<Omit<CardProps.Card, "slotProps">>;

  private readonly rootProps: CardProps.Root;

  private readonly slotProps: CardSlotProps;

  /**
   * @param props {@link Card} の props です。
   * @internal
   */
  public constructor(props: CardProps) {
    const { title, action, footer, children, slotProps = {}, description, ...rootProps } = props;
    this.cardProps = { title, action, footer, children, description };
    this.rootProps = rootProps;
    this.slotProps = slotProps;
  }

  /**
   * {@link CardAction} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getActionProps(): CardActionProps | null {
    const { action: props = {} } = this.slotProps;
    const { action } = this.cardProps;

    if (isLikelyVisibleNode(action)) {
      return {
        ...props,
        children: action,
      };
    }

    return null;
  }

  /**
   * {@link CardContent} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getContentProps(): CardContentProps | null {
    const { content: props = {} } = this.slotProps;
    const { children } = this.cardProps;

    if (isLikelyVisibleNode(children)) {
      return {
        ...props,
        children,
      };
    }

    return null;
  }

  /**
   * {@link CardDescription} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getDescriptionProps(): CardDescriptionProps | null {
    const { description: props = {} } = this.slotProps;
    const { description } = this.cardProps;

    if (isLikelyVisibleNode(description)) {
      return {
        ...props,
        children: description,
      };
    }

    return null;
  }

  /**
   * {@link CardFooter} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getFooterProps(): CardFooterProps | null {
    const { footer: props = {} } = this.slotProps;
    const { footer } = this.cardProps;

    if (isLikelyVisibleNode(footer)) {
      return {
        ...props,
        children: footer,
      };
    }

    return null;
  }

  /**
   * {@link CardHeader} に渡す props を取得します。
   *
   * タイトル・説明・操作要素のいずれも表示しないときは `null` を返します。
   */
  public getHeaderProps(): CardHeaderProps | null {
    const { header: props = {} } = this.slotProps;
    const { title, action, description } = this.cardProps;

    if (
      isLikelyVisibleNode(title) ||
      isLikelyVisibleNode(description) ||
      isLikelyVisibleNode(action)
    ) {
      return { ...props };
    }

    return null;
  }

  /**
   * {@link CardRoot} に渡す props を取得します。
   */
  public getRootProps(): CardProps.Root {
    return this.rootProps;
  }

  /**
   * {@link CardTitle} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getTitleProps(): CardTitleProps | null {
    const { title: props = {} } = this.slotProps;
    const { title } = this.cardProps;

    if (isLikelyVisibleNode(title)) {
      return {
        ...props,
        children: title,
      };
    }

    return null;
  }
}

export interface IUseCardAPI {
  /**
   * {@link CardAPI} を作成します。
   *
   * @param props {@link Card} の props です。
   * @returns カードの API です
   */
  (props: CardProps): CardAPI;
}

/**
 * {@link CardAPI} を作成するフックです。
 */
export const useCardAPI: IUseCardAPI = function useSuiCardAPI(props) {
  return new CardAPI(props);
};

export { CardAPI as API, useCardAPI as useAPI };

// Component
// ---------

export type ICard = IComponent<CardProps>;

/**
 * 情報や操作をひとまとまりにして表示するコンポーネントです。
 */
export const Card: ICard = function SuiCard(props: CardProps) {
  const api = useCardAPI(props);
  const titleProps = api.getTitleProps();
  const descriptionProps = api.getDescriptionProps();
  const actionProps = api.getActionProps();
  const headerProps = api.getHeaderProps();
  const contentProps = api.getContentProps();
  const footerProps = api.getFooterProps();

  return (
    <CardRoot {...api.getRootProps()}>
      {headerProps && (
        <CardHeader {...headerProps}>
          {titleProps && <CardTitle {...titleProps} />}
          {descriptionProps && <CardDescription {...descriptionProps} />}
          {actionProps && <CardAction {...actionProps} />}
        </CardHeader>
      )}
      {contentProps && <CardContent {...contentProps} />}
      {footerProps && <CardFooter {...footerProps} />}
    </CardRoot>
  );
};

export namespace Card {
  export type State = CardState;

  export type Props = CardProps;

  export type SlotProps = CardSlotProps;

  export type Radius = CardRadius;

  export type Size = CardSize;
}
