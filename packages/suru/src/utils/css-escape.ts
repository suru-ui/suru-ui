import cssEscape from "css.escape";

export default typeof CSS !== "undefined" ? CSS.escape : cssEscape;
