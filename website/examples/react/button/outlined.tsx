import "../../_fixture";
import { Button } from "@suru-ui/react/button";

export default function Outlined() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="solid" outlined>
        ソリッド
      </Button>
      <Button variant="naked" outlined>
        ネイキッド
      </Button>
      <Button variant="liquid" outlined>
        リキッド
      </Button>
    </div>
  );
}
