import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { register } from "@/hooks/useAuth";

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

import { registerSchema } from "@/schemas/authSchema";

export const Register = () => {
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = register();
  const navigate = useNavigate();

  const handleRegister = () => {
    const data = registerForm.getValues();
    mutate(data);
  };

  return (
    <form
      onSubmit={registerForm.handleSubmit(handleRegister)}
      className="max-w-md w-full flex flex-col gap-5"
    >
      <h1 className="text-3xl font-bold text-center mb-10">Cadastrar</h1>
      <Form {...registerForm}>
        <FormField
          control={registerForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
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
          control={registerForm.control}
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
            <span>Registrando</span>
          </>
        ) : (
          <span>Registrar</span>
        )}
      </Button>
      <div className="flex justify-center">
        <Button
          variant="link"
          onClick={() => navigate("/login")}
        >
          Entrar na minha conta
        </Button>
      </div>
    </form>
  );
};
