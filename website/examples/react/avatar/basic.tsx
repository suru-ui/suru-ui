import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";

export default function Basic() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        alt="山田 太郎"
      />
      <Avatar src="https://example.com/broken.png" alt="鈴木 花子">
        鈴
      </Avatar>
    </div>
  );
}
