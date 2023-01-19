// https://stackoverflow.com/questions/50355260/inline-child-processes-in-node-js

function nmPDC(arr, key, done) {
  const fileSync = require('tmp').fileSync;
  const writeFileSync = require('fs').writeFileSync;
  const fork = require('child_process').fork;
  
  function createWorker(fn) {
    const tmpobj = fileSync({ tmpdir: "." });
    writeFileSync(tmpobj.name,
        `process.on('message', function(m) {` +
        `${fn.toString()}` +
        `nmPDC(m[0], m[1]);});`);
  
    return fork(tmpobj.name);
  }
  
  function nMatches(arr, key) {
    let m = 0;
    for(let i = 0;  i < arr.length; i++) {
      if(arr[i] == key) m++;
    }
    return m;
  }
  
  const thresh = 2;
  if(arr.length <= thresh) {
      if(done === undefined) process.send(nMatches(arr, key));
      else done(nMatches(arr, key));
      return;
  }

  let left = arr.slice(0, arr.length/2),
      right = arr.slice(arr.length/2, arr.length);

  let res = undefined,
      t = createWorker(nmPDC);

  t.on("message", function(n) {
    console.log("Left worker: " + n);
    if(res === undefined) res = n;
    else {
      if(done === undefined) process.send(res + n);
      else done(res + n);
    }
    t.kill();
  }).send([left, key]);
  nmPDC(right, key, function(n) {
    console.log("Right worker: " + n);
    if(res === undefined) res = n;
    else {
      if(done === undefined) process.send(res + n);
      else done(res + n);
    }
  });
}

nmPDC([3,5,9,3,4,6,7,2,1,8,3,3,5,2,3,9], 3, console.log);
