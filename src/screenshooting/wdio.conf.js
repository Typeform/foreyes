// wdio.conf.js
exports.config = {
    // ...
    plugins: {
      'wdio-screenshot': {}
    },
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: "firefox"
    }],
  };