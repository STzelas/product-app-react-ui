import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onClickBack = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate("/");
  }
  return (
    <>
      <form
        className="max-w-sm mx-auto p-8 space-y-4 mt-20 rounded-xl bg-white shadow-xl"
      >
        <h3 className="text-xl font-semibold text-center text-gray-600">Welcome!</h3>
        <p className="mt-1 text-center text-gray-500 ">Create an account!</p>
        <div className={"space-y-2"}>
          <div>
            <Label htmlFor="username" className="mb-1"></Label>
            <Input
              id="username"
              autoFocus
              placeholder={"Username"}
            />
          </div>

          <div>
            <Label htmlFor="email" className="mb-1"></Label>
            <Input
              id="email"
              type={"email"}
              autoFocus
              placeholder={"Email"}
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
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="mb-1"></Label>
            <Input
              id="confirmPassword"
              type="password"
              autoFocus
              placeholder={"Confirm Password"}
            />
            <a onClick={() => {navigate("/login")}} className={"text-xs text-gray-400 ms-1 hover:text-black"}>Already have an Account?</a>
          </div>
        </div>

        <div className={"flex flex-col items-center justify-center space-y-2"}>
          <Button
            className="" type="submit"
            // onClick={}
          >
            Create an Account
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