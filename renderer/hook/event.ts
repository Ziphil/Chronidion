//

import {
  useEvent
} from "react-use";


export function useKeyEvent(callback: (key: string, event: KeyboardEvent) => void, enabled: boolean): void {
  useEvent("keydown", (event) => {
    if (enabled) {
      callback(event.key, event);
    }
  });
}