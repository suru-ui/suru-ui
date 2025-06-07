export interface EventLike {
  readonly preventDefault: () => void;
}

export default function preventDefaultHandler(evt: EventLike): void {
  evt.preventDefault();
}
