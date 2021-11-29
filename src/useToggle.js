import { useStore } from "./store";

export const useToggle = (ToggledComponent, toggle) => (props) => {
  /* eslint-disable */
  const value = useStore((state) => state[toggle]);
  return value ? (
    <ToggledComponent color {...props} />
  ) : props.children ? (
    <>{props.children}</>
  ) : null;
};
