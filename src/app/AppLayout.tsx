import { ProgressSpinner } from "primereact/progressspinner";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  loading?: boolean;
};

const AppLayout = ({ children, loading }: Props) => {
  return (
    <div className="flex flex-col min-h-screen  gap-[30px] p-[30px]">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-900">Test App</h1>
      </header>

      <main className="flex-1">
        {children}

        {loading && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
            <ProgressSpinner />
          </div>
        )}
      </main>
    </div>
  );
};

export default AppLayout;
