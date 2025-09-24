interface CategoryHomeProps {
  category: Category;
  onClick: (slug: string) => void;
}

export default function CategoryHome({ category, onClick }: CategoryHomeProps) {
  return (
    <div
      className="block text-inherit transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
      onClick={() => onClick(category.slug)}
    >
      <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-md shadow-[1px_1px_37px_0_rgba(62,94,192,0.25)] transition-all duration-300 hover:shadow-[1px_1px_37px_0_rgba(62,94,192,0.40)]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 text-[#3E5EC0] text-xl flex items-center justify-center">
            <img
              src="/assets/images/category-icon.svg"
              alt="Category"
              className="w-full h-full"
            />
          </div>
          <h3 className="text-xs font-semibold capitalize flex-1 line-clamp-2">
            {category.title}
          </h3>
        </div>
        <div className="text-[#3E5EC0] text-sm transition-all duration-300 transform -rotate-45 hover:scale-120 hover:rotate-0 hover:font-bold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
