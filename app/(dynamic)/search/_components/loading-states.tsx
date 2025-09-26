import LoadingSpinner from "@/components/ui/loading-spinner";

interface LoadingStatesProps {
  loading: boolean;
  children: React.ReactNode;
}

export function LoadingWrapper({ loading, children }: LoadingStatesProps) {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Searching for courses...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function SearchLoadingSkeleton() {
  return (
    <div className="container mx-auto pb-13">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-[1px_1px_17px_0_rgba(62,94,192,0.22)] overflow-hidden animate-pulse"
          >
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
            <div className="flex gap-2 p-3">
              <div className="flex-1 h-6 bg-gray-300 rounded-full"></div>
              <div className="flex-1 h-6 bg-gray-300 rounded-full"></div>
              <div className="flex-1 h-6 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
