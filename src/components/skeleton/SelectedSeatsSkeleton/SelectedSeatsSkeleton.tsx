export const SelectedSeatsSkeleton: React.FC = () => (
  <div className="px-8 py-4 animate-pulse">
    <div className="mx-auto h-5 w-28 bg-gray-300 rounded" />

    <div className="flex justify-between items-end border-b border-customGray pb-1 mt-6">
      <div className="h-4 w-16 bg-gray-300 rounded" />
      <div className="h-4 w-20 bg-gray-300 rounded" />
    </div>

    <div className="flex justify-between items-start pt-2 pb-4">
      <div className="h-8 w-40 bg-gray-300 rounded" />
      <div className="h-8 w-24 bg-gray-300 rounded" />
    </div>
  </div>
);
