const TarotPlaceholder = () => {
  return (
    <div className="flex justify-start w-full h-full pb-8 overflow-hidden">
      <div className="p-4 rounded-lg border border-gray-300 shadow-lg max-h-full flex flex-col items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-24 h-24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <p className="text-center mt-4 text-gray-500">
            Loading Tarot Card...
          </p>
        </div>
      </div>
    </div>
  );
};

export default TarotPlaceholder;
