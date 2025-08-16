import Table from "../components/table";
import { useTableData } from "../hooks/tableData";
import AppLayout from "./AppLayout";

export const App = () => {
  const { isLoading } = useTableData();

  return (
    <AppLayout loading={isLoading}>
      <Table />
    </AppLayout>
  );
};

export default App;
