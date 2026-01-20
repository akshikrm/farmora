import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  icon: ReactNode;
};

const SectionHeader = ({ title, icon }: SectionHeaderProps) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-green-50 text-green-600 rounded-lg">{icon}</div>
    <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
  </div>
);

export default SectionHeader;
