import { Metadata } from "next";
import { getCourseDetails } from "@/services/services";
import CourseDetailClient from "../_components/course-detail-client";

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

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  // Fetch course details from API
  const { courseSlug } = await params;
  const courseData = await getCourseDetails(courseSlug);
  const { course, timings } = courseData;

  return <CourseDetailClient course={course} timings={timings} />;
}
