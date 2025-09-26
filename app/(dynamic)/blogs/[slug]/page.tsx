import { getBlogBySlug } from "@/services/services";
import HeroBanner from "@/components/shared/hero-banner";
import { Home } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description,
    keywords: blog.meta_keywords,
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description,
      images: [blog.image],
      type: "article",
      url: `/blogs/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.meta_title || blog.title,
      description: blog.meta_description,
      images: [blog.image],
    },
    alternates: blog.canonical
      ? {
          canonical: blog.canonical,
        }
      : undefined,
    other: {
      "article:published_time": blog.created_at,
      "article:modified_time": blog.updated_at,
      ...(blog.tag_name && { "article:tag": blog.tag_name }),
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

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
    {
      href: `/blogs/${slug}`,
      label: blog.title,
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-blogs.png"
        title={blog.h1 || blog.title}
        description={blog.meta_description}
        breadcrumbs={breadcrumbs}
        enableTypewriter={false}
      />

      {/* Blog Content */}
      <Container className="md:py-12 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Blog Image */}
          <div className="mb-8">
            <img
              src={blog.image}
              alt={blog.image_alt}
              title={blog.image_title}
              className="w-full md:h-96 h-64 object-cover rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Blog Meta */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl md:p-6 p-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-600">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center">
                  <i className="far fa-calendar mr-2 text-blue-600"></i>
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center">
                  <i className="far fa-eye mr-2 text-blue-600"></i>
                  {blog.number_of_views} views
                </span>
                {blog.updated_at !== blog.created_at && (
                  <span className="text-xs text-gray-500">
                    Updated:{" "}
                    {new Date(blog.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
              {blog.tag_name && (
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide">
                  {blog.tag_name}
                </span>
              )}
            </div>
          </div>

          {/* Blog Content */}
          <div className="bg-white rounded-xl md:p-8 md:shadow-lg">
            <div
              className="blog-content prose prose-lg max-w-none 
              prose-headings:text-[#3E5EC0] prose-headings:font-semibold prose-headings:mb-6 prose-headings:mt-8
              prose-h1:text-4xl prose-h1:leading-tight prose-h1:mb-8 prose-h1:mt-12 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4 prose-h1:text-[#3E5EC0] prose-h1:font-bold
              prose-h2:text-3xl prose-h2:leading-tight prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-[#3E5EC0] prose-h2:font-bold prose-h2:border-b prose-h2:border-blue-100 prose-h2:pb-3
              prose-h3:text-2xl prose-h3:leading-tight prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-gray-800 prose-h3:font-semibold
              prose-h4:text-xl prose-h4:leading-tight prose-h4:mb-4 prose-h4:mt-6 prose-h4:text-gray-700 prose-h4:font-semibold
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base prose-p:text-gray-600
              prose-ul:mb-8 prose-ul:pl-0 prose-ul:space-y-4 prose-ul:list-none
              prose-ol:mb-8 prose-ol:pl-0 prose-ol:space-y-4 prose-ol:list-none
              prose-li:mb-3 prose-li:text-gray-700 prose-li:leading-relaxed prose-li:pl-6 prose-li:relative prose-li:before:content-['✓'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-0 prose-li:before:text-green-600 prose-li:before:font-bold prose-li:before:text-lg
              prose-a:text-blue-600 prose-a:no-underline prose-a:font-semibold prose-a:border-b-2 prose-a:border-blue-200 hover:prose-a:text-blue-800 hover:prose-a:border-blue-400 hover:prose-a:transition-all hover:prose-a:duration-200
              prose-strong:text-[#3E5EC0] prose-strong:font-bold prose-strong:text-[#3E5EC0]
              prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-6 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
              prose-hr:my-12 prose-hr:border-gray-200
              [&_li_p]:m-0 [&_li_p]:inline [&_li_p]:text-gray-600 [&_li_p]:leading-relaxed
              [&_h2]:text-[#3E5EC0] [&_h2]:font-bold [&_h2]:text-3xl [&_h2]:mb-6 [&_h2]:mt-10 [&_h2]:border-b [&_h2]:border-blue-100 [&_h2]:pb-3
              [&_h3]:text-gray-800 [&_h3]:font-semibold [&_h3]:text-2xl [&_h3]:mb-4 [&_h3]:mt-8
              [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-base
              [&_strong]:text-[#3E5EC0] [&_strong]:font-bold
              [&_a]:text-blue-600 [&_a]:no-underline [&_a]:font-semibold [&_a]:border-b-2 [&_a]:border-blue-200 hover:[&_a]:text-blue-800 hover:[&_a]:border-blue-400
              [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-4 [&_ul]:mb-8
              [&_li]:pl-6 [&_li]:relative [&_li]:mb-3 [&_li]:text-gray-600 [&_li]:leading-relaxed [&_li]:before:content-['✓'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-0 [&_li]:before:text-green-600 [&_li]:before:font-bold [&_li]:before:text-lg"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content || blog.description,
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
