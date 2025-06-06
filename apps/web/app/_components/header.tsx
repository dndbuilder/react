import { useContent } from "@repo/builder";

export const Header = () => {
  const content = useContent();

  return (
    <header className="h-[60px] w-full bg-slate-800 flex items-center justify-between px-4">
      <div className="text-white font-bold text-xl">
        {/* Placeholder logo */}
        <span className="flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <rect width="24" height="24" rx="4" fill="#4F46E5" />
            <path d="M7 12H17" stroke="white" strokeWidth="2" />
            <path d="M12 7L12 17" stroke="white" strokeWidth="2" />
          </svg>
          Page Builder
        </span>
      </div>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        onClick={() => {
          // Save functionality would go here
          alert("Save button clicked");
        }}
      >
        Save
      </button>
    </header>
  );
};
