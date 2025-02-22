import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PencilRuler } from "lucide-react";

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

import { updateTaskSchema } from "@/schemas/taskSchema";
import { updateTask } from "@/hooks/useTask";

interface UpdateTaskProps {
  taskId: string;
  description: string;
}

export const UpdateTask = ({ taskId, description }: UpdateTaskProps) => {
  const updateTaskForm = useForm({
    resolver: zodResolver(updateTaskSchema),
    mode: "onChange",
    defaultValues: {
      description,
    },
  });

  const [modalIsOpen, setModalOpen] = useState(false);

  const { mutate, isPending, isSuccess } = updateTask();

  const handleUpdateTask = () => {
    const { description } = updateTaskForm.getValues();
    mutate({ taskId, description });
  };

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      updateTaskForm.reset();
    }
  }, [isSuccess]);

  return (
    <Dialog
      open={modalIsOpen}
      onOpenChange={setModalOpen}
    >
      <DialogTrigger asChild>
        <div className="flex items-center w-full h-8 gap-1.5 px-2 cursor-pointer hover:bg-accent rounded transition">
          <PencilRuler className="size-4" />
          <span className="text-sm">Editar</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription>
            Atualize os detalhes da sua tarefa conforme necessário.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={updateTaskForm.handleSubmit(handleUpdateTask)}>
          <Form {...updateTaskForm}>
            <FormField
              control={updateTaskForm.control}
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
                  <span>Editando</span>
                </>
              ) : (
                <span>Editar</span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
