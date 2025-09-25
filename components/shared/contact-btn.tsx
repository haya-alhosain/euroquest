"use client";
import { useState } from "react";
import ContactPopup from "../popups/contact";

export default function ContactBtn() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <li className="cursor-pointer" onClick={() => setIsContactOpen(true)}>
        Contact Us
      </li>
      {/* Contact Popup */}
      <ContactPopup
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
