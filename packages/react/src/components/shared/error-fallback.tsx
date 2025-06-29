"use client";
export const ErrorFallback = () => {
  return (
    <div
      className="flex h-full items-center justify-center border border-dashed border-red-400 p-10"
      role="alert"
    >
      <div className="text-danger-500 px-1 text-center">
        <h2 className="text-xl font-bold">{"Some thing went wrong."} </h2>
      </div>
    </div>
  );
};
