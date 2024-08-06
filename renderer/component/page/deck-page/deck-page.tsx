//

import * as react from "react";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Page, PageFooter, PageMain} from "/renderer/component/page/page";
import {MenuButton, MenuButtonGroup} from "/renderer/component/atom/menu-button";
import {Letter} from "/renderer/component/atom/letter";
import {Icon} from "/renderer/component/atom/icon";
import {CommandButton} from "/renderer/component/compound/command-button";


export const DeckPage = create(
  require("./deck-page.scss"), "DeckPage",
  function ({
    show,
    onPreviousPage,
    onNextPage
  }: {
    show: boolean,
    onPreviousPage: () => unknown,
    onNextPage: () => unknown
  }): ReactElement | null {

    return (
      <Page show={show}>
        <PageMain>
          <div styleName="list">
            <CommandButton name="discord.toggleMute"/>
            <CommandButton name="discord.toggleMute"/>
          </div>
        </PageMain>
        <PageFooter>
          <MenuButtonGroup>
            <MenuButton onClick={onNextPage}><Icon name="page" simple={true}/></MenuButton>
            <Letter wide={true} simple={true}>Deck</Letter>
          </MenuButtonGroup>
          <MenuButtonGroup>
          </MenuButtonGroup>
        </PageFooter>
      </Page>
    );

  }
);