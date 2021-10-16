import React from "react";

interface IPaper {
  elevation?: 0 | 1 | 2 | 3;
  className?: string;
}

const Paper: React.FC<IPaper> = ({ children, elevation = 3, className }) => {
  const elevationStyles: string[] = [
    "",
    "drop-shadow filter",
    "drop-shadow-lg filter",
    "drop-shadow-2xl filter",
  ];

  return (
    <div
      className={`w-full bg-white rounded-lg ${elevationStyles[elevation]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Paper;
