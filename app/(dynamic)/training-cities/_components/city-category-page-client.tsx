"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useCityCategoryDetails } from "@/services/hooks";
import HeroBanner from "@/components/shared/hero-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home, Search } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import CoursesList from "../../../../components/shared/courses-list";

export default function CityCategoryPageClient() {
  const params = useParams();
  const citySlug = params.citySlug as string;
  const categorySlug = params.categorySlug as string;

  const {
    data: categoryData,
    isLoading
  } = useCityCategoryDetails(citySlug, categorySlug);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!categoryData) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Category Not Found
        </h1>
        <p className="text-gray-600">
          The requested category could not be found in this city.
        </p>
      </div>
    );
  }

  const { city, category, courses, seo } = categoryData;

  // Filter courses based on search
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Breadcrumb configuration
  const breadcrumbs: BreadcrumbItem[] = [
    {
      href: "/",
      label: "",
      icon: <Home size={14} />,
    },
    {
      href: "/training-cities",
      label: "Cities",
    },
    {
      href: `/training-cities/${city.slug}`,
      label: city.title,
    },
    {
      href: `/training-courses/${city.slug}/${category.slug}`,
      label: category.title,
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-course.webp"
        title={seo.h1 || `${category.title} in ${city.title}`}
        description={
          seo.description ||
          `Explore ${category.title} training courses in ${city.title}`
        }
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
        typewriterSpeed={100}
        typewriterDelay={500}
      />

      {/* Category Content Section */}
      <div className="pb-15 pt-0">
        <div className="container mx-auto">
          {/* Course Search */}
          <div className="flex transform -translate-y-7">
            <div className="flex items-center gap-3 max-w-md w-full bg-gradient-to-br from-white to-[#f8f9ff] border-2 border-[#e8eaff] rounded-full px-5 py-4 shadow-[0_8px_32px_rgba(62,94,192,0.12)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(62,94,192,0.2)] hover:-translate-y-0.5 focus-within:shadow-[0_12px_40px_rgba(62,94,192,0.2)] focus-within:-translate-y-0.5">
              <Search
                size={16}
                className="text-[#3E5EC0] transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Search for Course"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-none outline-none w-full text-sm bg-transparent text-gray-800 font-normal placeholder:text-gray-500 placeholder:font-normal"
                aria-label="Search for courses"
              />
            </div>
          </div>

          {/* Courses List */}
          <CoursesList filteredCourses={filteredCourses} />
        </div>
      </div>
    </>
  );
}
