//

import * as react from "react";
import {
  ReactElement,
  useState
} from "react";
import {
  useInterval
} from "react-use";
import {
  useKeyEvent
} from "../../hook";
import {
  SystemInfo
} from "../../model/system-info";
import {
  MeteoKind
} from "../compound/meteo-pane";
import {
  create
} from "../create";


const SystemPage = create(
  "SystemPage",
  function ({
    show
  }: {
    show: boolean
  }): ReactElement | null {

    let [kind, setKind] = useState<MeteoKind>("temperature");
    let [info, setInfo] = useState<SystemInfo | null>(null);

    useKeyEvent((key) => {
    }, show);

    useInterval(async () => {
      if (show) {
        let info = await fetchSystemInfo();
        console.log(info);
        setInfo(info);
      }
    }, 1000);

    let innerNode = (info !== null) && null;
    let node = (show) && (
      <div className="system-page">
        {innerNode}
      </div>
    );
    return node || null;

  }
);


async function fetchSystemInfo(): Promise<SystemInfo> {
  let data = await window.api.invoke("get-system-info", {
    currentLoad: "*",
    cpuCurrentSpeed: "*",
    cpuTemperature: "*",
    mem: "*"
  });
  let info = SystemInfo.fromData(data);
  return info;
}

export default SystemPage;