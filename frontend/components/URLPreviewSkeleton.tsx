const URLPreviewSkeleton: React.FC<{}> = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 mt-4 w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-blue-400 rounded w-1/4"></div>
          <div>
            <div className="h-4 bg-blue-400 rounded mb-2"></div>
            <div className="h-4 bg-blue-400 rounded mb-3"></div>
            <div className="h-20 rounded bg-blue-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLPreviewSkeleton;
