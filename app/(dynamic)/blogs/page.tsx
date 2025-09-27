import { Metadata } from "next";
import HeroBanner from "@/components/shared/hero-banner";
import BlogsSection from "@/app/(dynamic)/blogs/_components/blogs-section";
import { Home } from "lucide-react";
import { getBlogs, getSeoData } from "@/services/services";
import Container from "@/components/shared/container";
import Schema from "@/components/shared/schema";


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("blogs");
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
    console.error("Error generating metadata for blogs page:", error);

    // Fallback metadata
    return {
      title:
        "Training & Development Blogs | EuroQuest International Expert Articles",
      description:
        "Explore EuroQuest International's training and development blog, featuring expert articles on leadership, management, human resources, project planning, and career growth to keep professionals updated with the latest industry trends.",
      keywords:
        "training blogs, development articles, leadership insights, management tips, HR resources, project planning, career growth, professional development, industry trends",
    };
  }
}

export default async function BlogsPage() {
  const blogSections = await getBlogs();

  const breadcrumbs = [
    {
      href: "/",
      label: "",
      icon: <Home size={14} />,
    },
    {
      href: "/blogs",
      label: "Blogs",
    },
  ];

  if (!blogSections || blogSections.length === 0) {
    return (
      <>
        <Schema 
          pageType="blogs"
          pageTitle="Training & Development Blogs | EuroQuest International Expert Articles"
          pageDescription="Explore EuroQuest International's training and development blog, featuring expert articles on leadership, management, human resources, project planning, and career growth to keep professionals updated with the latest industry trends."
          pageUrl="https://euroqst.com/blogs"
        />
        <HeroBanner
          backgroundImage="/assets/images/hero-blogs.png"
          title="Training & Development Blogs"
          description="Explore EuroQuest International's training and development blog, featuring expert articles on leadership, management, human resources, project planning, and career growth to keep professionals updated with the latest industry trends."
          breadcrumbs={breadcrumbs}
          enableTypewriter={true}
          typewriterSpeed={100}
          typewriterDelay={500}
        />
        <Container className="text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No Blogs Available
            </h2>
            <p className="text-gray-600">
              We're working on adding new blog content. Please check back soon!
            </p>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Schema 
        pageType="blogs"
        pageTitle="Training & Development Blogs | EuroQuest International Expert Articles"
        pageDescription="Explore EuroQuest International's training and development blog, featuring expert articles on leadership, management, human resources, project planning, and career growth to keep professionals updated with the latest industry trends."
        pageUrl="https://euroqst.com/blogs"
      />
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-blogs.png"
        title="Training & Development Blogs"
        description="Explore EuroQuest International's training and development blog, featuring expert articles on leadership, management, human resources, project planning, and career growth to keep professionals updated with the latest industry trends."
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
        typewriterSpeed={100}
        typewriterDelay={500}
      />

      {/* Blog Sections */}
      {blogSections.map((section, index) => (
        <BlogsSection
          key={section.tagName}
          section={section}
          sectionIndex={index}
        />
      ))}
    </>
  );
}
