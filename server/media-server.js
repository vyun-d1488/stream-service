import NodeMediaServer from "node-media-server";
import config from "./config/default";

const rmtp_server = config.rtmp_server;
const nms = new NodeMediaServer(rmtp_server);

nms.on("prePublish", (id, StreamPath, args) => {
      let stream_key = getStreamKeyFromStreamPath(StreamPath);

      console.log(
            "[NodeEvent on prePublish]",
            `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
      );
});

const getStreamKeyFromStreamPath = (path) => {
      let parts = path.split("/");
      return parts[parts.length - 1];
};

export default nms;
