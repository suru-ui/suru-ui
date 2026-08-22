import * as React from "react";

class FakeClient {
  #size = 300;

  #sleep = (t: number) => new Promise((r) => setTimeout(r, t));

  async connect() {
    await this.#sleep(2e3);
  }

  async stat(_resourceName: string) {
    return {
      size: this.#size,
    };
  }

  async *read(_resourceName: string) {
    let total = 0;
    while (total < this.#size) {
      const latency = Math.random() * 1e3;
      await this.#sleep(latency);

      const chunkSize = (() => {
        const claim = Math.random() * 30;
        const acc = total;
        total += claim;
        total = Math.min(total, this.#size);

        return total - acc;
      })();

      yield {
        length: chunkSize,
      };
    }
  }

  async disconnect() {
    await this.#sleep(2e3);
  }
}

export default function useProgress() {
  const [percentage, setPercentage] = React.useState<number>();
  const [pending, startTransition] = React.useTransition();
  const clickHandler = (evt: { currentTarget: { value: string } }) => {
    const resourceName = evt.currentTarget.value;
    startTransition(async () => {
      const client = new FakeClient();

      await client.connect();
      const { size } = await client.stat(resourceName);

      setPercentage(0);

      let total = 0;
      for await (const chunk of client.read(resourceName)) {
        total += chunk.length;
        setPercentage((total / size) * 100);
      }

      await client.disconnect();

      setPercentage(undefined);
    });
  };

  return {
    pending,
    percentage,
    clickHandler,
  };
}
