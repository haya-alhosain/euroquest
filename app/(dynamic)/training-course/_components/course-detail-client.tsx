"use client";
import React, { useState } from "react";
import HeroBanner from "@/components/shared/hero-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import CourseContent from "./course-content";
import CourseTimings from "./course-timings";
import RegisterPopup from "@/components/popups/register";
import InquirePopup from "@/components/popups/inquire";
import DownloadPopup from "@/components/popups/download";

interface CourseDetailClientProps {
  course: any;
  timings: any[];
}

export default function CourseDetailClient({ course, timings }: CourseDetailClientProps) {
  // Popup states
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isInquireOpen, setIsInquireOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState<Timing | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
      href: `/training-courses/${course.category.slug}`,
      label: course.category.title,
    },
    {
      href: `/training-course/${course.slug}`,
      label: course.title,
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage={"/assets/images/hero-course.webp"}
        title={course.h1 || course.title}
        description={course.description || "Loading course details..."}
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
        typewriterSpeed={100}
        typewriterDelay={500}
      />

      <section>
        <div className="container mx-auto">
          {/* Course Timings - First Section */}
          <CourseTimings 
            course={course} 
            timings={timings} 
            onDownload={handleDownload}
            onRegister={handleRegister}
            onInquire={handleInquire}
          />

          {/* Course Content - Second Section */}
          <CourseContent course={course} />
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
