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
            <Letter wide={true}>Current</Letter>
          </div>
          <div>
            {headNode}
          </div>
        </PaneHeader>
        <PaneMain>
          <div/>
          <div>
            {(value === null) ? (
              <Letter>—</Letter>
            ) : (value === undefined) ? (
              <Letter> </Letter>
            ) : (
              <Letter decimalLength={decimalLength} split={true}>{value}</Letter>
            )}
            {(unit !== null) && <Letter unit={true}>{unit}</Letter>}
          </div>
        </PaneMain>
      </Pane>
    );

  }
);


function getRoomKindSpec(meteo: Room, kind: RoomKind): {headNode: ReactElement, value?: number | null, decimalLength: number, unit: string | null} {
  if (kind === "temperature") {
    const spec = {
      headNode: <><Letter wide={true}>Temp</Letter></>,
      value: meteo.temperature,
      decimalLength: 1,
      unit: "°C"
    };
    return spec;
  } else if (kind === "humidity") {
    const spec = {
      headNode: <><Letter wide={true}>Humid</Letter></>,
      value: meteo.humidity,
      decimalLength: 0,
      unit: "%"
    };
    return spec;
  } else if (kind === "discomfort") {
    const spec = {
      headNode: <><Letter wide={true}>Disconf</Letter></>,
      value: meteo.discomfort,
      decimalLength: 1,
      unit: null
    };
    return spec;
  } else if (kind === "carbon") {
    const spec = {
      headNode: <><Letter wide={true}>Carbon</Letter></>,
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