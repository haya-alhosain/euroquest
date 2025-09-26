"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import HeroBanner from "@/components/shared/hero-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home, Search } from "lucide-react";
import CoursesList from "../../../../components/shared/courses-list";
import AdditionalDescription from "@/components/shared/additional-description";
import Container from "@/components/shared/container";
import CategoriesSection from "../../../(home)/_components/categories-section";

interface CityPageProps {
  city: City;
  courses: Course[];
  categories: Category[];
}

export default function CityPage({ city, courses, categories }: CityPageProps) {
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

      <Container className="md:pb-12 pb-10">
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
      </Container>

      <CategoriesSection
        categories={categories}
        citySlug={citySlug}
        title="Categories in"
        highlight={city.title}
      />

      {city && city.additional_description && (
        <AdditionalDescription
          title={city.title}
          additional_description={city.additional_description}
        />
      )}
    </>
  );
}
