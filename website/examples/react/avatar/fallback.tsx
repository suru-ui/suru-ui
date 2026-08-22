import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";

export default function Fallback() {
  return (
    <div className="flex flex-wrap gap-3">
      <Avatar color="blue">山</Avatar>
      <Avatar color="green">鈴</Avatar>
      <Avatar color="orange">佐</Avatar>
      <Avatar />
    </div>
  );
}
