//

import * as react from "react";
import {
  ReactElement,
  useCallback,
  useState
} from "react";
import Youtube from "react-youtube";
import {
  DataUtil
} from "../../util/data";
import {
  create
} from "../create";


const Background = create(
  "Background",
  function ({
  }: {
  }): ReactElement | null {

    const [playing, setPlaying] = useState(false);

    const handlePlay = useCallback(function (): void {
      setPlaying(true);
    }, []);

    const data = DataUtil.create({
      playing: {if: playing, true: "true"}
    });
    const node = (
      <div className="background">
        <Youtube
          className="background-youtube"
          videoId="PpA04dF6xzY"
          opts={{playerVars: {autoplay: 1, playsinline: 1, controls: 0, disablekb: 1, mute: 1, loop: 1}}}
          onPlay={handlePlay}
          {...data}
        />
      </div>
    );
    return node;

  }
);


export default Background;