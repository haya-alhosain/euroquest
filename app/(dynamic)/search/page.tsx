"use client";
import React from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import SearchBanner from "@/components/shared/search-banner";
import SearchHero from "./_components/search-hero";
import SearchResults from "./_components/search-results";
import SearchPopups from "./_components/search-popups";
import SearchSummary from "./_components/search-summary";
import { useSearch } from "./_components/hooks/use-search";
import Schema from "@/components/shared/schema";

export default function SearchPage() {
  // Use custom hooks for search logic
  const {
    searchResults,
    resultType,
    loading,
    error,
    totalCount,
    appliedFilters,
    searchBannerValues,
    cacheStatus,
    retry,
    isRetrying,
  } = useSearch();

  // Handle error state with retry functionality
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Search Error
          </h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={retry}
            disabled={isRetrying}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? "Retrying..." : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Schema 
        pageType="search"
        pageTitle="Search Training Courses | EuroQuest International"
        pageDescription="Search for professional training courses, categories, and cities at EuroQuest International. Find the perfect training program for your career development."
        pageUrl="https://euroqst.com/search"
      />
      {/* Popups */}
      <SearchPopups />

      {/* Hero Banner */}
      <SearchHero totalCount={totalCount} resultType={resultType} />

      {/* Search Banner */}
      <div className="container mx-auto -mt-9 relative z-10">
        <SearchBanner
          initialValues={searchBannerValues}
          searchRoute="/search"
          resetBehavior="navigate"
        />
      </div>

      <div className="container mx-auto pb-13">
        {/* Search Summary */}
        <SearchSummary
          totalCount={totalCount}
          resultType={resultType}
          appliedFilters={appliedFilters}
          cacheStatus={cacheStatus}
        />
        
        {/* Search Results */}
        <SearchResults
          results={searchResults}
          resultType={resultType}
        />
      </div>
    </>
  );
}
