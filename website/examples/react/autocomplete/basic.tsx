import "../../_fixture";
import { Autocomplete } from "@suru-ui/react/autocomplete";

const frameworks = ["React", "Vue", "Angular", "Svelte", "Solid", "Qwik"];

export default function Basic() {
  return <Autocomplete items={frameworks} placeholder="フレームワークを検索" />;
}
