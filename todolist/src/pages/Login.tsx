import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { login } from "@/hooks/useAuth";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { loginSchema } from "@/schemas/authSchema";

export const Login = () => {
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = login();
  const navigate = useNavigate();

  const handleLogin = () => {
    const data = loginForm.getValues();
    mutate(data);
  };

  return (
    <form
      onSubmit={loginForm.handleSubmit(handleLogin)}
      className="max-w-md w-full flex flex-col gap-5"
    >
      <h1 className="text-3xl font-bold text-center mb-10">Entrar</h1>
      <Form {...loginForm}>
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Button
        type="submit"
        disabled={isPending}
        className="bg-blue-700 hover:bg-blue-800 disabled:bg-muted-foreground text-zinc-50 mt-5"
      >
        {isPending ? (
          <>
            <Loading />
            <span>Entrando</span>
          </>
        ) : (
          <span>Entrar</span>
        )}
      </Button>
      <div className="flex justify-center">
        <Button
          variant="link"
          onClick={() => navigate("/register")}
        >
          Criar minha conta
        </Button>
      </div>
    </form>
  );
};
