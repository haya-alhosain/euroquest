"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

interface CourseContentProps {
  course: CourseDetail;
}

export default function CourseContent({ course }: CourseContentProps) {
  const [courseUrl, setCourseUrl] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Function to style headings with specific classes
  useEffect(() => {
    const styleHeadings = () => {
      const overviewText = document.querySelector('.overview-text');
      if (overviewText) {
        const strongElements = overviewText.querySelectorAll('p strong:only-child');
        
        // Define main headings that should get primary styling
        const mainHeadings = [
          'Course Overview',
          'Course Benefits', 
          'Course Objectives',
          'Training Methodology',
          'Target Audience',
          'Target Competencies',
          'Course Outline',
          'Why Attend'
        ];
        
        strongElements.forEach(strong => {
          const text = strong.textContent?.trim() || '';
          
          // Check if it's a Unit heading
          if (text.startsWith('Unit ')) {
            strong.classList.add('unit-heading');
          }
          // Check if it's NOT one of the main headings, make it secondary
          else if (!mainHeadings.includes(text)) {
            strong.classList.add('secondary-heading');
          }
          // Main headings keep the default primary styling
        });
      }
    };

    styleHeadings();
  }, [course.content]);

  // Handle client-side mounting to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
    setCourseUrl(`${window.location.origin}/training-course/${course.slug}`);
  }, [course.slug]);

  const courseTitle = encodeURIComponent(course.title || 'Check this course');

  return (
    <section className="overview-section" id="overview-section">
      <div className="overview-content flex flex-col pt-[70px] text-[#6f6f6f]">
        <h2 className="text-[#3E5EC0] text-[32px] font-bold mb-6">
          {course.title}
        </h2>
        
        <div className="overview-text leading-[1.8] text-[#333] text-base max-w-none">
          {course.content && (
            <div dangerouslySetInnerHTML={{ __html: course.content }} />
          )}
        </div>
      </div>

      {/* Social Share Section */}
      <div className="social-share-section my-10 p-4 bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] rounded-lg text-center">
        <h3 className="share-title text-lg font-semibold text-[#2d3748] mb-[15px] text-center">
          Share this course
        </h3>
        <div className="social-share-buttons flex justify-center gap-3">
          {isMounted && courseUrl ? (
            <>
              {/* Facebook */}
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(courseUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn facebook-btn flex items-center justify-center w-10 h-10 bg-[#1877f2] text-white rounded-lg no-underline font-medium text-lg transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#166fe5] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:no-underline"
              >
                <FaFacebookF />
              </Link>

              {/* X (Twitter) */}
              <Link
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(courseUrl)}&text=${courseTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn twitter-btn flex items-center justify-center w-10 h-10 bg-[#1da1f2] text-white rounded-lg no-underline font-medium text-lg transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#0d8bd9] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:no-underline"
              >
                <FaXTwitter />
              </Link>

              {/* LinkedIn */}
              <Link
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(courseUrl)}&title=${courseTitle}&summary=${encodeURIComponent(course.meta_description || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn linkedin-btn flex items-center justify-center w-10 h-10 bg-[#0a66c2] text-white rounded-lg no-underline font-medium text-lg transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#004182] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:no-underline"
              >
                <FaLinkedinIn />
              </Link>
            </>
          ) : (
            // Loading state for social buttons
            <div className="flex justify-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
