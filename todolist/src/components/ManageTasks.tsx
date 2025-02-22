import { EllipsisVertical } from "lucide-react";

import { UpdateTask } from "@/components/UpdateTask";
import { DeleteTask } from "@/components/DeleteTask";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ManegeTasksProps {
  taskId: string;
  description: string;
  complete: boolean;
}

export const ManegeTasks = ({
  taskId,
  description,
  complete,
}: ManegeTasksProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="size-5 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Gerenciar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {!complete && (
            <UpdateTask
              taskId={taskId}
              description={description}
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteTask taskId={taskId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
