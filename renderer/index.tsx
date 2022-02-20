//

import {
  library as fontawesomeLibrary
} from "@fortawesome/fontawesome-svg-core";
import {
  fas as iconFas
} from "@fortawesome/free-solid-svg-icons";
import * as react from "react";
import {
  render
} from "react-dom";
import Root from "./component/root";


class Main {

  public main(): void {
    this.setupIcon();
    this.render();
  }

  private setupIcon(): void {
    fontawesomeLibrary.add(iconFas);
  }

  private render(): void {
    require("./component/root.scss");
    render(<Root/>, document.getElementById("root"));
  }

}


let main = new Main();
main.main();