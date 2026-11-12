import {
  InputGroupContext,
  useInputGroupContext,
} from "../input-group/autocomplete.input-group.context.js";

// AutocompleteAddon は Context を変更・拡張しないため、親の AutocompleteInputGroupContext をそのまま使う。
export {
  InputGroupContext as AddonContext,
  InputGroupContext as AutocompleteAddonContext,
  useInputGroupContext as useAddonContext,
  useInputGroupContext as useAutocompleteAddonContext,
};
