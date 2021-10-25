import React, { useCallback, useEffect } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { REGEX_AUTOCOMPLETE } from "../constants";
import {
  autocompleteSelectedIndex,
  autocompleteQueryValue,
  setAutocompleteSelectedIndex,
  setAutocompletedMessageInput,
  autocompleteCurrentMention,
} from "../store/autocomplete";
import autocompleteQuery, {
  IAutocompleteQuery,
} from "../utils/getAutocompleteSearchValue";

export const AUTOCOMPLETE_PREFIX = "@";

const useAutocomplete = ({
  inputElement,
}: {
  inputElement: HTMLTextAreaElement | null;
}) => {
  const resetSelectedIndex = useResetRecoilState(autocompleteSelectedIndex);
  const [queryValue, setQueryValue] = useRecoilState(autocompleteQueryValue);
  const setCurrentMention = useSetRecoilState(autocompleteCurrentMention);
  const setInputValueWithMention = useSetRecoilState(
    setAutocompletedMessageInput
  );
  const [selectedIndex, setSelectedIndex] = useRecoilState(
    setAutocompleteSelectedIndex
  );

  useEffect(() => {
    if (!queryValue.length) {
      return inputElement?.removeEventListener("keydown", autocompleteKeyDown);
    }

    inputElement?.addEventListener("keydown", autocompleteKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryValue]);

  const handleArrowUp = () => {
    setSelectedIndex(selectedIndex ? selectedIndex - 1 : 0);
  };

  const handleArrowDown = () => {
    setSelectedIndex(selectedIndex + 1);
  };

  const updateMessageWithSelectedUser = () => {
    setInputValueWithMention(false);
  };

  const handleTab = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    e.preventDefault();
    updateMessageWithSelectedUser();
  };

  const autocompleteKeyDown = useCallback(
    (e: any) => {
      if (e.key === "Tab" || e.key === "Enter") {
        handleTab(e);
      }

      if (e.key === "ArrowUp") {
        handleArrowUp();
      }
      if (e.key === "ArrowDown") {
        handleArrowDown();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const setupAutocompleteQuery = (value: string, selectionEnd: number) => {
    const searchValue = autocompleteQuery(value, selectionEnd);
    const validSearchValue =
      searchValue?.word.match(REGEX_AUTOCOMPLETE)?.[0] || "";

    setQueryValue(validSearchValue);

    if (validSearchValue.length) {
      setCurrentMention(searchValue as IAutocompleteQuery);
      resetSelectedIndex();
    } else {
      setQueryValue("");
    }
  };

  const handleKeyUp = (e: any) => {
    const { value, selectionEnd } = e.currentTarget;

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setupAutocompleteQuery(value, selectionEnd);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value, selectionEnd } = e.currentTarget;
    setupAutocompleteQuery(value, selectionEnd);
  };

  return {
    handleChange,
    handleKeyUp,
    handleTab,
  };
};

export default useAutocomplete;
