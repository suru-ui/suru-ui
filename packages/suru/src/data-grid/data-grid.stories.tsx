import type { Story, StoryDefault } from "@ladle/react";
import * as DataGrid from ".";

export default {
  title: "Layout / DataGrid",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return (
    <DataGrid.Root nCols={3}>
      <DataGrid.Head>
        <DataGrid.Row>
          <DataGrid.Cell>タイトル</DataGrid.Cell>
          <DataGrid.Cell>状態</DataGrid.Cell>
          <DataGrid.Cell>コメント数</DataGrid.Cell>
        </DataGrid.Row>
      </DataGrid.Head>
      <DataGrid.Body>
        <DataGrid.Row>
          <DataGrid.Cell>記事タイトル1</DataGrid.Cell>
          <DataGrid.Cell>公開中</DataGrid.Cell>
          <DataGrid.Cell>10</DataGrid.Cell>
        </DataGrid.Row>
        <DataGrid.Row>
          <DataGrid.Cell>記事タイトル2</DataGrid.Cell>
          <DataGrid.Cell>下書き</DataGrid.Cell>
          <DataGrid.Cell>0</DataGrid.Cell>
        </DataGrid.Row>
        <DataGrid.Row>
          <DataGrid.Cell>記事タイトル3</DataGrid.Cell>
          <DataGrid.Cell>非公開</DataGrid.Cell>
          <DataGrid.Cell>3</DataGrid.Cell>
        </DataGrid.Row>
      </DataGrid.Body>
    </DataGrid.Root>
  );
};
Basic.storyName = "基本的な使い方";

export const Stripe: Story = () => {
  return (
    <DataGrid.Root nCols={3} stripe>
      <DataGrid.Head>
        <DataGrid.Row>
          <DataGrid.Cell>タイトル</DataGrid.Cell>
          <DataGrid.Cell>状態</DataGrid.Cell>
          <DataGrid.Cell>コメント数</DataGrid.Cell>
        </DataGrid.Row>
      </DataGrid.Head>
      <DataGrid.Body>
        <DataGrid.Row>
          <DataGrid.Cell>記事タイトル1</DataGrid.Cell>
          <DataGrid.Cell>公開中</DataGrid.Cell>
          <DataGrid.Cell>10</DataGrid.Cell>
        </DataGrid.Row>
        <DataGrid.Row>
          <DataGrid.Cell>記事タイトル2</DataGrid.Cell>
          <DataGrid.Cell>下書き</DataGrid.Cell>
          <DataGrid.Cell>0</DataGrid.Cell>
        </DataGrid.Row>
        <DataGrid.Row>
          <DataGrid.Cell>記事タイトル3</DataGrid.Cell>
          <DataGrid.Cell>非公開</DataGrid.Cell>
          <DataGrid.Cell>3</DataGrid.Cell>
        </DataGrid.Row>
      </DataGrid.Body>
    </DataGrid.Root>
  );
};
Stripe.storyName = "背景色ストライプ";

export const Dense: Story = () => {
  return (
    <DataGrid.Root nCols={3} dense>
      <DataGrid.Head>
        <DataGrid.Row>
          <DataGrid.Cell>タイトル</DataGrid.Cell>
          <DataGrid.Cell>状態</DataGrid.Cell>
          <DataGrid.Cell>コメント数</DataGrid.Cell>
        </DataGrid.Row>
      </DataGrid.Head>
      <DataGrid.Body>
        <DataGrid.Row>
          <DataGrid.Cell>記事タイトル1</DataGrid.Cell>
          <DataGrid.Cell>公開中</DataGrid.Cell>
          <DataGrid.Cell>10</DataGrid.Cell>
        </DataGrid.Row>
        <DataGrid.Row>
          <DataGrid.Cell>記事タイトル2</DataGrid.Cell>
          <DataGrid.Cell>下書き</DataGrid.Cell>
          <DataGrid.Cell>0</DataGrid.Cell>
        </DataGrid.Row>
        <DataGrid.Row>
          <DataGrid.Cell>記事タイトル3</DataGrid.Cell>
          <DataGrid.Cell>非公開</DataGrid.Cell>
          <DataGrid.Cell>3</DataGrid.Cell>
        </DataGrid.Row>
      </DataGrid.Body>
    </DataGrid.Root>
  );
};
Dense.storyName = "セルの高さが狭い";

export const Table: Story = () => {
  return (
    <DataGrid.Root nCols={3} asChild>
      <table>
        <DataGrid.Head asChild>
          <thead>
            <DataGrid.Row asChild>
              <tr>
                <DataGrid.Cell asChild>
                  <td>タイトル</td>
                </DataGrid.Cell>
                <DataGrid.Cell asChild>
                  <td>状態</td>
                </DataGrid.Cell>
                <DataGrid.Cell asChild>
                  <td>コメント数</td>
                </DataGrid.Cell>
              </tr>
            </DataGrid.Row>
          </thead>
        </DataGrid.Head>
        <DataGrid.Body asChild>
          <tbody>
            <DataGrid.Row asChild>
              <tr>
                <DataGrid.Cell asChild>
                  <td>記事タイトル1</td>
                </DataGrid.Cell>
                <DataGrid.Cell asChild>
                  <td>公開中</td>
                </DataGrid.Cell>
                <DataGrid.Cell asChild>
                  <td>10</td>
                </DataGrid.Cell>
              </tr>
            </DataGrid.Row>
            <DataGrid.Row asChild>
              <tr>
                <DataGrid.Cell asChild>
                  <td>記事タイトル2</td>
                </DataGrid.Cell>
                <DataGrid.Cell asChild>
                  <td>下書き</td>
                </DataGrid.Cell>
                <DataGrid.Cell asChild>
                  <td>0</td>
                </DataGrid.Cell>
              </tr>
            </DataGrid.Row>
            <DataGrid.Row asChild>
              <tr>
                <DataGrid.Cell asChild>
                  <td>記事タイトル3</td>
                </DataGrid.Cell>
                <DataGrid.Cell asChild>
                  <td>非公開</td>
                </DataGrid.Cell>
                <DataGrid.Cell asChild>
                  <td>3</td>
                </DataGrid.Cell>
              </tr>
            </DataGrid.Row>
          </tbody>
        </DataGrid.Body>
      </table>
    </DataGrid.Root>
  );
};
Table.storyName = "テーブル";
