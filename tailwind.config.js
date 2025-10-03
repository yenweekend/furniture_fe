/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4) 15%, #fff)",
      },
      backgroundColor: {
        ichi: "var(--shop-color-main)",
        ni: "var(--shop-color-second)",
        primary: "var(--primary-bg)",
        collectionichi: "var(--home-collection1-bg)",
        collectionni: "var(--home-collection2-bg)",
        categoryichi: "var(--home-category-bg-1)",
        categoryni: "var(--home-category-bg-2)",
        categorysan: "var(--home-category-bg-3)",
        categoryyon: "var(--home-category-bg-4)",
        categorygo: "var(--home-category-bg-5)",
        footerichi: "var(--footer-bg-color-1)",
        footerni: "var(--footer-bg-color-2)",
        footercopy: "var(--footer-bg-color-copyright)",
        coupon: "var(--home-coupon-bg)",
      },
      flexBasis: {
        "3/10": "30%",
        "7/10": "70%",
        "1/8": "12.5%",
        45: "45%",
        55: "55%",
      },
      boxShadow: {
        "3xl": "rgb(184, 193, 202) 0px 0px 10px",
        st: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        nd: "0 1px 5px 2px rgba(0, 0, 0, 0.1)",
        rd: "0px 0px 10px rgba(0, 0, 0, 0.08)",
        card: "0px 0px 3px rgba(0, 0, 0, 0.08)",
        "card-1": "0 1px 1px rgba(0, 0, 0, 0.05)",
        carousel: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
        scale: "0 0 0 5px rgba(255, 255, 255, 0.5)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderColor: {
        shop: "var(--shop-color-border)",
      },
      colors: {
        catecolor: "var( --home-categorize-color)",
        couponbg: "var(--home-coupon-bg)",
        coupontext: "var(--home-coupon-text)",
        couponborder: "var(--home-coupon-border)",
        couponlight: "var(--home-coupon-light)",
        collectionicontext: "var(--home-collection1-color-text)",
        collectionicon: "var(--home-collection1-icon)",
        redni: "var(--shop-color-second)",
        redtitle: "var(--shop-color-title)",
        redhover: "var(--shop-color-hover)",
        redbtn: "var(--shop-color-button)",
        redichi: "var(--shop-color-main)",
        blackni: "var(--shop-color-text)",
        borderichi: "var(--shop-color-border)",
        vendor: "#9a9a9a",
        footertext: "var(--footer-color-text)",
        footertitle: "var(--footer-color-title)",
        footerhover: "var(--footer-color-hover)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        scale: {
          from: {
            scale: 0.9,
          },
          to: {
            scale: 1,
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scale: "scale 0.15s ease-out",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2md": "990px",
      "2lg": "1200px",
      "2xl": "1350px",
      "max-990": { max: "990px" },
      "max-1200": { max: "1200px" },
      "max-1280": { max: "1280px" },
      "max-1190": { max: "1190px" },
      "max-768": { max: "768px" },
    },
  },
  // plugins: [require("tailwindcss-animate")],
};
