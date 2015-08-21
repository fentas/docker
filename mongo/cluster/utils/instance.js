var dgram = require("dgram"),
    udp = dgram.createSocket("udp4")


function instance(host) {
  if ( typeof host == 'string' )
    host = host.split(':').map(function(data) { return {address: data[0], port: data[1]} })
  
  this.address = host.address
  this.port = host.port
}

instance.prototype.emit = function(event) {
  var msg = {
    event: event,
    args: arguments.slice(1)
  }
  msg = new Buffer(JSON.stringify(msg))
  udp.send(msg, 0, msg.length, this.address, this.port)
}

module.exports = exports = instance
