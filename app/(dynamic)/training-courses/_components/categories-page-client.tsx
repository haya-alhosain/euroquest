import HeroBanner from "@/components/shared/hero-banner";
import SearchBanner from "@/components/shared/search-banner";
import { BreadcrumbItem } from "@/components/shared/breadcrumb";
import { Home } from "lucide-react";
import CategoriesCards from "./categories-cards";

interface CategoriesPageClientProps {
  categories: any[];
}

export default function CategoriesPageClient({ categories }: CategoriesPageClientProps) {
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
          <CategoriesCards categories={categories}/>
        </div>
      </section>
    </>
  );
}
