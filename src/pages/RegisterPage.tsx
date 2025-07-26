import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";
import {type SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {type FormFields, registerSchema} from "@/types/types.tsx";



const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@gmail.com"
    },
    resolver: zodResolver(registerSchema)
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "Problem creating account",
      });
    }
  }


  const onClickBack = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <>
      <form
        className="max-w-sm mx-auto p-8 space-y-4 mt-20 rounded-xl bg-white shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.root && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.root.message}</div>}
        <h3 className="text-xl font-semibold text-center text-gray-600">Welcome!</h3>
        <p className="mt-1 text-center text-gray-500 ">Create an account!</p>
        <div className={"space-y-2"}>
          <div>
            <Label htmlFor="username" className="mb-1">Username</Label>
            <Input
              {...register("username")}
              id="username"
              autoFocus
            />
            {errors.username && <div className={"p-2 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.username.message}</div>}
          </div>

          <div>
            <Label htmlFor="email" className="mb-1">Email</Label>
            <Input
              {...register("email")}
              id="email"
              type={"email"}
              autoFocus
            />
            {errors.email && <div className={"p-3 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.email.message}</div>}
          </div>

          <div>
            <Label htmlFor="password" className="mb-1">Password</Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              autoFocus
            />
            {errors.password && <div className={"p-3 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.password.message}</div>}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="mb-1">Confirm Password</Label>
            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
              autoFocus
            />
            {errors.confirmPassword && <div className={"p-3 mt-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"}>{errors.confirmPassword.message}</div>}
            <a onClick={() => {navigate("/login")}} className={"text-xs text-gray-400 ms-1 hover:text-black"}>Already have an Account?</a>
          </div>
        </div>

        <div className={"flex flex-col items-center justify-center space-y-2"}>
          <Button
            className=""
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Create an Account"}
          </Button>
          <Button
            variant={"outline"}
            className=""
            onClick={onClickBack}
          >
            Back
          </Button>
        </div>

      </form>
    </>
  )
}

export default RegisterPage;