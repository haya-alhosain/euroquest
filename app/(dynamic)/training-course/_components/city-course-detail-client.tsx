"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useCityCourseDetails } from "@/services/hooks";
import HeroBanner from "@/components/shared/hero-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import RegisterPopup from "@/components/popups/register";
import InquirePopup from "@/components/popups/inquire";
import DownloadPopup from "@/components/popups/download";
import CourseTimings from "./course-timings";
import CourseContent from "./course-content";

export default function CityCourseDetailClient() {
  const params = useParams();
  const courseSlug = params.courseSlug as string;
  const citySlug = params.citySlug as string;

  // Popup states
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isInquireOpen, setIsInquireOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState<Timing | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const { data: courseData, isLoading, error } = useCityCourseDetails(courseSlug, citySlug);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !courseData) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Course Not Found
        </h1>
        <p className="text-gray-600">The requested course could not be found in this city.</p>
      </div>
    );
  }

  const { course, city, timings, seo } = courseData;

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Popup handlers
  const handleDownload = (timing: Timing, course: Course) => {
    setSelectedTiming(timing);
    setSelectedCourse(course);
    setIsDownloadOpen(true);
  };

  const handleRegister = (timing: Timing, course: Course) => {
    setSelectedTiming(timing);
    setSelectedCourse(course);
    setIsRegisterOpen(true);
  };

  const handleInquire = (timing: Timing, course: Course) => {
    setSelectedTiming(timing);
    setSelectedCourse(course);
    setIsInquireOpen(true);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { href: "/", label: "", icon: <Home size={14} /> },
    { href: "/training-cities", label: "cities" },
    { href: `/training-cities/${city.slug}`, label: city.title },
    { href: `/training-course/${course.slug}/${city.slug}`, label: course.title },
  ];

  return (
    <>
      <HeroBanner
        backgroundImage={"/assets/images/hero-about.webp"}
        title={seo.h1 || course.title}
        description={seo.description || course.description || "Loading course details..."}
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
        typewriterSpeed={100}
        typewriterDelay={500}
      />

      <section>
        <div className="container mx-auto">
          {/* Course Timings - First Section */}
          <div className="mb-12">
            <CourseTimings 
              course={course} 
              timings={timings} 
              onDownload={handleDownload}
              onRegister={handleRegister}
              onInquire={handleInquire}
            />
          </div>

          {/* Course Content - Second Section */}
          <div>
            <CourseContent course={course} />
          </div>
        </div>
      </section>

      {/* Popups */}
      {selectedTiming && selectedCourse && (
        <>
          {/* Register Popup */}
          <RegisterPopup
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            courseTitle={selectedCourse.title}
            timingId={selectedTiming.id?.toString()}
          />

          {/* Inquire Popup */}
          <InquirePopup
            isOpen={isInquireOpen}
            onClose={() => setIsInquireOpen(false)}
            courseTitle={selectedCourse.title}
            timingId={selectedTiming.id?.toString()}
          />

          {/* Download Popup */}
          <DownloadPopup
            isOpen={isDownloadOpen}
            onClose={() => setIsDownloadOpen(false)}
            courseTitle={selectedCourse.title}
            timingId={selectedTiming.id?.toString()}
            course={selectedCourse}
            timing={selectedTiming}
            formatDate={formatDate}
          />
        </>
      )}
    </>
  );
}
