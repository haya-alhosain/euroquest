import SectionTitle from "../shared/section-title";
import UpcomingCoursesSlider from "./upcoming-courses-slider";
import { getUpcomingCourses } from "@/services/services";

export default async function UpcomingCoursesSection() {
  const upcomingCourses = await getUpcomingCourses();

  return (
    <section className="courses-section bg-white py-14 relative">
      {/* Background Shape */}
      <img
        src="/assets/images/categories-shape.svg"
        alt=""
        className="categories-shape absolute left-[-100px] top-0 w-[250px] h-[250px]"
      />

      <div className="container mx-auto">
        {/* Section Header */}
        <div className="section-header courses-header mb-10">
          <SectionTitle
            title="Upcoming"
            highlight="Courses"
            description="Upcoming Training Courses to develop skills and improve performance"
          />
        </div>

        {/* Courses Slider */}
        <UpcomingCoursesSlider upcomingCourses={upcomingCourses} />
      </div>
    </section>
  );
}
