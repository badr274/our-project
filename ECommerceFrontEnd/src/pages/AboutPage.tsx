import { CircleArrowRight, Files, Settings } from "lucide-react";
import heroImage from "@/assets/DALL·E 2025-03-10 13.37.11 - A modern and stylish eCommerce hero section image with a sky-inspired color scheme. The scene includes a shopping website interface on a laptop screen.webp";

const AboutPage = () => {
  return (
    <section className="py-32 px-4">
      <div className="container mx-auto flex flex-col gap-28">
        <div className="flex flex-col gap-7">
          <h1 className="text-4xl font-semibold lg:text-7xl">
            About Us – Your Trusted Shopping Destination
          </h1>
          <p className="max-w-xl text-lg">
            Welcome to [Your Store Name], where quality meets convenience. Our
            mission is to bring you the best products at unbeatable prices,
            ensuring a seamless and enjoyable shopping experience. From the
            latest trends to everyday essentials, we are committed to delivering
            excellence with every purchase. Discover a world of possibilities
            and shop with confidence!
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src={heroImage}
            alt="placeholder"
            className="size-full max-h-96 rounded-2xl object-cover"
          />
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10">
            <p className="text-sm text-muted-foreground">OUR MISSION</p>
            <p className="text-lg font-medium">
              We believe that shopping should be seamless, enjoyable, and
              accessible to everyone. Our mission is to provide a premium online
              shopping experience where you can discover the latest trends,
              essential products, and unbeatable deals—all with ease and
              confidence. At [Your Store Name], we are committed to innovation,
              quality, and customer satisfaction, ensuring that every purchase
              is smooth, secure, and satisfying
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              We make shopping incredibly easy
            </h2>
            <p className="text-muted-foreground">
              We aim to empower millions of customers with a seamless, enjoyable
              shopping experience. Here’s how we do it:
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Files className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Wide Selection of Products
              </h3>
              <p className="text-muted-foreground">
                From the latest fashion trends to everyday essentials, we offer
                a diverse range of high-quality products at the best prices.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <CircleArrowRight className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Fast & Secure Shopping
              </h3>
              <p className="text-muted-foreground">
                With an easy-to-use interface, secure payment options, and quick
                delivery, we make shopping stress-free.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Settings className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Customer-Centric Approach
              </h3>
              <p className="text-muted-foreground">
                We believe in transparency, trust, and putting our customers
                first, ensuring a hassle-free and satisfying shopping
                experience.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-10 text-sm font-medium text-muted-foreground">
              JOIN OUR TEAM
            </p>
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              We're redefining the future of shopping
            </h2>
          </div>
          <div>
            <img
              src={heroImage}
              alt="placeholder"
              className="mb-6 max-h-36 w-full rounded-xl object-cover"
            />
            <p className="text-muted-foreground">
              We're on a mission to make online shopping seamless, innovative,
              and customer-focused. And we're looking for passionate individuals
              to help us shape the future of eCommerce. If you love innovation,
              creativity, and making a real impact, this might be the perfect
              place for you. Would you like any refinements or additions? 😊
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
