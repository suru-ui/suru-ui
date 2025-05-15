interface Event {
  readonly preventDefault: () => void;
}

export default function preventDefaultHandler(evt: Event): void {
  evt.preventDefault();
}
