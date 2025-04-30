import { Link } from "react-router-dom";
import PageNotFoundImage from "../assets/page-not-found.jpg";
const PageNotFound = () => {
  return (
    <section className="flex flex-col items-center w-full py-12 text-center md:py-24">
      <img
        src={PageNotFoundImage}
        width="400"
        height="300"
        alt="page not found"
        className="rounded-xl object-cover aspect-[400/300]"
      />
      <div className="container flex flex-col items-center justify-center gap-2 px-4 md:gap-4 lg:gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Oops! Page not found.
          </h1>
          <p className="text-gray-500   dark:text-gray-400">
            Whoops, looks like you took a wrong turn. <br /> Let&#x27;s get you
            back home.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex h-9 items-center rounded-md border  border-gray-200 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        >
          Go back home
        </Link>
      </div>
    </section>
  );
};
export default PageNotFound;
