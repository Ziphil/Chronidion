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
    }, show);

    useInterval(async () => {
      if (show) {
        let info = await fetchSystemInfo();
        console.log(info);
        setInfo(info);
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