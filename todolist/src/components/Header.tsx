import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { CreateTask } from "@/components/CreateTask";
import { Settings } from "@/components/Settings";
import { Input } from "@/components/ui/input";

export const Header = () => {
  const searchForm = useForm({
    defaultValues: {
      search: "",
    },
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    const { search } = searchForm.getValues();

    setSearchParams((params) => {
      params.set("description", search);
      return params;
    });
  };

  const handleResetSearch = () => {
    searchForm.reset();

    setSearchParams((params) => {
      params.delete("description");
      return params;
    });
  };

  return (
    <header className="w-full h-20 flex items-center">
      <div className="flex items-center w-full gap-4">
        <form
          className="w-6/12"
          onSubmit={searchForm.handleSubmit(handleSearch)}
        >
          <Form {...searchForm}>
            <FormField
              control={searchForm.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      {searchParams.get("description") !== null && (
                        <button
                          type="button"
                          className="absolute right-0 h-8 px-2 cursor-pointer"
                          onClick={handleResetSearch}
                        >
                          <X size={18} />
                        </button>
                      )}
                      <Input
                        {...field}
                        type="text"
                        placeholder="Pesquisar"
                        autoComplete="off"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
        </form>
        <CreateTask />
      </div>
      <Settings />
    </header>
  );
};
