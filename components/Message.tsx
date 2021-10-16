import React from "react";

interface IMessage {
  content: string;
  author?: string;
}

const Message: React.FC<IMessage> = ({ content, author }) => {
  const conditionalStyles = author
    ? "bg-gray-100 text-left"
    : "bg-blue-100 text-left self-end";

  return (
    <>
      {author && (
        <span
          className={`text-xs ml-4 mb-2 hover:text-blue-700 cursor-pointer`}
        >
          {author}
        </span>
      )}
      <div
        className={`flex m-4 mt-0 max-w-prose rounded p-2 mb-4 first:mt-4 ${conditionalStyles}`}
      >
        {content}
      </div>
    </>
  );
};

export default Message;
