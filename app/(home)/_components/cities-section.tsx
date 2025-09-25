import Link from "next/link";
import SectionTitle from "../../../components/shared/section-title";
import CitiesSlider from "./cities-slider";
import { getCities } from "@/services/services";

export default async function CitiesSection() {
  const cities = await getCities();

  return (
    <section className="bg-[#fff] py-14 relative">
      {/* Background Shape */}
      <img
        src="/assets/images/categories-shape.svg"
        alt=""
        className="absolute left-[-100px] top-0 w-[250px] h-[250px]"
      />

      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center items-start gap-3 md:justify-between mb-4">
          <SectionTitle
            title="Discover All"
            highlight="Cities"
            description="Explore Professional Training Courses in Major Cities Worldwide"
          />
          <Link
            href="/training-cities"
            className="text-[#3E5EC0] font-semibold hover:underline transition-all duration-300"
          >
            <u className="text-xs">View all</u>
          </Link>
        </div>

        {/* Cities Slider */}
        <CitiesSlider cities={cities} />
      </div>
    </section>
  );
}
