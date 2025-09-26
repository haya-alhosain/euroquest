import CategoryCard from "@/components/cards/category";
import { AnimatedCategoriesGrid } from "@/components/shared/animated";

export default function CategoriesCards({
  categories,
}: {
  categories: Category[] | undefined;
}) {
  return (
    <section>
      {categories && (
        <AnimatedCategoriesGrid>
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </AnimatedCategoriesGrid>
      )}
    </section>
  );
}
