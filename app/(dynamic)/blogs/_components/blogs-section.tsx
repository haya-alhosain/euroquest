import BlogCard from "@/components/cards/blog";
import Container from "@/components/shared/container";
import SectionTitle from "@/components/shared/section-title";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogsSectionProps {
  section: BlogSection;
  sectionIndex: number;
  className?: string;
}

export default function BlogsSection({
  section,
  sectionIndex,
  className = "",
}: BlogsSectionProps) {
  return (
    <section
      className={`md:py-12 py-10 relative ${className}`}
      id={`blogs-section-${sectionIndex}`}
    >
      {/* Background Shape */}
      <img
        src="/assets/images/categories-shape.svg"
        alt=""
        className="absolute -left-[100px] top-0 w-[250px] h-[250px]"
      />

      <Container>
        <SectionTitle title={section.tagName} highlight={""} />

        <div className="relative pb-4 mx-[-12px] md:mx-[-12px] sm:mx-[-8px] overflow-hidden">
          {/* Swiper Container */}
          <div className="p-2 overflow-hidden h-fit mb-8">
            <div className="flex items-stretch pb-4">
              {section.blogs.map((blog) => (
                <BlogCard blog={blog} key={blog.id} />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="slider-navigation flex justify-center gap-4">
            <button
              className="nav-btn prev-btn w-8 h-8 bg-white rounded-full shadow-[0_4px_20px_rgba(62,94,192,0.15)] flex items-center justify-center text-[#3E5EC0] hover:bg-[#3E5EC0] hover:text-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(62,94,192,0.25)]"
              type="button"
              aria-label="Previous courses"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="nav-btn next-btn w-8 h-8 bg-white rounded-full shadow-[0_4px_20px_rgba(62,94,192,0.15)] flex items-center justify-center text-[#3E5EC0] hover:bg-[#3E5EC0] hover:text-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(62,94,192,0.25)]"
              type="button"
              aria-label="Next courses"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
