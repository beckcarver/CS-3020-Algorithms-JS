const { StaticPool } = require("node-worker-threads-pool");

function nmPTP(arr, key, done) {
  const threads = 4;
  const pool = new StaticPool({
    size: threads,
    task: function(a) {
        let m = 0;
        for(let i = 0;  i < a.length; i++) {
            if(a[i] == this.workerData) m++;
        }
        return m;
    },
    workerData: key
  });

  const size = arr.length/threads;

  let res = 0, finished = 0;
  for(let i = 0; i < threads; i++) {
    (async () => {
      let r = await pool.exec(arr.slice(i*size, (i+1)*size));
      console.log("Result: " + r);
      res += r;
      finished++;
      if(finished == threads) {
        done(res);
        pool.destroy();
      }
    })();
  }
}

nmPTP([3,5,9,3,4,6,7,2,1,8,3,3,5,2,3,9], 3, console.log);
