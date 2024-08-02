//

import * as react from "react";
import {ReactElement} from "react";
import {Room} from "/renderer/model/room";
import {LiteralType, LiteralUtilType} from "/renderer/util/literal-type";
import {Letter} from "/renderer/component/atom/letter";
import {create} from "/renderer/component/create";
import {Pane, PaneHeader, PaneMain} from "/renderer/component/compound/pane";


export const RoomPane = create(
  require("./room-pane.scss"), "RoomPane",
  function ({
    room,
    kind
  }: {
    room: Room,
    kind: RoomKind
  }): ReactElement {

    const {headNode, value, decimalLength, unit} = getRoomKindSpec(room, kind);

    return (
      <Pane>
        <PaneHeader>
          <div>
            <Letter string="Current" wide={true}/>
          </div>
          <div>
            {headNode}
          </div>
        </PaneHeader>
        <PaneMain>
          <div/>
          <div>
            {(value === null) ? (
              <Letter string="—"/>
            ) : (value === undefined) ? (
              <Letter string=" "/>
            ) : (
              <Letter string={value} decimalLength={decimalLength} split={true}/>
            )}
            {(unit !== null) && <Letter string={unit} unit={true}/>}
          </div>
        </PaneMain>
      </Pane>
    );

  }
);


function getRoomKindSpec(meteo: Room, kind: RoomKind): {headNode: ReactElement, value?: number | null, decimalLength: number, unit: string | null} {
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
  } else if (kind === "carbon") {
    const spec = {
      headNode: <><Letter string="Carbon" wide={true}/></>,
      value: meteo.carbon,
      decimalLength: 0,
      unit: "μU"
    };
    return spec;
  } else {
    const spec = {
      headNode: <></>,
      value: undefined,
      decimalLength: 0,
      unit: null
    };
    return spec;
  }
}

const ROOM_KINDS = ["temperature", "humidity", "discomfort", "carbon"] as const;
export const RoomKindUtil = LiteralUtilType.create(ROOM_KINDS);
export type RoomKind = LiteralType<typeof ROOM_KINDS>;