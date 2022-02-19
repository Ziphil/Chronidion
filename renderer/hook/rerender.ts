//

import {
  useCallback,
  useState
} from "react";


export function useRerender(): () => void {
  let [dummy, setDummy] = useState(0);
  let rerender = useCallback(function (): void {
    setDummy((dummy) => dummy + 1);
  }, []);
  return rerender;
}