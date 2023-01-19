function nmPMR(arr, key, cb) {
  var Parallel = require('paralleljs'),
      p = new Parallel(arr);

  global.process.env.key = key;
  p.map(function(i) { return i == global.process.env.key; })
   .reduce(function(d) { return d[0] + d[1]; })
   .then(cb);
}

nmPMR([3,5,9,3,4,6,7,2,1,8,3,3,5,2,3,9], 3, console.log);
