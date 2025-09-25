"use client";
import { useState } from "react";
import JoinPopup from "../popups/join";
import { ChevronRight } from "lucide-react";

export default function JoinBtn() {
  const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false);
  const handleJoinTeam = () => {
    setIsJoinPopupOpen(true);
  };

  return (
    <>
      <button
        onClick={handleJoinTeam}
        className="bg-[#3E5EC0] hover:bg-[#2d4aa7] !mt-0 mx-auto md:mx-0 text-white px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300 transform cursor-pointer flex items-center gap-3 group"
        suppressHydrationWarning={true}
      >
        <span>Join To Our Team</span>
        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      <JoinPopup
        isOpen={isJoinPopupOpen}
        onClose={() => setIsJoinPopupOpen(false)}
      />
    </>
  );
}
