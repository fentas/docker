var dgram = require("dgram"),
    config = require('../config'),
    udp = dgram.createSocket("udp4")


function instance(host) {
  if ( typeof host == 'string' )
    host = host.split(':').map(function(data) { return {address: data[0], port: data[1]} })

  this.address = host.address
  this.port = host.port || config.udp.port

  this.data = {}
}

instance.prototype.emit = function(event) {
  var msg = {
    event: event,
    args: arguments.slice(1)
  }
  msg = new Buffer(JSON.stringify(msg))
  udp.send(msg, 0, msg.length, this.address, this.port)
}

instance.prototype.getFullAddress = function() {
  return this.address + ':' + this.port
}

instance.prototype.set = function(data, value) {
  if ( typeof data == 'object' ) {
    return extend(this.data, data)
  }
  return this.data[data] = key
}
instance.prototype.get = function(key) {
  return this.data[key]
}

module.exports = exports = instance
