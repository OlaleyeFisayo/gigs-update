import { WebClient } from "@slack/web-api";

const slackChannel = process.env.CHANNEL_NAME;
const token = process.env.TOKEN;

export const sendGig = async (gigs: any[]) => {
  const web = new WebClient(token);
  if (gigs.length > 0) {
    const newGigs = gigs.slice(0, 5);
    newGigs.forEach(async (gig) => {
      const message = `${gig.title}\n${gig.link}\n${gig.date}\n\t${gig.content}`;
      await web.chat.postMessage({
        text: message,
        channel: slackChannel,
      });
    });
  }
};
