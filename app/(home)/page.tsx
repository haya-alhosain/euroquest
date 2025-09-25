import { Metadata } from "next";
import CategoriesSection from "@/app/(home)/_components/categories-section";
import HeroSection from "@/app/(home)/_components/hero-home-section";
import AboutSection from "@/app/(home)/_components/about-section";
import ContactSection from "@/app/(home)/_components/contact-section";
import CitiesSection from "@/app/(home)/_components/cities-section";
import UpcomingCoursesSection from "@/app/(home)/_components/upcoming-courses-section";
import { getCategories, getSeoData } from "@/services/services";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData('home');
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
    console.error('Error generating metadata:', error);
    
    // Fallback metadata
    return {
      title: "EuroQuest International Training | Professional Training Courses & Programs",
      description: "EuroQuest International Training provides diverse professional courses in management, HR, IT, finance, and quality. Advance your skills and grow your career with expert programs.",
      keywords: "professional training, development programs, management courses, HR training, IT skills, finance training, quality courses",
    };
  }
}

export default async function HomePage() {
  const categories = await getCategories();
  return (
    <>
      <HeroSection />
      <CategoriesSection  categories={categories}/>
      <CitiesSection />
      <AboutSection />
      <UpcomingCoursesSection />
      <ContactSection />
    </>
  );
}
