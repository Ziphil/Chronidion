//

import * as react from "react";
import {
  ReactElement,
  useEffect,
  useState
} from "react";
import {
  useInterval
} from "react-use";
import {
  useKeyEvent
} from "../../hook";
import {
  SystemInfo,
  SystemInfoFactory
} from "../../model/system-info";
import SystemInfoPane from "../compound/system-info-pane";
import {
  SystemInfoKind
} from "../compound/system-info-pane";
import {
  create
} from "../create";


const SystemInfoPage = create(
  "SystemInfoPage",
  function ({
    show
  }: {
    show: boolean
  }): ReactElement | null {

    let [kind, setKind] = useState<SystemInfoKind>("cpuLoad");
    let [info, setInfo] = useState<SystemInfo | null>(null);

    useKeyEvent((key) => {
      if (key === "z") {
        setKind("cpuLoad");
      } else if (key === "a") {
        setKind("cpuSpeed");
      } else if (key === "q") {
        setKind("cpuTemperature");
      } else if (key === "x") {
        setKind("memoryPercentage");
      } else if (key === "s") {
        setKind("memoryUsedSize");
      }
    }, show);

    useEffect(() => {
      fetchSystemInfo().then(setInfo);
    }, [show]);

    useInterval(async () => {
      if (show) {
        fetchSystemInfo().then(setInfo);
      }
    }, 1000);

    let innerNode = (info !== null) && <SystemInfoPane info={info} kind={kind}/>;
    let node = (show) && (
      <div className="page">
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
  let info = SystemInfoFactory.fromData(data);
  return info;
}

export default SystemInfoPage;