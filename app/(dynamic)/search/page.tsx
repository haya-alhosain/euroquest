"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { searchTimings } from "@/services/services";
import LoadingSpinner from "@/components/shared/loading-spinner";
import HeroBanner from "@/components/shared/hero-banner";
import SearchBanner from "@/components/shared/search-banner";
import SearchGrid from "@/components/shared/search-grid";
import { Home } from "lucide-react";
import RegisterPopup from "@/components/popups/register";
import InquirePopup from "@/components/popups/inquire";
import DownloadPopup from "@/components/popups/download";
import CoursesList from "../../../components/sections/courses-list";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<
    SearchTiming[] | SearchCourse[]
  >([]);
  const [resultType, setResultType] = useState<"timings" | "courses">(
    "timings"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState<SearchFilters>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchBannerValues, setSearchBannerValues] = useState<
    Record<string, string>
  >({});
  const [cacheStatus, setCacheStatus] = useState<"hit" | "miss" | null>(null);

  // Popup states
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isInquireOpen, setIsInquireOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState<SearchTiming | null>(
    null
  );

  useEffect(() => {
    const performSearch = async () => {
      try {
        setLoading(true);
        setError(null);

        // Extract search parameters from URL
        const filters: SearchFilters = {
          keyword: searchParams.get("keyword") || undefined,
          city_slug: searchParams.get("city_slug") || undefined,
          category_slug: searchParams.get("category_slug") || undefined,
          month: searchParams.get("month") || undefined,
          duration: searchParams.get("duration") || undefined,
        };

        setAppliedFilters(filters);

        // Convert filters to search banner values
        const bannerValues: Record<string, string> = {};

        // Category and city slugs stay the same
        if (filters.category_slug) {
          bannerValues.category_slug = filters.category_slug;
        }

        if (filters.city_slug) {
          bannerValues.city_slug = filters.city_slug;
        }

        // Convert month from YYYY-MM to MM
        if (filters.month) {
          const monthValue = filters.month.split("-")[1]; // Extract MM from YYYY-MM
          bannerValues.month = monthValue;
        }

        // Duration stays the same
        if (filters.duration) {
          bannerValues.duration = filters.duration;
        }

        setSearchBannerValues(bannerValues);

        // Perform search
        const startTime = performance.now();
        const response = await searchTimings(filters);
        const endTime = performance.now();

        setSearchResults(response.data);
        setTotalCount(response.count);
        setResultType(response.type as "timings" | "courses");
      } catch (err) {
        console.error("Search error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while searching"
        );
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const breadcrumbs = [
    { label: "", href: "/", icon: <Home size={16} /> },
    { label: "Search Results", href: "#" },
  ];

  // Popup handlers
  const handleRegisterClick = (timing: SearchTiming) => {
    setSelectedTiming(timing);
    setIsRegisterOpen(true);
  };

  const handleInquireClick = (timing: SearchTiming) => {
    setSelectedTiming(timing);
    setIsInquireOpen(true);
  };

  const handleDownloadClick = (timing: SearchTiming) => {
    setSelectedTiming(timing);
    setIsDownloadOpen(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* Popups */}
      {selectedTiming && (
        <>
          <RegisterPopup
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            courseTitle={selectedTiming.course_title}
            timingId={selectedTiming.id.toString()}
          />
          <InquirePopup
            isOpen={isInquireOpen}
            onClose={() => setIsInquireOpen(false)}
            courseTitle={selectedTiming.course_title}
            timingId={selectedTiming.id.toString()}
          />
          <DownloadPopup
            isOpen={isDownloadOpen}
            onClose={() => setIsDownloadOpen(false)}
            courseTitle={selectedTiming.course_title}
            timingId={selectedTiming.id.toString()}
          />
        </>
      )}

      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-about.webp"
        title="Search Results"
        description={`Found ${totalCount} ${
          resultType === "timings" ? "training timing" : "training course"
        }${totalCount !== 1 ? "s" : ""}`}
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
      />

      {/* Search Banner */}
      <div className="container mx-auto -mt-9 relative z-10">
        <SearchBanner
          initialValues={searchBannerValues}
          searchRoute="/search"
          resetBehavior="navigate"
        />
      </div>

      <div className="container mx-auto pb-13">
        {/* Results Grid */}
        {searchResults.length > 0 ? (
          resultType === "timings" ? (
            <SearchGrid
              items={searchResults as SearchTiming[]}
              formatDate={formatDate}
              onRegisterClick={handleRegisterClick}
              onInquireClick={handleInquireClick}
              onDownloadClick={handleDownloadClick}
            />
          ) : (
            <CoursesList filteredCourses={searchResults as SearchCourse[]} />
          )
        ) : (
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-6">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any training courses matching your search
              criteria.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
