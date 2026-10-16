"use client";

import { showToast } from "nextjs-toast-notify";

export function notify(message, type = "success") {
  if (!message) return message;

  showToast[type](message, {
    duration: 4000,
    position: "top-right",
    transition: "fadeIn",
    progress: true,
    sound: false,
  });

  const closeButton = document.querySelector(".toast-container.top-right")?.lastElementChild?.querySelector(".close-toast");
  if (closeButton) {
    closeButton.setAttribute("role", "button");
    closeButton.setAttribute("tabindex", "0");
    closeButton.setAttribute("aria-label", "Dismiss notification");
    closeButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        closeButton.click();
      }
    });
  }

  return message;
}
