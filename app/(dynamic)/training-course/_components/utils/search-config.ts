import { FieldConfig } from "@/components/shared/search-banner";
import { getUniqueMonths } from "./data-transformers";
import { CourseDetailResponse } from "@/services/services";

/**
 * Create search fields configuration for SearchBanner
 */
export const createSearchFields = (timings: CourseDetailResponse["timings"]): FieldConfig[] => {
  const uniqueMonths = getUniqueMonths(timings);
  
  return [
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
};

/**
 * Create custom actions for SearchBanner
 */
export const createCustomActions = (courseSlug: string) => [
  {
    type: 'button' as const,
    label: 'Back to Course Page',
    href: `/training-course/${courseSlug}`,
    variant: 'secondary' as const,
    className: 'bg-[#3E5EC0] hover:bg-[#3E5EC0] text-white cursor-pointer'
  }
];
