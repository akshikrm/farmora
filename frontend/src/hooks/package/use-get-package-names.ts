import packages from "@api/packages.api";
import type { PackageName } from "@app-types/package.types";
import useGetNames from "@hooks/use-get-names";

const useGetPackageNames = () => {
  const query = useGetNames<PackageName[]>({
    queryFn: packages.getNames,
    queryKey: "package:names",
  });

  return query;
};

export default useGetPackageNames;
