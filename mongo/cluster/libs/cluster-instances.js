var exec = require('../utils/exec')

module.exports = exports = function() {
  var instances = []

  function parseEnv() {
    var env = process.env['MONGO_CLUSTER_INSTANCES']

    if ( env.text(/^https?:/) ) {

    }
    else if ( env.test(/^#/) ) {
      env = exec(env.substr(1))
      if ( env.code === 0 )
        instances = env.output
    }
    else if ( env.test(/^(\d{3}\.\d{3})\.\d{3}\.\d{3},?)*$/) {
      instances = env.split(',')
    }
    else {
      //common.error male formed
      process.exit(2)
    }
  }

  return {
    getInstances: function() {
      parseEnv()
      return instances
    }
  }
}
