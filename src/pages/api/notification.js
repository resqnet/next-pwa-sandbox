const webPush = require("web-push");

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

const Notification = (req, res) => {
  if (req.method == "POST") {
    const { subscription } = req.body;
    console.log(subscription);
    webPush
      .sendNotification(
        subscription,
        JSON.stringify({
          title: "Hello Web Push",
          message: "web push notification!",
        })
      )
      .then((response) => {
        console.log("send");
        res.writeHead(response.statusCode, response.headers).end(response.body);
        console.log(response);
      })
      .catch((err) => {
        if ("statusCode" in err) {
          console.log(err);
          res.writeHead(err.statusCode, err.headers).end(err.body);
        } else {
          console.log(err);
          res.statusCode = 500;
          res.end();
        }
      });
  } else {
    console.log("end");
    res.statusCode = 405;
    res.end();
  }
};

export default Notification;
