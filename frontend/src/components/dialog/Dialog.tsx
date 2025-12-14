import type { ReactNode } from "react";

type Props = {
  headerTitle: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Dialog = ({ headerTitle, children, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      {/* Dialog */}
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{headerTitle}</h2>
        </div>

        {/* Content and Actions */}
        {children}
      </div>
    </div>
  );
};

export default Dialog;
