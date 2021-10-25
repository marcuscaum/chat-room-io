import React, { Suspense, useState } from "react";
import { IMessage } from "../store/messages";
import { IUser } from "../store/users";
import { formatMentions } from "../utils/mentionHandlers";
import {
  extractUrlFromString,
  replaceUrlWithLinks,
} from "../utils/urlHandlers";
import URLPreview from "./URLPreview";
import URLPreviewSkeleton from "./URLPreviewSkeleton";

interface IMessageComponent extends IMessage {
  user: IUser;
}

const Message: React.FC<IMessageComponent> = ({
  content,
  email,
  type,
  user,
}) => {
  const isUserMessage = email === user.email;
  const foundUrl = extractUrlFromString(content);

  if (type === "broadcast") {
    return (
      <span className="text-sm w-full bg-gray-100 mb flex text-gray-400 p-2 text-center justify-center">
        {content}
      </span>
    );
  }

  return (
    <div
      className={`flex-1 m-2 flex ${
        isUserMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`w-auto max-w-3/4 inline-block rounded p-2 text-left ${
          isUserMessage ? "bg-blue-100" : "bg-gray-100"
        }`}
      >
        <div className={`text-xs m-2 text-gray-400`}>
          {isUserMessage ? "Me" : email}:
        </div>
        <div className="m-2">
          {formatMentions(replaceUrlWithLinks(content))}
          {foundUrl && (
            <Suspense fallback={<URLPreviewSkeleton />}>
              <URLPreview url={foundUrl} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Message);
