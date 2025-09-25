import { Metadata } from "next";
import { getCategoryDetails } from "@/services/services";
import CategoryPage from "../_components/category-page";

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const categoryData = await getCategoryDetails(slug);
    const { category } = categoryData;

    return {
      title: category.meta_title || `${category.title} | EuroQuest International Training Courses`,
      description: category.meta_description || category.description?.replace(/<[^>]*>/g, '') || `Professional ${category.title} training courses by EuroQuest International. Enhance your skills with our expert-led programs.`,
      keywords: (category as any).meta_keywords || `${category.title}, professional training, EuroQuest International, skill development, ${category.title.toLowerCase()}`,
      openGraph: {
        title: category.meta_title || category.title,
        description: category.meta_description || category.description?.replace(/<[^>]*>/g, ''),
        images: [
          {
            url: category.image || "/assets/images/hero-about.webp",
            width: 1200,
            height: 630,
            alt: category.title,
          },
        ],
        type: "website",
        url: category.canonical || `https://euroqst.com/training-courses/${category.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: category.meta_title || category.title,
        description: category.meta_description || category.description?.replace(/<[^>]*>/g, ''),
        images: [category.image || "/assets/images/hero-about.webp"],
      },
      alternates: {
        canonical: category.canonical || `https://euroqst.com/training-courses/${category.slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for category page:", error);
    
    // Fallback metadata
    return {
      title: "Training Category | EuroQuest International Professional Development",
      description: "Professional training courses by EuroQuest International. Enhance your skills with our expert-led programs designed for career advancement and professional growth.",
      keywords: "professional training, courses, EuroQuest International, skill development, career advancement",
    };
  }
}

export default async function CoursesCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryData = await getCategoryDetails(slug);
  const { category, courses } = categoryData;

  return <CategoryPage category={category} courses={courses} slug={slug} />;
}
