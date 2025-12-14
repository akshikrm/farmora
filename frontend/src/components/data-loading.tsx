const DataLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-gray-400 mb-4">
        <svg
          className="w-16 h-16 mx-auto animate-spin"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">Loading...</h3>
      <p className="text-sm text-gray-500">Please wait while we fetch the data</p>
    </div>
  );
};

export default DataLoading;
