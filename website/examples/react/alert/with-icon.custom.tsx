import "../../_fixture";
import { Alert } from "@suru-ui/react/alert";

export default function WithIconCustom() {
  return (
    <Alert
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      }
      color="red"
      title="エラー"
    >
      問題が発生しました。もう一度お試しください。
    </Alert>
  );
}
