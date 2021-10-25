import { REGEX_VALID_EMAIL } from "../constants";

export const formatMentions = (content: []): any => {
  return content.map((part: any, index) => {
    return typeof part === "string" && part.match(REGEX_VALID_EMAIL) ? (
      <span
        key={`mention-${part}-${index}`}
        className="text-blue-400 break-all font-semibold"
      >
        {part}
      </span>
    ) : (
      part
    );
  });
};
