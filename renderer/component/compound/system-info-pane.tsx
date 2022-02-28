//

import * as react from "react";
import {
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
    let rightNode = (() => {
      if (value !== undefined) {
        let rightNode = (
          <div className="meteo-right">
            <span className="meteo-value-number">
              <Letter string={value ?? 0} decimalLength={decimalLength} split={true}/>
            </span>
            <span className="meteo-value-unit">
              <Letter string={unit} unit={true}/>
            </span>
          </div>
        );
        return rightNode;
      } else {
        let rightNode = (
          <div className="meteo-right">
            <span className="meteo-value-none">
              <Letter string="—"/>
            </span>
          </div>
        );
        return rightNode;
      }
    })();
    let node = (
      <div className="meteo">
        <div className="meteo-date">
          <div className="meteo-date-current">
            System
          </div>
          <div className="meteo-kind-icon">
            {iconNode}
          </div>
        </div>
        <div className="clock-time">
          {rightNode}
        </div>
      </div>
    );
    return node;

  }
);


function getSystemInfoKindSpec(info: SystemInfo, kind: SystemInfoKind): {iconNode: ReactElement, value: number | undefined, decimalLength: number | undefined, unit: string} {
  if (kind === "cpuLoad") {
    let spec = {
      iconNode: <><Icon name="microchip"/><Icon name="percent"/></>,
      value: info.cpu.load && Math.round(info.cpu.load),
      decimalLength: undefined,
      unit: "%"
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

const SYSTEM_INFO_KINDS = ["cpuLoad"] as const;
export let SystemInfoKindUtil = LiteralUtilType.create(SYSTEM_INFO_KINDS);
export type SystemInfoKind = LiteralType<typeof SYSTEM_INFO_KINDS>;

export default SystemInfoPane;