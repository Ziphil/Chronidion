//

import {
  useCallback,
  useState
} from "react";


export function useRerender(): () => void {
  const [dummy, setDummy] = useState(0);
  const rerender = useCallback(function (): void {
    setDummy((dummy) => dummy + 1);
  }, []);
  return rerender;
}