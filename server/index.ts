//

import dotenv from "dotenv";
import express from "express";
import {
  Express,
  NextFunction,
  Request,
  Response
} from "express";
import {
  Dht22Sensor,
  Mhz19Sensor,
  Sensor
} from "./sensor";


dotenv.config({path: "./variable.env"});


export class Main {

  private application!: Express;
  private sensors!: {[T in string]?: Sensor<unknown>};

  public main(): void {
    this.application = express();
    this.sensors = {
      dht22: new Dht22Sensor(4),
      mhz19: new Mhz19Sensor("/dev/serial0")
    };
    this.setupBodyParsers();
    this.setupRouters();
    this.setupErrorHandler();
    this.listen();
  }

  private setupBodyParsers(): void {
    const urlencodedParser = express.urlencoded({extended: false});
    const jsonParser = express.json();
    this.application.use(urlencodedParser);
    this.application.use(jsonParser);
  }

  private setupRouters(): void {
    this.application.get("/sensor", async (request, response, next) => {
      const type = request.query.type as string;
      const sensor = this.sensors[type];
      if (sensor !== undefined) {
        if (process.env["DEBUG"] === "true") {
          response.json(await sensor.readDebug());
        } else {
          response.json(await sensor.read());
        }
      } else {
        response.status(500);
      }
    });
  }

  private setupErrorHandler(): void {
    const handler = function (error: any, request: Request, response: Response, next: NextFunction): void {
      response.status(500).end();
    };
    this.application.use(handler);
  }

  private listen(): void {
    this.application.listen(8080, () => {
      console.log("listening");
    });
  }

}


const main = new Main();
main.main();