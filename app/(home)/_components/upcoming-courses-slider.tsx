"use client";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import UpcommingCourseCard from "../../../components/cards/upcomming-card";

interface UpcomingCoursesSliderProps {
  upcomingCourses: UpcomingCourse[];
}

export default function UpcomingCoursesSlider({ upcomingCourses }: UpcomingCoursesSliderProps) {
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !swiperRef.current || !upcomingCourses) return;

    // Initialize Swiper-like functionality
    const swiper = swiperRef.current;
    const slides = swiper.querySelectorAll(".swiper-slide");
    const totalSlides = slides.length;
    let currentSlide = 0;

    const getSlidesPerView = () => {
      return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    };

    let slidesPerView = getSlidesPerView();

    const updateSlider = () => {
      const translateX = -currentSlide * (100 / slidesPerView);
      swiper.style.transform = `translateX(${translateX}%)`;
    };

    const nextSlide = () => {
      currentSlide = Math.min(currentSlide + 1, totalSlides - slidesPerView);
      updateSlider();
    };

    const prevSlide = () => {
      currentSlide = Math.max(currentSlide - 1, 0);
      updateSlider();
    };

    // Add event listeners
    if (nextBtnRef.current) {
      nextBtnRef.current.addEventListener("click", nextSlide);
    }
    if (prevBtnRef.current) {
      prevBtnRef.current.addEventListener("click", prevSlide);
    }

    // Handle window resize
    const handleResize = () => {
      const newSlidesPerView = getSlidesPerView();
      if (newSlidesPerView !== slidesPerView) {
        slidesPerView = newSlidesPerView;
        currentSlide = 0;
        updateSlider();
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial setup
    updateSlider();

    return () => {
      if (nextBtnRef.current) {
        nextBtnRef.current.removeEventListener("click", nextSlide);
      }
      if (prevBtnRef.current) {
        prevBtnRef.current.removeEventListener("click", prevSlide);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [upcomingCourses, isClient]);

  return (
    <div className="courses-slider relative">
      {/* Swiper Container */}
      <div className="swiper-container overflow-hidden">
        <div
          ref={swiperRef}
          className={`swiper-wrapper flex transition-transform duration-500 ease-in-out ${
            !isClient ? "opacity-0" : "opacity-100"
          }`}
        >
          {upcomingCourses.map((course) => (
            <UpcommingCourseCard key={course.timing_id} course={course} />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {isClient && upcomingCourses && upcomingCourses.length > 3 && (
        <div className="slider-navigation flex justify-center gap-4 py-2">
          <button
            ref={prevBtnRef}
            className="nav-btn prev-btn bg-white rounded-full flex items-center justify-center text-[#3E5EC0] hover:bg-[#3E5EC0] hover:text-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(62,94,192,0.25)]"
            type="button"
            aria-label="Previous courses"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            ref={nextBtnRef}
            className="nav-btn next-btn bg-white rounded-full flex items-center justify-center text-[#3E5EC0] hover:bg-[#3E5EC0] hover:text-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(62,94,192,0.25)]"
            type="button"
            aria-label="Next courses"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
