type Props = {
  when: boolean;
  then: React.ReactNode;
  otherwise?: React.ReactNode;
};
const Ternary = (props: Props) => {
  const { when, then, otherwise = null } = props;
  return <>{when ? then : otherwise}</>;
};

export default Ternary;
