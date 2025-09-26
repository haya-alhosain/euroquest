import { getCategoryDetails } from "@/services/services";
import CategoryPage from "../_components/category-page";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryData = await getCategoryDetails(slug);
  const { category, courses } = categoryData;

  return <CategoryPage category={category} courses={courses} slug={slug} />;
}
