import { Metadata } from "next";
import { getCityCourseDetails } from "@/services/services";
import CityCourseDetailClient from "../../_components/city-course-detail-client";

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; citySlug: string }>;
}): Promise<Metadata> {
  try {
    const { courseSlug, citySlug } = await params;
    const courseData = await getCityCourseDetails(courseSlug, citySlug);
    const { course, city, seo } = courseData;

    return {
      title: seo.meta_title || `${course.title} in ${city.title} | EuroQuest International Training`,
      description: seo.meta_description || course.description || `Professional training course: ${course.title} in ${city.title}. Enhance your skills with EuroQuest International's expert-led program.`,
      keywords: seo.meta_keywords || `${course.title}, ${city.title}, professional training, ${course.category?.title}, EuroQuest International, skill development, ${city.title.toLowerCase()} courses`,
      openGraph: {
        title: seo.meta_title || `${course.title} in ${city.title}`,
        description: seo.meta_description || course.description,
        images: [
          {
            url: course.image || "/assets/images/hero-course.webp",
            width: 1200,
            height: 630,
            alt: course.image_alt || course.image_title || `${course.title} training course in ${city.title}`,
          },
        ],
        type: "website",
        url: seo.canonical || `https://euroqst.com/training-course/${course.slug}/${city.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: seo.meta_title || `${course.title} in ${city.title}`,
        description: seo.meta_description || course.description,
        images: [course.image || "/assets/images/hero-course.webp"],
      },
      alternates: {
        canonical: seo.canonical || `https://euroqst.com/training-course/${course.slug}/${city.slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for city course page:", error);
    
    // Fallback metadata
    return {
      title: "Training Course | EuroQuest International Professional Development",
      description: "Professional training course by EuroQuest International. Enhance your skills with our expert-led programs designed for career advancement and professional growth.",
      keywords: "professional training, course, EuroQuest International, skill development, career advancement",
    };
  }
}

export default async function CityCourseDetailPage({
  params,
}: {
  params: Promise<{ courseSlug: string; citySlug: string }>;
}) {
  return <CityCourseDetailClient />;
}
