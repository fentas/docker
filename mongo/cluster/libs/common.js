var argv = require('minimist')(process.argv.slice(2)),
    mongo = require('mongodb-core'),
    udp = require('../utils/udp'),
    middleware = require('../utils/middleware'),
    exec = require('../utils/exec'),
    util = require('util')



util.inherits(common, middleware)
function common() {
  this.instances = []
}

common.prototype.getInstances = function() {
  var env = process.env['MONGO_CLUSTER_INSTANCES']

  if ( env.text(/^https?:/) ) {

  }
  else if ( env.test(/^#/) ) {
    env = exec(env.substr(1))
    if ( env.code === 0 )
      this.instances = env.output
  }
  else this.instances = env

  if ( this.instances.test(/^(\d{3}\.\d{3})\.\d{3}\.\d{3},?)*$/) {
    this.instances = this.instances.split(',')
  }
  else throw new TypeError('Maleformed MONGO_CLUSTER_INSTANCES')

  return this.instances
}

common.prototype.brodcast = function() {
  for ( var i = 0 ; i < this.instances.length ; i++ ) {
    var instance = new instance(this.instances[i])
    instance.emit('status')
  }
}


module.exports = exports = new function() {
  var use = new middleware(),
      responses = {}

  use.on("status", function (instance) {
    
  })


  return use
}
