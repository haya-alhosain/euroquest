import { Metadata } from "next";
import HeroBanner from "@/components/shared/hero-banner";
import SearchBanner from "@/components/shared/search-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import CitiesCards from "./_components/cities-cards";
import { getCities, getSeoData } from "@/services/services";
import Container from "@/components/shared/container";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("cities");
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
        type: "website",
        url: seo.canonical,
      },
      twitter: {
        card: "summary_large_image",
        title: seo.meta_title,
        description: seo.meta_description,
        images: [seo.meta_image],
      },
      alternates: {
        canonical: seo.canonical,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for cities page:", error);

    // Fallback metadata
    return {
      title:
        "Training Cities | EuroQuest International Global Training Locations",
      description:
        "Explore training courses in leading global capitals and cities. Browse professional training programs in Dubai, London, Barcelona, Istanbul, Vienna, Paris, and Geneva.",
      keywords:
        "training cities, global training locations, Dubai training, London courses, Barcelona training, Istanbul courses, Vienna training, Paris courses, Geneva training",
    };
  }
}

export default async function CitiesPage() {
  const cities = await getCities();

  // Breadcrumb configuration
  const breadcrumbs: BreadcrumbItem[] = [
    {
      href: "/",
      label: "",
      icon: <Home size={14} />,
    },
    {
      href: "/training-cities",
      label: "Cities",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-cities.webp"
        title="Explore training courses in leading global capitals and cities"
        description="Browse a wide range of training cities across different fields"
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
        typewriterSpeed={100}
        typewriterDelay={500}
      />

      <Container className="md:pb-12 pb-10">
        {/* Search Bar */}
        <SearchBanner resetBehavior="local" />

        {/* Cities grid Cards */}
        <CitiesCards cities={cities} />
      </Container>
    </>
  );
}
