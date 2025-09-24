import React, { useState } from "react";
import { CourseDetailResponse } from "@/services/services";
import { useCities } from "@/services/hooks";
import TimingCard from "@/components/cards/timing-card";
import SearchBanner from "@/components/shared/search-banner";
import { FieldConfig } from "@/components/shared/search-banner";

interface CourseTimingsProps {
  course: CourseDetail;
  timings: CourseDetailResponse["timings"];
  onDownload: (timing: Timing, course: Course) => void;
  onRegister: (timing: Timing, course: Course) => void;
  onInquire: (timing: Timing, course: Course) => void;
}

export default function CourseTimings({
  course,
  timings,
  onDownload,
  onRegister,
  onInquire,
}: CourseTimingsProps) {
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "price" | "city">("date");

  // Get cities data for mapping city names
  const { data: cities, isLoading: citiesLoading } = useCities();

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get city name by ID
  const getCityName = (cityId: number) => {
    if (cities && cities.length > 0) {
      const city = cities.find((c) => c.id === cityId);
      return city?.title || `City ${cityId}`;
    }
    if (citiesLoading) {
      return "Loading...";
    }
    return `City ${cityId}`;
  };

  // Convert CourseDetailResponse timings to Timing type for TimingCard
  const convertToTimingType = (
    timing: CourseDetailResponse["timings"][0]
  ): Timing => {
    const cityName = getCityName(timing.city_id);
    return {
      id: timing.id,
      start_date: timing.start_date,
      end_date: timing.end_date,
      fees: parseFloat(timing.fees),
      city: {
        id: timing.city_id,
        title: cityName,
        slug: cityName.toLowerCase().replace(/\s+/g, "-"),
        image: "",
      },
    };
  };

  // Convert CourseDetail to Course type for TimingCard
  const convertToCourseType = (courseDetail: CourseDetail): Course => {
    return {
      id: courseDetail.id,
      slug: courseDetail.slug,
      title: courseDetail.title,
      code: courseDetail.code,
      h1: courseDetail.h1,
      description: courseDetail.description,
      content: courseDetail.content,
      meta_title: courseDetail.meta_title,
      meta_description: courseDetail.meta_description,
      canonical: courseDetail.canonical,
      category: courseDetail.category
        ? {
            ...courseDetail.category,
            courses_count: 0, // Default value since it's not available in CourseDetail
            icon: "", // Add missing icon property with default value
          }
        : undefined,
    };
  };

  // Filter and sort timings
  const filteredTimings = timings
    .filter((timing) => {
      // Filter by city
      if (selectedCity && timing.city_id !== selectedCity) {
        return false;
      }

      // Filter by month
      if (selectedMonth) {
        const startDate = new Date(timing.start_date);
        const endDate = new Date(timing.end_date);
        const monthNames = [
          "january",
          "february",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "september",
          "october",
          "november",
          "december",
        ];
        const selectedMonthIndex = monthNames.indexOf(
          selectedMonth.toLowerCase()
        );

        if (selectedMonthIndex !== -1) {
          const startMonth = startDate.getMonth();
          const endMonth = endDate.getMonth();

          // Check if the selected month falls within the course date range
          let monthInRange = false;
          if (startDate.getFullYear() === endDate.getFullYear()) {
            // Same year
            monthInRange =
              selectedMonthIndex >= startMonth &&
              selectedMonthIndex <= endMonth;
          } else {
            // Different years - course spans across years
            monthInRange =
              selectedMonthIndex >= startMonth ||
              selectedMonthIndex <= endMonth;
          }

          if (!monthInRange) {
            return false;
          }
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
          );
        case "price":
          return parseFloat(a.fees) - parseFloat(b.fees);
        case "city":
          return getCityName(a.city_id).localeCompare(getCityName(b.city_id));
        default:
          return 0;
      }
    });

  // Get unique cities from timings
  const uniqueCities = Array.from(
    new Set(timings.map((timing) => timing.city_id))
  )
    .map((cityId) => ({
      id: cityId,
      name: getCityName(cityId),
    }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort cities alphabetically

  // Get unique months from timings
  const getUniqueMonths = () => {
    const monthsSet = new Set<string>();

    timings.forEach((timing) => {
      const startDate = new Date(timing.start_date);
      const endDate = new Date(timing.end_date);

      // Add all months between start and end date
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const monthName = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        monthsSet.add(`${monthName} - ${year}`);

        // Move to next month
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    });

    return Array.from(monthsSet)
      .sort()
      .map((month, index) => ({
        id: month.toLowerCase().split(" - ")[0],
        title: month,
        value: month.toLowerCase().split(" - ")[0],
      }));
  };

  const uniqueMonths = getUniqueMonths();

  // Handler functions for TimingCard - these will be passed from parent

  // SearchBanner configuration
  const searchFields: FieldConfig[] = [
    {
      name: "city_id",
      type: "select",
      placeholder: "Select City",
      options: uniqueCities.map((city) => ({
        id: city.id,
        title: city.name,
        value: city.id.toString(),
      })),
      required: false,
    },
    {
      name: "month",
      type: "select",
      placeholder: "Select Month",
      options: uniqueMonths.map((month) => ({
        id: month.id,
        title: month.title,
        value: month.value,
      })),
      required: false,
    },
  ];

  // Handle search form submission
  const handleSearchSubmit = (data: Record<string, string>) => {
    const cityId = data.city_id ? parseInt(data.city_id) : null;
    const month = data.month || null;

    setSelectedCity(cityId);
    setSelectedMonth(month);
  };

  // Handle search form reset
  const handleSearchReset = () => {
    setSelectedCity(null);
    setSelectedMonth(null);
    setSortBy("date");
  };

  // Initial values for SearchBanner
  const searchInitialValues = {
    city_id: selectedCity?.toString() || "",
    month: selectedMonth || "",
  };

  return (
    <div>
      <div className="w-full max-w-[500px] mx-auto">
        {/* Search Banner */}
        <SearchBanner
          fields={searchFields}
          onSubmit={handleSearchSubmit}
          onReset={handleSearchReset}
          initialValues={searchInitialValues}
          resetBehavior="local"
        />
      </div>
      <div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
          {filteredTimings.length > 0 ? (
            filteredTimings.map((timing) => (
              <TimingCard
                key={timing.id}
                timing={convertToTimingType(timing)}
                course={convertToCourseType(course)}
                onDownload={onDownload}
                onRegister={onRegister}
                onInquire={onInquire}
                formatDate={formatDate}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <i className="fas fa-search text-4xl mb-4 opacity-50"></i>
              <h3 className="mb-2">No timings found</h3>
              <p>Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
        <div className="noResultMessage"></div>
      </div>
    </div>
  );
}
