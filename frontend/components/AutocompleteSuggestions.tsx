import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  autocompleteSelectedIndex,
  autocompleteSuggestions,
  setAutocompletedMessageInput,
} from "../store/autocomplete";

const AutocompleteSuggestions: React.FC<{}> = () => {
  const suggestions = useRecoilValue(autocompleteSuggestions);
  const selectedIndex = useRecoilValue(autocompleteSelectedIndex);
  const setInputValue = useSetRecoilState(setAutocompletedMessageInput);

  if (!suggestions.length) return null;

  return (
    <div className="absolute rounded w-3/4 h-auto bg-white bottom-0 m-2 ring-2 ring-gray-200 ">
      {suggestions.map(({ email }, index) => (
        <div
          key={`${email}-autocomplete`}
          onClick={() => setInputValue(email)}
          className={`text text-gray-500 p-3 border-b border-gray-200 cursor-pointer hover:bg-blue-300 ${
            selectedIndex === index && "bg-blue-100"
          }`}
        >
          {email}
        </div>
      ))}
    </div>
  );
};

export default AutocompleteSuggestions;
