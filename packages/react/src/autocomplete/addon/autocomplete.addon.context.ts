import { AutocompleteContext, useAutocompleteContext } from "../root/autocomplete.root.context.js";

// AutocompleteAddon は Context を変更・拡張しないため、親の AutocompleteContext をそのまま使う。
export {
  AutocompleteContext as AddonContext,
  useAutocompleteContext as useAddonContext,
  AutocompleteContext as AutocompleteAddonContext,
  useAutocompleteContext as useAutocompleteAddonContext,
};
