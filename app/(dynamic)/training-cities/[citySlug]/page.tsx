import { Metadata } from "next";
import { getCityDetails } from "@/services/services";
import CityPage from "../_components/city-page";


// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  try {
    const { citySlug } = await params;
    const cityData = await getCityDetails(citySlug);
    const { city } = cityData;

    return {
      title: city.meta_title || `${city.title} Training Courses | EuroQuest International`,
      description: city.meta_description || city.description?.replace(/<[^>]*>/g, '') || `Professional training courses in ${city.title} by EuroQuest International. Enhance your skills with our expert-led programs.`,
      keywords: city.meta_keywords || `${city.title}, training courses ${city.title}, professional training, EuroQuest International, skill development, ${city.title.toLowerCase()} courses`,
      openGraph: {
        title: city.meta_title || city.h1 || `Training Courses in ${city.title}`,
        description: city.meta_description || city.description?.replace(/<[^>]*>/g, ''),
        images: [
          {
            url: city.image || "/assets/images/hero-city.webp",
            width: 1200,
            height: 630,
            alt: city.image_alt || city.image_title || `Training courses in ${city.title}`,
          },
        ],
        type: "website",
        url: city.canonical || `https://euroqst.com/training-cities/${city.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: city.meta_title || city.h1 || `Training Courses in ${city.title}`,
        description: city.meta_description || city.description?.replace(/<[^>]*>/g, ''),
        images: [city.image || "/assets/images/hero-city.webp"],
      },
      alternates: {
        canonical: city.canonical || `https://euroqst.com/training-cities/${city.slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for city page:", error);
    
    // Fallback metadata
    return {
      title: "Training Courses | EuroQuest International Professional Development",
      description: "Professional training courses by EuroQuest International. Enhance your skills with our expert-led programs designed for career advancement and professional growth.",
      keywords: "professional training, courses, EuroQuest International, skill development, career advancement",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const cityData = await getCityDetails(citySlug);
  const { city, courses , categories} = cityData;

  return <CityPage city={city} courses={courses} categories={categories} />;
}
