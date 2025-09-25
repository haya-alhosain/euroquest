import { Metadata } from "next";
import HeroBanner from "@/components/shared/hero-banner";
import SearchBanner from "@/components/shared/search-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import CategoriesCards from "./_components/categories-cards";
import { getCategories, getSeoData } from "@/services/services";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData('categories');
    const seo = seoData.seo;

    return {
      title: seo.meta_title,
      description: seo.meta_description,
      keywords: seo.meta_keywords,
      openGraph: {
        title: seo.meta_title,
        description: seo.meta_description,
        images: [
          {
            url: seo.meta_image,
            width: 1200,
            height: 630,
            alt: seo.meta_title,
          },
        ],
        type: 'website',
        url: seo.canonical,
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.meta_title,
        description: seo.meta_description,
        images: [seo.meta_image],
      },
      alternates: {
        canonical: seo.canonical,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for categories page:', error);
    
    // Fallback metadata
    return {
      title: "Training Categories | EuroQuest International Professional Courses",
      description: "Explore all training categories at EuroQuest International. Browse professional courses in management, HR, IT, finance, and more across different fields.",
      keywords: "training categories, professional courses, management training, HR courses, IT training, finance courses, business development",
    };
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  // Breadcrumb configuration
  const breadcrumbs: BreadcrumbItem[] = [
    {
      href: "/",
      label: "",
      icon: <Home size={14} />,
    },
    {
      href: "/training-courses",
      label: "Categories",
    },
  ];

  return (
    <>
      {/* Hero Banner Section */}
      <HeroBanner
        backgroundImage="/assets/images/hero-categories.webp"
        title="Explore All Training Categories"
        description="Browse a wide range of training categories across different fields"
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
        typewriterSpeed={100}
        typewriterDelay={500}
      />

      {/* Categories Content Section */}
      <section className="pb-15">
        <div className="container mx-auto">
          {/* Search Bar */}
          <SearchBanner resetBehavior="local" />

          {/* Categories Cards */}
          <CategoriesCards categories={categories} />
        </div>
      </section>
    </>
  );
}
