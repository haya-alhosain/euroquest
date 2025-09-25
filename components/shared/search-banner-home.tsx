"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, RotateCcw } from "lucide-react";
import { orderedMonths, durationOptions } from "@/constants";
import { useCategories, useCities } from "@/services/hooks";
import Input from "./input";
import Select from "./select";
import Button from "./button";

interface SearchFormData {
  keyword: string;
  category_id: string;
  city_id: string;
  month: string;
  duration: string;
}

interface WarningPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WarningPopup: React.FC<WarningPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-[9999] animate-in">
      <div className="bg-white rounded-xl max-w-md w-[90%] p-5 text-center shadow-[0_8px_20px_rgba(0,0,0,0.2)] border-t-[6px] border-t-[#314ea9]">
        <h3 className="m-0 mb-2.5 text-[#314ea9] text-xl font-semibold">
          ⚠ Warning
        </h3>
        <p className="m-0 mb-5 text-[15px] text-[#444]">
          Please add a keyword, topic, venue, or month in addition to duration.
        </p>
        <Button
          onClick={onClose}
          className="bg-[#314ea9] hover:bg-[#243a7d] text-white border-none py-2.5 px-[18px] rounded-lg cursor-pointer text-sm transition-all duration-200"
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default function SearchBannerHome() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState<SearchFormData>({
    keyword: "",
    category_id: "",
    city_id: "",
    month: "",
    duration: "",
  });

  // Fetch categories and cities from API
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: cities, isLoading: citiesLoading } = useCities();

  // Use static months - no dynamic year calculation to avoid hydration mismatch
  const monthOptions = orderedMonths.map((month) => ({
    value: month.value,
    label: month.label,
  }));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      keyword: "",
      category_id: "",
      city_id: "",
      month: "",
      duration: "",
    });
  };

  const validateForm = (): boolean => {
    const { keyword, category_id, city_id, month, duration } = formData;

    const hasKeyword = keyword.trim().length > 0;
    const hasCategory = category_id !== "";
    const hasCity = city_id !== "";
    const hasMonth = month !== "";
    const hasDuration = duration !== "";

    // Prevent submission if nothing is filled
    if (!hasKeyword && !hasCategory && !hasCity && !hasMonth && !hasDuration) {
      return false;
    }

    // Prevent if only duration is selected
    if (hasDuration && !hasKeyword && !hasCategory && !hasCity && !hasMonth) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowWarning(true);
      return;
    }

    // Build search query with proper parameter mapping
    const searchParams = new URLSearchParams();

    // Map form data to API parameters
    if (formData.keyword) {
      searchParams.append("keyword", formData.keyword);
    }

    if (formData.category_id) {
      // Find category slug from category_id
      const category = categories?.find(
        (cat) => cat.id.toString() === formData.category_id
      );
      if (category) {
        searchParams.append("category_slug", category.slug);
      }
    }

    if (formData.city_id) {
      // Find city slug from city_id
      const city = cities?.find(
        (city) => city.id.toString() === formData.city_id
      );
      if (city) {
        searchParams.append("city_slug", city.slug);
      }
    }

    if (formData.month) {
      // Convert month to YYYY-MM format (assuming current year)
      const currentYear = new Date().getFullYear();
      const monthFormatted = `${currentYear}-${formData.month.padStart(
        2,
        "0"
      )}`;
      searchParams.append("month", monthFormatted);
    }

    if (formData.duration) {
      searchParams.append("duration", formData.duration);
    }

    // Navigate to search page
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <>
      <WarningPopup
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
      />
      <div className="w-full mx-auto max-w-5xl md:mt-8 mt-5 bg-white rounded-[20px] md:rounded-[15px] shadow-[1px_1px_37px_0_rgb(62_94_192_/35%)] md:p-[20px_16px] p-4 pb-9 border border-gray-100 transform translate-y-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex items-start justify-between gap-2.5 flex-col"
        >
          {/* Top Row */}
          <div className="flex justify-between gap-2 w-full flex-col md:flex-row">
            {/* Keyword Input */}
            <div className="flex-1 max-w-full md:max-w-[50%]">
              <Input
                name="keyword"
                type="text"
                placeholder="Search By Keyword .."
                value={formData.keyword}
                onChange={handleInputChange}
                inputSize="lg"
                className="h-[45px] text-sm"
                suppressHydrationWarning={true}
              />
            </div>

            {/* Category Select */}
            <div className="flex-1">
              <Select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                placeholder="Select Category"
                selectSize="lg"
                className="h-[45px] text-sm min-w-[calc(100%/6)]"
                options={
                  categories?.map((cat) => ({
                    value: cat.id,
                    label: cat.title,
                  })) || []
                }
                suppressHydrationWarning={true}
              />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between gap-2 w-full flex-col md:flex-row">
            {/* City Select */}
            <div className="flex-1">
              <Select
                name="city_id"
                value={formData.city_id}
                onChange={handleInputChange}
                placeholder="Select City"
                selectSize="lg"
                className="h-[45px] text-sm min-w-[calc(100%/6)]"
                options={
                  cities?.map((city) => ({
                    value: city.id,
                    label: city.title,
                  })) || []
                }
                suppressHydrationWarning={true}
              />
            </div>

            {/* Month Select */}
            <div className="flex-1">
              <Select
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                placeholder="Select Month"
                selectSize="lg"
                className="h-[45px] text-sm min-w-[calc(100%/6)]"
                options={monthOptions}
                suppressHydrationWarning={true}
              />
            </div>

            {/* Duration Select */}
            <div className="flex-1">
              <Select
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="Select Duration"
                selectSize="lg"
                className="h-[45px] text-sm min-w-[calc(100%/6)]"
                options={durationOptions.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                suppressHydrationWarning={true}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 md:static absolute md:left-auto left-1/2 md:bottom-auto -bottom-6 -translate-x-1/2 md:translate-x-0">
              {/* Reset Button */}
              <Button
                type="button"
                onClick={handleReset}
                variant="secondary"
                size="lg"
                icon={<RotateCcw size={16} />}
                iconPosition="right"
                className="h-[45px] px-5 text-sm font-semibold min-w-fit"
                title="Reset"
                suppressHydrationWarning={true}
              >
                Clear
              </Button>

              {/* Search Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<Search size={16} />}
                iconPosition="right"
                className="h-[45px] px-5 text-sm font-semibold bg-[#3E5EC0] hover:bg-[#314ea9] text-white rounded-[60px] min-w-fit flex items-center justify-center gap-2 border-none transition-all duration-200"
                title="Search"
                suppressHydrationWarning={true}
              >
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
