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
      if (value !== undefined) {
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