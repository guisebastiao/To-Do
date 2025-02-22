import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import { findAll } from "@/hooks/useTask";

import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { Task } from "@/components/Task";

export const Home = () => {
  const { data, isLoading, isFetching, fetchNextPage } = findAll();

  const endScrollRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && !isFetching) {
        fetchNextPage();
      }
    });

    if (endScrollRef.current) {
      observer.current.observe(endScrollRef.current);
    }

    return () => {
      if (endScrollRef.current && observer.current) {
        observer.current.unobserve(endScrollRef.current);
      }
    };
  }, [isFetching]);

  return (
    <section className="max-w-4xl w-full h-full">
      <Header />
      <div className="w-full h-[calc(100%-5rem)] flex items-center justify-start flex-col gap-1 px-2 overflow-y-scroll">
        {isLoading && <Loading />}

        {!isLoading && data?.pages && data?.pages?.[0]?.tasks?.length <= 0 && (
          <h1 className="my-5 text-base font-semibold">
            Nenhuma tarefa encontrada
          </h1>
        )}

        {!isLoading && (
          <AnimatePresence>
            {data?.pages.map((page) =>
              page?.tasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  description={task.description}
                  complete={task.complete}
                />
              ))
            )}
            <div
              ref={endScrollRef}
              className="w-full flex justify-center py-1"
            >
              {isFetching && <Loading />}
            </div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
