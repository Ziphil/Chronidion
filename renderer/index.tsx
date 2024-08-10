//

import {library as fontawesomeLibrary} from "@fortawesome/fontawesome-svg-core";
import {fab as iconFab} from "@fortawesome/free-brands-svg-icons";
import {fasl as iconFasl} from "@fortawesome/sharp-light-svg-icons";
import * as react from "react";
import {render} from "react-dom";
import Root from "./component/root";


class Main {

  public main(): void {
    this.setupIcon();
    this.render();
  }

  private setupIcon(): void {
    fontawesomeLibrary.add(iconFasl, iconFab);
  }

  private render(): void {
    render(<Root/>, document.getElementById("root"));
  }

}


const main = new Main();
main.main();