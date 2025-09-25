"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import JoinPopup from "../../../components/popups/join";

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({
  className = "",
}: ContactSectionProps) {
  const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false);

  const handleJoinTeam = () => {
    setIsJoinPopupOpen(true);
  };

  return (
    <>
      <section className={`pt-[10px] pb-[30px] bg-[#F2F8FF] ${className}`}>
        <div className="container mx-auto">
          <div className="flex items-center md:justify-evenly justify-center md:flex-row flex-col-reverse gap-5">
            {/* Request Content */}
            <div className="max-w-[540px] text-center md:text-start">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-8">
                Join one of the best{" "}
                <span className="text-[#3E5EC0] font-bold">
                  training institution
                </span>{" "}
                in the world
              </p>

              <button
                onClick={handleJoinTeam}
                className="bg-[#3E5EC0] hover:bg-[#2d4aa7] !mt-0 mx-auto md:mx-0 text-white px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300 transform cursor-pointer flex items-center gap-3 group"
                suppressHydrationWarning={true}
              >
                <span>Join To Our Team</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Request Image */}
            <div className="relative max-w-[400px] flex items-center justify-center">
              <img
                src="/assets/images/request-call-img.png"
                alt="Request a call illustration"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <JoinPopup
        isOpen={isJoinPopupOpen}
        onClose={() => setIsJoinPopupOpen(false)}
      />
    </>
  );
}
