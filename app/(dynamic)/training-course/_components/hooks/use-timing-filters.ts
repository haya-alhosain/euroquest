"use client";
import { useState, useMemo } from "react";
import { CourseDetailResponse } from "@/services/services";
import { filterTimingsByMonth, sortTimings } from "../utils/data-transformers";

interface UseTimingFiltersProps {
  timings: CourseDetailResponse["timings"];
}

export const useTimingFilters = ({ timings }: UseTimingFiltersProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "price">("date");

  const filteredTimings = useMemo(() => {
    const filtered = filterTimingsByMonth(timings, selectedMonth);
    return sortTimings(filtered, sortBy);
  }, [timings, selectedMonth, sortBy]);

  const handleMonthChange = (month: string | null) => {
    setSelectedMonth(month);
  };

  const handleSortChange = (sort: "date" | "price") => {
    setSortBy(sort);
  };

  const resetFilters = () => {
    setSelectedMonth(null);
    setSortBy("date");
  };

  return {
    selectedMonth,
    sortBy,
    filteredTimings,
    handleMonthChange,
    handleSortChange,
    resetFilters,
  };
};
