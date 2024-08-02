//

import * as react from "react";
import {ReactElement, useCallback, useState} from "react";
import useSWR from "swr";
import {MeteoFactory} from "/renderer/model/meteo";
import {MeteoKind} from "/renderer/component/compound/meteo-pane";
import {MenuButton, MenuButtonGroup} from "/renderer/component/atom/menu-button";
import {Letter} from "/renderer/component/atom/letter";
import {Icon} from "/renderer/component/atom/icon";
import {create} from "/renderer/component/create";
import {Page, PageFooter, PageMain} from "/renderer/component/page/page";
import MeteoPane from "/renderer/component/compound/meteo-pane/meteo-pane";


export const MeteoPage = create(
  require("./meteo-page.scss"), "MeteoPage",
  function ({
    show,
    onPreviousPage,
    onNextPage
  }: {
    show: boolean,
    onPreviousPage: () => unknown,
    onNextPage: () => unknown
  }): ReactElement | null {

    const [index, setIndex] = useState(0);
    const [kind, setKind] = useState<MeteoKind>("temperature");
    const {data: meteos} = useSWR("/meteo", () => MeteoFactory.fetch(5 * 1000), {refreshInterval: 5 * 60 * 1000});

    const handleToggleTemperature = useCallback(function (): void {
      setKind((kind) => {
        if (kind === "temperature") {
          return "maxTemperature";
        } else if (kind === "maxTemperature") {
          return "minTemperature";
        } else if (kind === "minTemperature") {
          return "temperature";
        } else {
          return "temperature";
        }
      });
    }, []);

    return (
      <Page show={show}>
        <PageMain>
          {(meteos !== undefined) && <MeteoPane meteo={meteos[index]} kind={kind}/>}
        </PageMain>
        <PageFooter>
          <MenuButtonGroup>
            <MenuButton onClick={onNextPage}><Icon name="page" simple={true}/></MenuButton>
            <Letter string="Weather" wide={true} simple={true}/>
          </MenuButtonGroup>
          <MenuButtonGroup>
            <MenuButton onClick={() => setKind("pressure")}><Letter string="A" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("precipitation")}><Letter string="P" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("humidity")}><Letter string="H" simple={true}/></MenuButton>
            <MenuButton onClick={handleToggleTemperature}><Letter string="T" simple={true}/></MenuButton>
            <MenuButton onClick={() => setIndex((index) => (index + 1) % 8)}><Icon name="next" simple={true}/></MenuButton>
          </MenuButtonGroup>
        </PageFooter>
      </Page>
    );

  }
);