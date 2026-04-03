type SeasonInformationProps = {
  name: string;
  batchLength: number;
};

const SeasonInformation = (props: SeasonInformationProps) => {
  const { batchLength, name } = props;
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Season</p>
          <p className="text-lg font-semibold">{name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Batches</p>
          <p className="text-lg font-semibold">{batchLength}</p>
        </div>
      </div>
    </div>
  );
};

export default SeasonInformation;
