import { Contact2 } from "@/components/ContactUs";
import { Hero1 } from "@/components/Hero";
import heroImage from "@/assets/DALL·E 2025-03-10 13.37.11 - A modern and stylish eCommerce hero section image with a sky-inspired color scheme. The scene includes a shopping website interface on a laptop screen.webp";

import LatestProducts from "@/components/LatestProducts";
const HeroDetails = {
  heading: "Shop the Latest Trends & Best Deals!",
  description:
    " Discover top-quality products at unbeatable prices. From fashion to electronics, we’ve got everything you need! Enjoy fast shipping and exclusive discounts—start shopping today!",
  buttons: {
    primary: {
      text: "🛒 Shop Now",
      url: "/products",
    },
    secondary: {
      text: "📖 Learn More",
      url: "https://www.shadcnblocks.com",
    },
  },
  image: {
    src: heroImage,
    alt: "Hero section demo image showing interface components",
  },
};
const HomePage = () => {
  return (
    <div>
      <Hero1
        heading={HeroDetails.heading}
        description={HeroDetails.description}
        image={HeroDetails.image}
      />
      <LatestProducts />
      <Contact2 />
    </div>
  );
};

export default HomePage;
