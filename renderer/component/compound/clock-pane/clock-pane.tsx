//

import * as react from "react";
import {ReactElement} from "react";
import {Instant} from "/renderer/model/instant";
import {Letter} from "/renderer/component/atom/letter";
import {create} from "/renderer/component/create";
import {Pane, PaneHeader, PaneMain} from "/renderer/component/compound/pane";


export const ClockPane = create(
  require("./clock-pane.scss"), "ClockPane",
  function ({
    instant
  }: {
    instant: Instant
  }): ReactElement {

    return (
      <Pane>
        <PaneHeader>
          <div>
            {(instant.prefix !== null) ? <Letter wide={true}>{instant.prefix}</Letter> : <Letter length={2} split={true}>{instant.year ?? ""}</Letter>}
            <Letter>{(instant.year !== null) ? instant.yearSeparator : ""}</Letter>
            <Letter length={2} split={true}>{instant.month ?? ""}</Letter>
            <Letter>{(instant.month !== null) ? instant.monthSeparator : ""}</Letter>
            <Letter length={2} split={true}>{instant.day ?? ""}</Letter>
            <Letter styleName="weekday-separator">{(instant.weekday !== null) ? instant.weekdaySeparator : ""}</Letter>
            <Letter length={1} split={true}>{instant.weekday ?? ""}</Letter>
          </div>
          <div>
            <Letter styleName="hairia-prefix">{(instant.hairia !== null) ? "H" : ""}</Letter>
            <Letter length={4} split={true}>{instant.hairia ?? ""}</Letter>
          </div>
        </PaneHeader>
        <PaneMain>
          <div/>
          <div>
            <Letter length={2} split={true}>{instant.hours ?? ""}</Letter>
            <Letter>{instant.hoursSeparator}</Letter>
            <Letter length={2} split={true}>{instant.minutes ?? ""}</Letter>
            <Letter>{instant.minutesSeparator}</Letter>
            <Letter length={2} split={true}>{instant.seconds ?? ""}</Letter>
          </div>
        </PaneMain>
      </Pane>
    );

  }
);