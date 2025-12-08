import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddSeason from "./components/add";
import EditSeason from "./components/edit";
import SeasonTable from "./components/table";

const SeasonsPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Seasons" />;
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          Add Season
        </button>
      </div>
      <div className="mt-6">
        <SeasonTable onEdit={(id) => setSelectedId(id)} />
      </div>
      <AddSeason isShow={isOpen} onClose={onClose} />
      <EditSeason selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
};

export default SeasonsPage;
