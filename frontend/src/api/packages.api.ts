import type { PackageName } from "@app-types/package.types";
import type { NameResponse } from "@app-types/gen.types";
import fetcher from "@utils/fetcher";

const packages = {
  getNames: async (): Promise<NameResponse[]> => {
    const data = await fetcher("packages/names");
    return data;
  },
};

export default packages;
