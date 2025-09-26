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
      keywords: (category as any).meta_keywords || `${category.title}, professional training, EuroQuest International, skill development, ${category.title.toLowerCase()}, training courses, professional development, career advancement`,
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
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
        siteName: "EuroQuest International",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: category.meta_title || category.title,
        description: category.meta_description || category.description?.replace(/<[^>]*>/g, ''),
        images: [category.image || "/assets/images/hero-about.webp"],
        creator: "@euroquestintl",
        site: "@euroquestintl",
      },
      alternates: {
        canonical: category.canonical || `https://euroqst.com/training-courses/${category.slug}`,
      },
      category: "Education",
      classification: "Training Courses",
      other: {
        "geo.region": "AE",
        "geo.placename": "United Arab Emirates",
        "geo.position": "25.2048;55.2708",
        "ICBM": "25.2048, 55.2708",
        "DC.title": category.title,
        "DC.creator": "EuroQuest International",
        "DC.subject": category.title,
        "DC.description": category.meta_description || category.description?.replace(/<[^>]*>/g, ''),
        "DC.publisher": "EuroQuest International",
        "DC.contributor": "EuroQuest International",
        "DC.date": new Date().toISOString(),
        "DC.type": "Text",
        "DC.format": "text/html",
        "DC.identifier": `https://euroqst.com/training-courses/${category.slug}`,
        "DC.source": "EuroQuest International",
        "DC.language": "en",
        "DC.relation": "https://euroqst.com",
        "DC.coverage": "Global",
        "DC.rights": "© EuroQuest International",
      },
    };
  } catch (error) {
    console.error("Error generating metadata for category page:", error);
    
    // Fallback metadata
    return {
      title: "Training Category | EuroQuest International Professional Development",
      description: "Professional training courses by EuroQuest International. Enhance your skills with our expert-led programs designed for career advancement and professional growth.",
      keywords: "professional training, courses, EuroQuest International, skill development, career advancement, training courses, professional development",
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: "Training Category | EuroQuest International Professional Development",
        description: "Professional training courses by EuroQuest International. Enhance your skills with our expert-led programs designed for career advancement and professional growth.",
        images: [
          {
            url: "/assets/images/hero-about.webp",
            width: 1200,
            height: 630,
            alt: "EuroQuest International Training Courses",
          },
        ],
        type: "website",
        url: "https://euroqst.com/training-courses",
        siteName: "EuroQuest International",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Training Category | EuroQuest International Professional Development",
        description: "Professional training courses by EuroQuest International. Enhance your skills with our expert-led programs designed for career advancement and professional growth.",
        images: ["/assets/images/hero-about.webp"],
        creator: "@euroquestintl",
        site: "@euroquestintl",
      },
      alternates: {
        canonical: "https://euroqst.com/training-courses",
      },
      category: "Education",
      classification: "Training Courses",
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
