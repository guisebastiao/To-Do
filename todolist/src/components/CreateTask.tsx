import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loading } from "@/components/Loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createTaskSchema } from "@/schemas/taskSchema";
import { createTask } from "@/hooks/useTask";

export const CreateTask = () => {
  const createTaskForm = useForm({
    resolver: zodResolver(createTaskSchema),
    mode: "onChange",
    defaultValues: {
      description: "",
    },
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const { mutate, isPending, isSuccess } = createTask();

  const handleCreateTask = () => {
    const { description } = createTaskForm.getValues();
    mutate({ description });
  };

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      createTaskForm.reset();
    }
  }, [isSuccess]);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setModalOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Criar</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Tarefa</DialogTitle>
          <DialogDescription>
            Adicione uma nova tarefa descrevendo o que precisa ser feito.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={createTaskForm.handleSubmit(handleCreateTask)}>
          <Form {...createTaskForm}>
            <FormField
              control={createTaskForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="bg-zinc-50">Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      autoComplete="off"
                      disabled={isPending}
                      maxLength={300}
                      className="h-32 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <div className="flex justify-end gap-1.5 mt-4">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loading />
                  <span>Criando</span>
                </>
              ) : (
                <span>Criar</span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
