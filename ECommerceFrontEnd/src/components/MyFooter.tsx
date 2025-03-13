import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import logoImage from "../assets/kisspng-online-shopping-shopping-cart-logo-e-commerce-market-5ab886d637a728.195706121522042582228.png";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

const MyFooter = () => {
  return (
    <section className="mt-32 pb-10 px-2  bg-primary/10 pt-5">
      <div className="container">
        <footer>
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full lg:max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              <div>
                <Link
                  to={"/"}
                  className="flex items-center justify-center gap-4 lg:justify-start"
                >
                  <img
                    src={logoImage}
                    alt="logo"
                    className="h-11 rounded-full bg-transparent"
                  />
                  <p className="text-3xl font-semibold">Ecommerce</p>
                </Link>
                <p className="mt-6 text-sm text-muted-foreground">
                  🌍 Explore the best deals, enjoy secure payments, and get fast
                  shipping worldwide. Have questions? Our support team is here
                  24/7 to help! Follow us on social media for the latest updates
                  and exclusive offers. 💙
                </p>
              </div>
              <ul className="flex items-center space-x-6 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <FaInstagram className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <FaFacebook className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <FaTwitter className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <FaLinkedin className="size-6" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20 w-full">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-6 font-bold">{section.title}</h3>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="font-medium hover:text-primary"
                      >
                        <Link to={link.href}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>© 2024 Shadcnblocks. All rights reserved.</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li className="hover:text-primary">
                <a href="#"> Terms and Conditions</a>
              </li>
              <li className="hover:text-primary">
                <a href="#"> Privacy Policy</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { MyFooter };
