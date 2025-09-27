import { getCategoryDetails } from "@/services/services";
import CategoryPage from "../_components/category-page";
import { Metadata } from "next";
import Schema from "@/components/shared/schema";

// Generate metadata dynamically for category pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const categoryData = await getCategoryDetails(slug);
    const { category } = categoryData;

    // Generate dynamic metadata based on category data
    const title = `${category.title} Training Courses | EuroQuest International`;
    const description =
      category.description ||
      `Professional ${category.title} training courses at EuroQuest International. Expert-led programs designed to enhance your skills and career prospects.`;
    const keywords = `${
      category.title
    }, training courses, professional development, ${category.title.toLowerCase()} certification, EuroQuest International`;

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        images: [
          {
            url: category.image || "/assets/images/hero-categories.webp",
            width: 1200,
            height: 630,
            alt: `${category.title} Training Courses`,
          },
        ],
        type: "website",
        url: `/training-courses/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [category.image || "/assets/images/hero-categories.webp"],
      },
      alternates: {
        canonical: `/training-courses/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for category page:", error);

    // Fallback metadata
    return {
      title: "Training Courses | EuroQuest International",
      description:
        "Professional training courses at EuroQuest International. Expert-led programs designed to enhance your skills and career prospects.",
      keywords:
        "training courses, professional development, certification, EuroQuest International",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryData = await getCategoryDetails(slug);
  const { category, courses } = categoryData;

  return (
    <>
      <Schema 
        pageType="courses"
        pageTitle={`${category.title} Training Courses | EuroQuest International`}
        pageDescription={category.description || `Professional ${category.title} training courses at EuroQuest International. Expert-led programs designed to enhance your skills and career prospects.`}
        pageUrl={`https://euroqst.com/training-courses/${slug}`}
      />
      <CategoryPage category={category} courses={courses} slug={slug} />
    </>
  );
}
