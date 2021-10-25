import { REGEX_VALID_URL } from "../constants";

export const extractUrlFromString = (url: string): string => {
  return (
    url
      ?.replace(/\n/g, ` `)
      .split(/(\s+)/)
      .find((token) => REGEX_VALID_URL.test(token)) || ""
  );
};

export const replaceUrlWithLinks = (url: string): any => {
  return url.split(/(\s+)/).map((part) =>
    REGEX_VALID_URL.test(part) ? (
      <a
        className="hover:underline text-blue-400 break-all"
        href={part}
        target="_blank"
        rel="noreferrer"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};
