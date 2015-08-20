var argv = require('minimist')(process.argv.slice(2)),
    mongo = require('mongodb-core'),
    dgram = require("dgram"),
    udp = dgram.createSocket("udp4"),
    instances = require('libs/cluster-instances'),
    jsonb = require('json-buffer')


udp.on("error", function (err) {
  console.log("server error:\n" + err.stack);
  udp.close();
  process.exit(1)
})

udp.on("message", function (msg, rinfo) {
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
})

udp.bind(29017);

for ( var instance in instances.getInstances() ) {
  instance = instance.split(':')

  var cmd = jsonb({cmd: "status"})
  udp.send(cmd, 0, cmd.length, instance[1], instance[0])
}
