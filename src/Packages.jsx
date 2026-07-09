import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Packages() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to the homepage packages anchor element
    navigate("/", { replace: true });
    setTimeout(() => {
      const element = document.getElementById("packages-section");
      if (element) {
        element.scrollIntoView({ behavior: "instant" });
      }
    }, 50);
  }, [navigate]);

  return null;
}
