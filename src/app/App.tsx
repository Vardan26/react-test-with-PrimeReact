import TableComponent from "../components/table";
import { useTableData } from "../hooks";

export const App = () => {
  const { items, isLoading, updateItem, deleteItem } = useTableData();

  if (isLoading) return <div>Loading...</div>;
  return (
    <TableComponent data={items} onEdit={updateItem} onDelete={deleteItem} />
  );
};

export default App;
