export default function preventDefaultHandler(evt: unknown): void {
  if (
    evt != null
    && typeof evt === "object"
    && "preventDefault" in evt
    && typeof evt.preventDefault === "function"
  ) {
    evt.preventDefault();
  }
}
