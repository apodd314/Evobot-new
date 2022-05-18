import { i18n } from "../utils/i18n.js";
import { canModifyQueue } from "../utils/queue.js";

export default {
  name: "clear",
  description: i18n.__("stop.description"),
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply(i18n.__("stop.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");

    queue.songs.shift();
    queue.songs = [1];
    queue.player.stop();

    queue.textChannel.send(i18n.__mf("stop.result", { author: message.author })).catch(console.error);
  }
};
