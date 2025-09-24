import { Metadata } from "next";
import { getCityCategoryDetails } from "@/services/services";
import CityCategoryPageClient from "../../_components/city-category-page-client";

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string; categorySlug: string }>;
}): Promise<Metadata> {
  try {
    const { citySlug, categorySlug } = await params;
    const categoryData = await getCityCategoryDetails(citySlug, categorySlug);
    const { city, category, seo } = categoryData;

    return {
      title: seo.meta_title || `${category.title} Training Courses in ${city.title} | EuroQuest International`,
      description: seo.meta_description || `Professional ${category.title} training courses in ${city.title} by EuroQuest International. Enhance your skills with our expert-led programs.`,
      keywords: seo.meta_keywords || `${category.title}, ${city.title}, training courses, professional training, EuroQuest International, skill development, ${city.title.toLowerCase()} ${category.title.toLowerCase()}`,
      openGraph: {
        title: seo.meta_title || `${category.title} Training Courses in ${city.title}`,
        description: seo.meta_description || `Professional ${category.title} training courses in ${city.title}`,
        images: [
          {
            url: "/assets/images/hero-course.webp",
            width: 1200,
            height: 630,
            alt: `${category.title} training courses in ${city.title}`,
          },
        ],
        type: "website",
        url: seo.canonical || `https://euroqst.com/training-courses/${city.slug}/${category.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: seo.meta_title || `${category.title} Training Courses in ${city.title}`,
        description: seo.meta_description || `Professional ${category.title} training courses in ${city.title}`,
        images: ["/assets/images/hero-course.webp"],
      },
      alternates: {
        canonical: seo.canonical || `https://euroqst.com/training-courses/${city.slug}/${category.slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for city category page:", error);
    
    // Fallback metadata
    return {
      title: "Training Courses | EuroQuest International Professional Development",
      description: "Professional training courses by EuroQuest International. Enhance your skills with our expert-led programs designed for career advancement and professional growth.",
      keywords: "professional training, courses, EuroQuest International, skill development, career advancement",
    };
  }
}

export default async function CityCategoryPage({
  params,
}: {
  params: Promise<{ citySlug: string; categorySlug: string }>;
}) {
  return <CityCategoryPageClient />;
}
