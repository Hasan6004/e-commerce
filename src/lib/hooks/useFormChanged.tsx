import { useMemo } from "react";

type AnyObject = Record<string, any>;

export function useFormChanged<T extends AnyObject>(
  initialValues: T,
  currentValues: T
) {
  const isChanged = useMemo(() => {
    return Object.keys(initialValues).some(
      (key) => initialValues[key] !== currentValues[key]
    );
  }, [initialValues, currentValues]);

  return isChanged;
}
