import { useGetItemsQuery } from "../api";
import Table from "../components/table";
import AppLayout from "./AppLayout";

export const App = () => {
  const { isLoading } = useGetItemsQuery();

  return (
    <AppLayout loading={isLoading}>
      <Table />
    </AppLayout>
  );
};

export default App;
