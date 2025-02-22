import { useEffect, useState } from "react";
import { Trash } from "lucide-react";

import { Loading } from "@/components/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteTask } from "@/hooks/useTask";

interface DeleteTaskProps {
  taskId: string;
}

export const DeleteTask = ({ taskId }: DeleteTaskProps) => {
  const [modalIsOpen, setModalOpen] = useState(false);

  const { mutate, isPending, isSuccess } = deleteTask();

  const handleDeleteTask = () => {
    mutate(taskId);
  };

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isSuccess]);

  return (
    <AlertDialog
      open={modalIsOpen}
      onOpenChange={setModalOpen}
    >
      <AlertDialogTrigger asChild>
        <div className="flex items-center w-full h-8 gap-1.5 px-2 cursor-pointer hover:bg-accent rounded transition">
          <Trash className="size-4" />
          <span className="text-sm">Deletar</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar Tarefa</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que realmente deseja deletar essa tarefa?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleDeleteTask}
          >
            {isPending ? (
              <>
                <Loading />
                <span>Deletando</span>
              </>
            ) : (
              <span>Deletar</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
