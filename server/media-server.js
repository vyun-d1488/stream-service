import NodeMediaServer from "node-media-server";
import config from "./config/default";
import helpers from "./helpers/helpers";

const User = require("./database/index").User;
const rmtp_server = config.rtmp_server;
const nms = new NodeMediaServer(rmtp_server);

nms.on("prePublish", (id, StreamPath, args) => {
      let stream_key = getStreamKeyFromStreamPath(StreamPath);
      console.log(
            "[NodeEvent on prePublish]",
            `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
      );

      User.findOne({ stream_key: stream_key }, (err, user) => {
            if (!err) {
                  if (!user) {
                        let session = nms.getSession(id);
                        session.reject();
                  } else {
                        helpers.generateStreamThumbnail(stream_key);
                  }
            }
      });
});

const getStreamKeyFromStreamPath = (path) => {
      let parts = path.split("/");
      return parts[parts.length - 1];
};

export default nms;
