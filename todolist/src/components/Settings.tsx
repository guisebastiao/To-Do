import { Bolt, LogOut, Moon, Sun } from "lucide-react";

import { logout } from "@/hooks/useAuth";
import { useThemeContext } from "@/context/ThemeContext";

import { queryClient } from "@/utils/apiClient";

import { Loading } from "@/components/Loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Settings = () => {
  const { mutate, isPending } = logout();
  const { theme, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    queryClient.clear();
    mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="border p-1.5 rounded-sm hover:bg-accent cursor-pointer transition">
          <Bolt className="size-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleTheme}>
          {theme === "dark" ? (
            <div className="flex gap-1.5 items-center">
              <Sun className="size-4.5" />
              <span>Light</span>
            </div>
          ) : (
            <div className="flex gap-1.5 items-center">
              <Moon className="size-4.5" />
              <span>Dark</span>
            </div>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <div className="flex gap-1.5 items-center">
            {isPending ? (
              <>
                <Loading className="size-4" />
                <span>Saindo</span>
              </>
            ) : (
              <>
                <LogOut className="size-4 rotate-180" />
                <span>Sair</span>
              </>
            )}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
