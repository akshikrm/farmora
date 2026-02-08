import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Table = ({ children }: Props) => {
  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full bg-white border-collapse">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
