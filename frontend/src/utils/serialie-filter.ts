type GenericFilter = Record<string, string>;

const serializeFilter = (argument: GenericFilter): GenericFilter => {
  return Object.entries(argument).reduce<GenericFilter>((acc, curr) => {
    const [k, v] = curr;
    if (v !== "") {
      acc[k] = v;
    }
    return acc;
  }, {});
};

export default serializeFilter;
