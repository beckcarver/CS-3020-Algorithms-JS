function vaMR(v1, v2, cb) {
  var v = v1.map(function(d, i) {
          return [d, v2[i]];
        }),
      Parallel = require('paralleljs'),
      p = new Parallel(v);

  p.map(function(i) { return i[0] + i[1]; })
   .then(cb);
}

vaMR([1,2,3,4,5], [2,5,3,3,1], function(i) { console.log(i); });
