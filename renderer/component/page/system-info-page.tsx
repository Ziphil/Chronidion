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
        setKind("cpuTemperature");
      } else if (key === "x") {
        setKind("memoryPercentage");
      } else if (key === "s") {
        setKind("memoryUsedSize");
      } else if (key === "c") {
        setKind("networkReceived");
      } else if (key === "d") {
        setKind("networkTransferred");
      }
    }, show);

    useEffect(() => {
      SystemInfoFactory.fetch().then(setInfo);
    }, [show]);

    useInterval(async () => {
      if (show) {
        SystemInfoFactory.fetch().then(setInfo);
      }
    }, 1000);

    let node = (show) && (
      <div className="page">
        {(info !== null) && <SystemInfoPane info={info} kind={kind}/>}
      </div>
    );
    return node || null;

  }
);


export default SystemInfoPage;