import { Menu, ShoppingBasket, Moon, Sun } from "lucide-react";
import logoImage from "@/assets/kisspng-online-shopping-shopping-cart-logo-e-commerce-market-5ab886d637a728.195706121522042582228.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import CookieService from "@/services/CookieService";
import ShoppingCart from "./ShoppingCart";
import { useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { useModeTheme } from "@/context/ThemeContext";
import { useLogoutMutation } from "@/app/auth/AuthApiSlice";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: logoImage,
    alt: "logo",
    title: "Ecommerce",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Products",
      url: "/products",
    },
    {
      title: "Pricing",
      url: "/pricing",
    },
    {
      title: "About",
      url: "/about",
    },
  ],
  auth = {
    login: { text: "Log in", url: "/login" },
    signup: { text: "Sign up", url: "/register" },
  },
}: Navbar1Props) => {
  const token = CookieService.get("token");
  const { theme, setTheme } = useModeTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const [isMyDrawerOpen, setIsMyDrawerOpen] = useState<boolean>(false);
  const { cartItems } = useAppSelector((state) => state.shoppingCart);
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      const res = await logout({}).unwrap();
      console.log(res);
      // CookieService.remove("token");
      // window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <section className="py-4 px-2 shadow-sm">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8 rounded-full" alt={logo.alt} />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => toggleTheme()}>
              {theme === "light" ? <Moon /> : <Sun />}
            </Button>
            {!token ? (
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={auth.login.url}>{auth.login.text}</a>
                </Button>
                <Button asChild size="sm">
                  <a href={auth.signup.url}>{auth.signup.text}</a>
                </Button>
              </div>
            ) : (
              <Button onClick={handleLogout}>Logout</Button>
            )}
            <ShoppingCart isOpen={isMyDrawerOpen} setIsOpen={setIsMyDrawerOpen}>
              <Button
                className="relative"
                onClick={() => setIsMyDrawerOpen(true)}
              >
                <ShoppingBasket />
                <span className="absolute top-[-4px] right-[-4px]  z-10 w-4 h-4 text-[10px] bg-destructive rounded-full text-white flex justify-center items-center">
                  {cartItems.length}
                </span>
              </Button>
            </ShoppingCart>
          </div>
        </nav>
        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>
            <div className="space-x-2">
              <Button onClick={() => toggleTheme()}>
                {theme === "light" ? <Moon /> : <Sun />}
              </Button>
              <ShoppingCart
                isOpen={isMyDrawerOpen}
                setIsOpen={setIsMyDrawerOpen}
              >
                <Button
                  className="relative"
                  onClick={() => setIsMyDrawerOpen(true)}
                >
                  <ShoppingBasket />
                  <span className="absolute top-[-4px] right-[-4px]  z-10 w-4 h-4 text-[10px] bg-red-700 rounded-full text-white flex justify-center items-center">
                    {cartItems.length}
                  </span>
                </Button>
              </ShoppingCart>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link to={logo.url} className="flex items-center gap-2">
                        <img src={logo.src} className="w-8" alt={logo.alt} />
                        <span className="text-lg font-semibold">
                          {logo.title}
                        </span>
                      </Link>
                    </SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    {!token ? (
                      <div className="flex flex-col gap-3">
                        <Button asChild variant="outline">
                          <Link to={auth.login.url}>{auth.login.text}</Link>
                        </Button>
                        <Button asChild>
                          <Link to={auth.signup.url}>{auth.signup.text}</Link>
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={handleLogout}>Logout</Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground">
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className=" !w-[600px]">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <Link
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent-foreground hover:text-chart-3"
      to={item.url}
    >
      {item.title}
    </Link>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div>{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };
