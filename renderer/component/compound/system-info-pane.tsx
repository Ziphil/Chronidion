//

import * as react from "react";
import {
  Fragment,
  ReactElement
} from "react";
import {
  SystemInfo
} from "../../model/system-info";
import {
  LiteralType,
  LiteralUtilType
} from "../../util/literal-type";
import Icon from "../atom/icon";
import Letter from "../atom/letter";
import {
  create
} from "../create";


const SystemInfoPane = create(
  "SystemInfoPane",
  function ({
    info,
    kind
  }: {
    info: SystemInfo,
    kind: SystemInfoKind
  }): ReactElement {

    let {iconNode, value, decimalLength, unit} = getSystemInfoKindSpec(info, kind);
    let rightMainNode = (() => {
      if (value !== undefined && value !== null) {
        let rightMainNode = (
          <Fragment>
            <Letter string={value ?? 0} decimalLength={decimalLength} split={true}/>
            <Letter string={unit} unit={true}/>
          </Fragment>
        );
        return rightMainNode;
      } else {
        let rightMainNode = (
          <Fragment>
            <Letter string="—"/>
          </Fragment>
        );
        return rightMainNode;
      }
    })();
    let node = (
      <div className="pane">
        <div className="pane-head">
          <div className="pane-head-left">
            <Letter string="System"/>
          </div>
          <div className="pane-head-right">
            <span className="pane-head-icon">
              {iconNode}
            </span>
          </div>
        </div>
        <div className="pane-main">
          <div className="pane-main-left"/>
          <div className="pane-main-right">
            {rightMainNode}
          </div>
        </div>
      </div>
    );
    return node;

  }
);


function getSystemInfoKindSpec(info: SystemInfo, kind: SystemInfoKind): {iconNode: ReactElement, value: number | undefined, decimalLength: number | undefined, unit: string} {
  if (kind === "cpuLoad") {
    let spec = {
      iconNode: <><Icon name="microchip"/></>,
      value: info.cpu.load && Math.round(info.cpu.load),
      decimalLength: undefined,
      unit: "%"
    };
    return spec;
  } else if (kind === "cpuSpeed") {
    let spec = {
      iconNode: <><Icon name="microchip"/></>,
      value: info.cpu.speed,
      decimalLength: 1,
      unit: "GHz"
    };
    return spec;
  } else if (kind === "cpuTemperature") {
    let spec = {
      iconNode: <><Icon name="temperature-half"/><Icon name="microchip"/></>,
      value: info.cpu.temperature && Math.round(info.cpu.temperature),
      decimalLength: undefined,
      unit: "°C"
    };
    return spec;
  } else if (kind === "memoryPercentage") {
    let spec = {
      iconNode: <><Icon name="memory"/></>,
      value: info.memory.percentage && Math.round(info.memory.percentage),
      decimalLength: undefined,
      unit: "%"
    };
    return spec;
  } else if (kind === "memoryUsedSize") {
    let spec = {
      iconNode: <><Icon name="memory"/></>,
      value: info.memory.usedSize,
      decimalLength: 1,
      unit: "GB"
    };
    return spec;
  } else {
    let spec = {
      iconNode: <></>,
      value: undefined,
      decimalLength: undefined,
      unit: ""
    };
    return spec;
  }
}

const SYSTEM_INFO_KINDS = ["cpuLoad", "cpuSpeed", "cpuTemperature", "memoryPercentage", "memoryUsedSize"] as const;
export let SystemInfoKindUtil = LiteralUtilType.create(SYSTEM_INFO_KINDS);
export type SystemInfoKind = LiteralType<typeof SYSTEM_INFO_KINDS>;

export default SystemInfoPane;