//

import * as react from "react";
import {
  Fragment,
  ReactElement
} from "react";
import {
  Room
} from "../../model/room";
import {
  LiteralType,
  LiteralUtilType
} from "../../util/literal-type";
import Icon from "../atom/icon";
import Letter from "../atom/letter";
import {
  create
} from "../create";


const RoomPane = create(
  "RoomPane",
  function ({
    room,
    kind
  }: {
    room: Room,
    kind: RoomKind
  }): ReactElement {

    const {headNode, value, decimalLength, unit} = getRoomKindSpec(room, kind);
    const node = (
      <div className="pane">
        <div className="pane-head">
          <div className="pane-head-left">
            <Letter string="Room" wide={true}/>
          </div>
          <div className="pane-head-right">
            {headNode}
          </div>
        </div>
        <div className="pane-main">
          <div className="pane-main-left">
            <span className="pane-main-icon">
              <Icon name={room.discomfortIconName} large={true}/>
            </span>
          </div>
          <div className="pane-main-right">
            {(value !== undefined) ? (
              <Fragment>
                <Letter string={value ?? 0} decimalLength={decimalLength} split={true}/>
                {(unit !== null) && <Letter string={unit} unit={true}/>}
              </Fragment>
            ) : (
              <Fragment>
                <Letter string="—"/>
                {(unit !== null) && <Letter string={unit} unit={true}/>}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
    return node;

  }
);


function getRoomKindSpec(meteo: Room, kind: RoomKind): {headNode: ReactElement, value: number | undefined, decimalLength: number | undefined, unit: string | null} {
  if (kind === "temperature") {
    const spec = {
      headNode: <><Letter string="Temp" wide={true}/></>,
      value: meteo.temperature,
      decimalLength: 1,
      unit: "°C"
    };
    return spec;
  } else if (kind === "humidity") {
    const spec = {
      headNode: <><Letter string="Humid" wide={true}/></>,
      value: meteo.humidity,
      decimalLength: 0,
      unit: "%"
    };
    return spec;
  } else if (kind === "discomfort") {
    const spec = {
      headNode: <><Letter string="Discomf" wide={true}/></>,
      value: meteo.discomfort,
      decimalLength: 1,
      unit: null
    };
    return spec;
  } else {
    const spec = {
      headNode: <></>,
      value: undefined,
      decimalLength: undefined,
      unit: null
    };
    return spec;
  }
}

const ROOM_KINDS = ["temperature", "humidity", "discomfort"] as const;
export const RoomKindUtil = LiteralUtilType.create(ROOM_KINDS);
export type RoomKind = LiteralType<typeof ROOM_KINDS>;

export default RoomPane;