"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import HeroBanner from "@/components/shared/hero-banner";
import { BreadcrumbItem } from "@/components/shared/breadcrumb";
import { Home, Search } from "lucide-react";
import SectionTitle from "@/components/shared/section-title";
import CoursesList from "../../../../components/sections/courses-list";
import CityCategoriesGrid from "./city-categories-grid";

interface CityPageClientProps {
  city: City;
  courses: Course[];
  categories: Category[];
}

export default function CityPageClient({
  city,
  courses,
  categories,
}: CityPageClientProps) {
  const params = useParams();
  const citySlug = params.citySlug as string;

  const [searchTerm, setSearchTerm] = useState("");

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
      href: `/training-cities/${city?.slug}`,
      label: city?.title,
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-city.webp"
        title={city.h1 || ""}
        description={city.description || ""}
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
        typewriterSpeed={100}
        typewriterDelay={500}
      />

      {/* City Content Section */}
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

          <CoursesList filteredCourses={filteredCourses} citySlug={citySlug} />
        </div>
      </div>

      {/* Categories Section */}
      <section className="bg-[#F2F8FF] py-8 relative">
        <img
          src="/assets/images/categories-shape.svg"
          alt=""
          className="absolute -left-25 top-0 w-62 h-62 hidden md:block"
        />
        <div className="container mx-auto">
          <div className="mb-10">
            <SectionTitle title="Categories in" highlight={city.title} />
          </div>

          {/* Categories Grid */}
          <CityCategoriesGrid categories={categories} citySlug={citySlug} />
        </div>
      </section>
    </>
  );
}
