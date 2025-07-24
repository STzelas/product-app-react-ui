import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import {useNavigate} from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const onRegisterRedirect = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate("/register");
  }

  return (
    <>
      <form
        className="max-w-sm mx-auto p-8 space-y-4 mt-20 rounded-xl bg-white shadow-xl"
      >
        <h3 className="text-xl font-semibold text-center text-gray-600">Welcome!</h3>
        <p className="mt-1 text-center text-gray-500 ">Login or create account</p>
        <div>
          <Label htmlFor="username" className="mb-1"></Label>
          <Input
            id="username"
            autoFocus
            placeholder={"Username"}
          />
        </div>

        <div>
          <Label htmlFor="password" className="mb-1"></Label>
          <Input
            id="password"
            type="password"
            autoFocus
            placeholder={"Password"}
          />
          <a href="#" className={"text-xs text-gray-400 ms-1 hover:text-black"}>Forgot your password?</a>
        </div>
        <div className={"flex flex-col items-center justify-center space-y-2"}>
          <Button className="" type="submit">
            Login
          </Button>
          <Button
            variant={"outline"}
            className=""
            onClick={onRegisterRedirect}
          >
            Create an account
          </Button>
          <button onClick={(e) => {e.preventDefault(); navigate("/")}} className={"text-xs text-gray-400 ms-1 hover:text-black"}>or go Back</button>
        </div>

      </form>
    </>
  );
}