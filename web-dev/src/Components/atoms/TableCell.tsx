interface TableCellProps {
    children: React.ReactNode;
    align?: "left" | "right" | "center";
  }
  
  export const TableCell: React.FC<TableCellProps> = ({
    children,
    align = "left",
  }) => {
    return (
      <td style={{ textAlign: align, padding: "8px", borderBottom: "1px solid #ddd" }}>
        {children}
      </td>
    );
  };