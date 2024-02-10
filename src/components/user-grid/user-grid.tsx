import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { UserData } from "../../pages/user-list/user-list.types";


interface UserGridProps {
  rowData: UserData[];
  colDefs: any;
}

export const UserGrid = ({ rowData, colDefs }: UserGridProps) => {
  return (
    <div className="ag-theme-quartz" style={{ height: 400}}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
};
