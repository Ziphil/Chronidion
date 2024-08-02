//

import {useEvent} from "react-use";


export function useKeyEvent(callback: (key: string, event: KeyboardEvent) => void, enabled: boolean): void {
  useEvent("keydown", (event) => {
    if (enabled) {
      callback(event.key, event);
    }
  });
}

export function useTripleClickEvent(callback: (event: MouseEvent) => void, enabled: boolean): void {
  useEvent("click", (event) => {
    if (enabled && event.detail === 3) {
      callback(event);
    }
  });
}