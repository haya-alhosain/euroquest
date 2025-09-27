import { Metadata } from "next";
import { getCourseDetails } from "@/services/services";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import HeroBanner from "@/components/shared/hero-banner";
import Container from "@/components/shared/container";
import CourseContent from "../_components/course-content";
import CourseTimings from "../_components/course-timings";
import Schema from "@/components/shared/schema";


// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}): Promise<Metadata> {
  try {
    const { courseSlug } = await params;
    const courseData = await getCourseDetails(courseSlug);
    const { course } = courseData;

    return {
      title:
        course.meta_title ||
        `${course.title} | EuroQuest International Training Course`,
      description:
        course.meta_description ||
        course.description ||
        `Professional training course: ${course.title}. Enhance your skills with EuroQuest International's expert-led program.`,
      keywords:
        course.keywords ||
        `${course.title}, professional training, ${course.category?.title}, EuroQuest International, skill development`,
      openGraph: {
        title: course.meta_title || course.title,
        description: course.meta_description || course.description,
        images: [
          {
            url: course.image || "/assets/images/hero-course.webp",
            width: 1200,
            height: 630,
            alt: course.title,
          },
        ],
        type: "website",
        url:
          course.canonical ||
          `https://euroqst.com/training-course/${course.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: course.meta_title || course.title,
        description: course.meta_description || course.description,
        images: [course.image || "/assets/images/hero-course.webp"],
      },
      alternates: {
        canonical:
          course.canonical ||
          `https://euroqst.com/training-course/${course.slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for course page:", error);

    // Fallback metadata
    return {
      title:
        "Training Course | EuroQuest International Professional Development",
      description:
        "Professional training course by EuroQuest International. Enhance your skills with our expert-led programs designed for career advancement and professional growth.",
      keywords:
        "professional training, course, EuroQuest International, skill development, career advancement",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  // Fetch course details from API
  const { courseSlug } = await params;
  const courseData = await getCourseDetails(courseSlug);
  const { course, timings } = courseData;

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
      <Schema 
        pageType="courses"
        pageTitle={course.meta_title || `${course.title} | EuroQuest International Training Course`}
        pageDescription={course.meta_description || course.description || `Professional training course: ${course.title}. Enhance your skills with EuroQuest International's expert-led program.`}
        pageUrl={course.canonical || `https://euroqst.com/training-course/${course.slug}`}
      />
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

      <Container>
        <CourseTimings course={course} timings={timings} />
        <CourseContent course={course} />
      </Container>
    </>
  );
}
