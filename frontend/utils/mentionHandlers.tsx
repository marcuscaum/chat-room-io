import { REGEX_VALID_EMAIL } from "../constants";

export const formatMentions = (content: []): any => {
  return content.map((part: any) =>
    part === typeof String && part.match(REGEX_VALID_EMAIL) ? (
      <span className="text-blue-400 break-all font-semibold">{part}</span>
    ) : (
      part
    )
  );
};
