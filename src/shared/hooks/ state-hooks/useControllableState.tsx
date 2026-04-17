import {
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";

interface UseControllableStateProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

/**
 * @name useControllableState
 * @description A hook to create a state that can be either controlled or uncontrolled.
 * @param {UseControllableStateProps<T>} props - The props for the hook.
 * @returns {[T, Dispatch<SetStateAction<T>>]} - A tuple with the current value and a function to update it.
 *
 * @example
 * // Uncontrolled example
 * const UncontrolledComponent = () => {
 *   const [value, setValue] = useControllableState({ defaultValue: 'initial' });
 *
 *   return <input value={value} onChange={(e) => setValue(e.target.value)} />;
 * };
 *
 * // Controlled example
 * const ControlledComponent = () => {
 *   const [value, setValue] = useState('initial');
 *   const [controllableValue, setControllableValue] = useControllableState({
 *     value,
 *     onChange: setValue,
 *   });
 *
 *   return <input value={controllableValue} onChange={(e) => setControllableValue(e.target.value)} />;
 * };
 */
function useControllableState<T>({
  value: valueProp,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>): [T, Dispatch<SetStateAction<T>>] {
  const [internalState, setInternalState] = useState(defaultValue as T);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? (valueProp as T) : internalState;

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (newValue) => {
      const resolvedValue =
        typeof newValue === "function"
          ? (newValue as (prevState: T) => T)(value)
          : newValue;

      if (!isControlled) {
        setInternalState(resolvedValue);
      }
      onChange?.(resolvedValue);
    },
    [isControlled, onChange, value],
  );

  return [value, setValue];
}

export default useControllableState;
