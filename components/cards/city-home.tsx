import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CityHomeCardProps {
  city: City;
}

export default function CityHomeCard({ city }: CityHomeCardProps) {
  return (
    <Link
      href={`/training-cities/${city.slug}`}
      className="swiper-slide w-full lg:w-1/3 md:w-1/2 px-2"
    >
      <div className="city-card block group cursor-pointer">
        <div>
          {/* City Image */}
          <div className="city-image relative h-48 overflow-hidden">
            <img
              src={city.image}
              alt={city.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* City Info */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#2B2B2B] group-hover:text-[#3E5EC0] transition-colors duration-300">
                  {city.title}
                  <span className="block text-xs font-normal text-[#7C7B7B] mt-1">
                    +{((city.id * 37) % 300) + 200} course
                  </span>
                </h3>
              </div>
              <div className="arrow-icon w-8 h-8 bg-[#3E5EC0] rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#2B4A9E] group-hover:scale-110">
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
