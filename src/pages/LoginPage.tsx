import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import {useNavigate} from "react-router";
import {type SubmitHandler, useForm} from "react-hook-form";
import {loginSchema, type LoginFields} from "@/types/types.tsx";
import {zodResolver} from "@hookform/resolvers/zod";

export default function LoginPage() {
  const navigate = useNavigate();

  const onRegisterRedirect = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate("/register");
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error();
    } catch (error) {
      setError("root", {
        message: "Username or Password is incorrect",
      });
      console.error(error);
    }
  }

  return (
    <>
      <form
        className="max-w-sm mx-auto p-8 space-y-4 mt-20 rounded-xl bg-white shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.root && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.root.message}</div>}
        <h3 className="text-xl font-semibold text-center text-gray-600">Welcome!</h3>
        <p className="mt-1 text-center text-gray-500 ">Login or create account</p>
        <div>
          <Label htmlFor="username" className="mb-1"></Label>
          <Input
            id="username"
            {...register("username")}
            autoFocus
          />
        </div>
        {errors.username && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.username.message}</div>}
        <div>
          <Label htmlFor="password" className="mb-1"></Label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            autoFocus
          />
          {errors.password && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.password.message}</div>}
        </div>
        <div className={"flex flex-col items-center justify-center space-y-2"}>
          <Button className="" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
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