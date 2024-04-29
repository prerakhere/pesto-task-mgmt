/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: "320px",
      subxs: "360px",
      xs: "485px",
      ...defaultTheme.screens,
    },
    extend: {
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      fontSize: {
        "2xs": "0.7rem",
        "3xs": "0.65rem",
        "4xs": "0.62rem",
        "over-xs": "0.8rem",
        "sub-sm": "0.85rem",
        "sub-base": "0.9rem",
        "over-base": "1.0625rem",
        "1.5xl": "1.375rem",
        "2.5xl": "1.7rem",
        "3.5xl": "2rem",
        "4.5xl": "2.7rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
