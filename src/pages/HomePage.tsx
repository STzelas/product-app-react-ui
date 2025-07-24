import {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Welcome to, Noterr Project"
  }, []);

  const onLoginRedirect = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <>
      <div className="mx-auto max-w-6xl relative z-10 flex flex-col items-center justify-center mt-20">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-1 sm:mb-3">
            <span
              className={"font-medium transition-colors duration-300 text-gray-900 dark:text-gray-50"}
            >
              Your Products Management
            </span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-center">
            <span
              className={"bg-gradient-to-r bg-[200%_auto] bg-clip-text leading-tight text-transparent transition-all duration-300 from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400"}
            >
              easier than ever!
            </span>
          </h2>

        </div>
        <p
          className={"text-center text-base sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-0 text-gray-600 dark:text-gray-200"}
        >
          Manage your products by creating, editing and deleting them easy and fast with this <br/><strong>Product App</strong>!
        </p>

      </div>
      <div className={"flex items-center justify-center space-y-4 mt-5"}>
        <Button
          className={""}
          onClick={onLoginRedirect}
        >
          Go to login!
        </Button>
      </div>
    </>
  )
}

export default HomePage