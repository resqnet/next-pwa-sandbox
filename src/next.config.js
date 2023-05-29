const withPWA = require("@imbios/next-pwa")({
  dest: "public",
  register: true,
  scope: "/",
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrinctMode: true,
});
