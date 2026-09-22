export interface LoadingIndicatorProps {
  isLoading?: boolean;
}

export const LoadingIndicator = ({ isLoading }: LoadingIndicatorProps) => {
  if (isLoading === false) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-50 h-2 w-full border-y border-white bg-black pointer-events-none">
      <div className="absolute top-0 bottom-0 w-2/5 bg-primary animate-loading-bar">
        <span className="sr-only">loading</span>
      </div>
    </div>
  );
};
