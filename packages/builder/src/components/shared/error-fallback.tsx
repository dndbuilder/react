"use client";
export const ErrorFallback = () => {
  return (
    <div
      className="border border-dashed border-red-400 p-10 flex items-center justify-center h-full"
      role="alert"
    >
      <div className="px-1 text-danger-500 text-center">
        <h2 className="text-xl font-bold">{"Some thing went wrong."} </h2>
      </div>
    </div>
  );
};
