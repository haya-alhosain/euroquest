import SectionTitle from "../../../components/shared/section-title";
import CategoryHome from "@/components/cards/category-home";

export default async function CategoriesSection({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="bg-[#F2F8FF] py-14 relative">
      {/* Background Shape */}
      <img
        src="/assets/images/categories-shape.svg"
        alt=""
        className="absolute left-[-100px] top-0 w-[250px] h-[250px]"
      />

      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <SectionTitle
            title="Discover All"
            highlight="Categories"
            description="Professional Training Categories to enhance skills and performance"
          />
        </div>
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryHome key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
