import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-center" toastOptions={{ duration: 1400 }} />
    </main>
  );
};

export default App;
