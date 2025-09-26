"use client";
import { useState } from "react";
import HeroBanner from "@/components/shared/hero-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home, Search } from "lucide-react";
import CoursesList from "@/components/shared/courses-list";
import AdditionalDescription from "@/components/shared/additional-description";
import Container from "@/components/shared/container";

interface CategoryPageProps {
  category: any;
  courses: any[];
  slug: string;
}

export default function CategoryPage({
  category,
  courses,
  slug,
}: CategoryPageProps) {
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
      href: "/training-courses",
      label: "categories",
    },
    {
      href: `/training-courses/${category?.slug || slug}`,
      label: category?.title || "Category",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-about.webp"
        title={category?.h1 || "Category"}
        description={category?.description || "Loading category details..."}
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

        {/* Courses List */}
        <CoursesList filteredCourses={filteredCourses} />
      </Container>
      {/* Additional description Section */}
      {category && (
        <AdditionalDescription
          title={category.title}
          additional_description={category.additional_description}
        />
      )}
    </>
  );
}
