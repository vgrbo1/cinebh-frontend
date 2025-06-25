import React from "react";

export const MovieProjectionDetailsSkeleton: React.FC = () => (
  <div className="border-b border-customGray px-24 py-8 mb-4 font-primary text-primary animate-pulse">
    <div className="flex flex-col sm:flex-row gap-8">
      <div className="w-32 h-32 bg-gray-300 rounded-lg" />

      <div className="space-y-4">
        <div className="h-6 w-56 bg-gray-300 rounded" />

        <div className="flex items-center space-x-3">
          <div className="h-4 w-12 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
          <div className="h-4 w-20 bg-gray-300 rounded" />
        </div>
      </div>

      <div className="space-y-3 sm:text-right">
        <div className="h-6 w-40 bg-gray-300 rounded" />
        <div className="h-4 w-48 bg-gray-300 rounded" />
        <div className="h-4 w-52 bg-gray-300 rounded" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>
    </div>
  </div>
);
