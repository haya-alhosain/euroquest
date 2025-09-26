import { getCategoryDetails } from "@/services/services";

interface Props {
  params: { slug: string };
}

export default async function Head({ params }: Props) {
  const { slug } = params;
  const categoryData = await getCategoryDetails(slug);
  const { category } = categoryData;

  const title = category.meta_title || category.title;
  const description = category.meta_description || category.description?.replace(/<[^>]*>/g, '');
  const image = category.image || "/assets/images/hero-about.webp";
  const url = category.canonical || `https://euroqst.com/training-courses/${category.slug}`;

  return (
    <>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="EuroQuest International" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@euroquestintl" />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </>
  );
}
