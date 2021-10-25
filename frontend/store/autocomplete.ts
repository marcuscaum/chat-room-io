import { atom, DefaultValue, selector, selectorFamily } from "recoil";
import { AUTOCOMPLETE_PREFIX } from "../hooks/useAutocomplete";
import { IAutocompleteQuery } from "../utils/getAutocompleteSearchValue";
import usersState, { IUser } from "./users";

export interface IAutocompleteState {
  value: string;
  selectedIndex: number;
  selectedValue: IUser["email"] | "";
}

export const messageInputValue = atom({
  key: "messageInputValue",
  default: "",
});

export const autocompleteQueryValue = atom({
  key: "autocompleteQueryValue",
  default: "",
});

export const autocompleteCurrentMention = atom({
  key: "autocompleteCurrentMention",
  default: {} as IAutocompleteQuery,
});

export const autocompleteSelectedIndex = atom({
  key: "autocompleteSelectedIndex",
  default: 0,
});

export const autocompleteSelectedValue = selector({
  key: "autocompleteSelectedValue",
  get: ({ get }) => {
    const selectedIndex = get(autocompleteSelectedIndex);
    const suggestions = get(autocompleteSuggestions);

    return suggestions[selectedIndex]?.email;
  },
});

export const autocompleteSuggestions = selector({
  key: "autocompleteSuggestions",
  get: ({ get }) => {
    const value = get(autocompleteQueryValue);
    const users = get(usersState);
    const trimmedValue = value.trim();
    const formattedValue = trimmedValue.replace(AUTOCOMPLETE_PREFIX, "");

    if (!value.length) {
      return [];
    }

    if (!trimmedValue.length) return users;

    const filteredList = users.filter(({ email }) => {
      if (formattedValue.length > email.length) {
        return false;
      }
      return (
        email.substr(0, formattedValue.length).toUpperCase() ===
        formattedValue.toUpperCase()
      );
    });

    return filteredList;
  },
});

export const setAutocompleteSelectedIndex = selector({
  key: "setAutocompleteSelectedIndex",
  get: ({ get }) => get(autocompleteSelectedIndex),
  set: ({ get, set }, indexValue: number | DefaultValue) => {
    const suggestions = get(autocompleteSuggestions);
    if (!suggestions.length) return;

    set(autocompleteSelectedIndex, indexValue);
  },
});

export const setAutocompletedMessageInput = selector({
  key: "setAutocompletedMessageInput",
  get: ({ get }) => get(autocompleteSelectedValue),
  set: ({ get, set }, manuallySelectedUser = false) => {
    const currentMention = get(autocompleteCurrentMention);
    const inputValue = get(messageInputValue);
    const selectedUser = manuallySelectedUser || get(autocompleteSelectedValue);

    const [startPos, endPos] = currentMention.range;
    const newValue = inputValue;

    const newMessage =
      newValue.slice(0, startPos) +
      selectedUser +
      newValue.slice(endPos, newValue.length);

    set(messageInputValue, newMessage);
    set(autocompleteQueryValue, "");
  },
});
