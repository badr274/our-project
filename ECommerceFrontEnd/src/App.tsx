import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </main>
  );
};

export default App;
