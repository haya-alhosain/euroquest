"use client";
import { CourseDetailResponse } from "@/services/services";
import { useCities } from "@/services/hooks";
import { useTimingFilters } from "./hooks/use-timing-filters";
import { usePopupHandlers } from "./hooks/use-popup-handlers";
import SearchSection from "./shared/search-section";
import TimingGrid from "./shared/timing-grid";
import { createSearchFields, createCustomActions } from "./utils/search-config";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface CourseTimingsProps {
  course: CourseDetail;
  timings: CourseDetailResponse["timings"];
}

export default function CourseTimings({ course, timings }: CourseTimingsProps) {
  const { data: cities, isLoading: citiesLoading } = useCities();
  const { filteredTimings, selectedMonth, handleMonthChange, resetFilters } =
    useTimingFilters({ timings });
  const { handleDownload, handleRegister, handleInquire } = usePopupHandlers();

  // Create search configuration
  const searchFields = createSearchFields(timings);
  const customActions = createCustomActions(course.slug);

  // Handle search form submission
  const handleSearchSubmit = (data: Record<string, string>) => {
    const month = data.month || null;
    handleMonthChange(month);
  };

  // Handle search form reset
  const handleSearchReset = () => {
    resetFilters();
  };

  // Initial values for SearchBanner
  const searchInitialValues = {
    month: selectedMonth || "",
  };

  if (citiesLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div>
      <SearchSection
        fields={searchFields}
        actions={customActions}
        onSubmit={handleSearchSubmit}
        onReset={handleSearchReset}
        initialValues={searchInitialValues}
        resetBehavior="local"
      />

      <TimingGrid
        timings={filteredTimings}
        course={course}
        cities={cities || []}
        onDownload={handleDownload}
        onRegister={handleRegister}
        onInquire={handleInquire}
      />
    </div>
  );
}
