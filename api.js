require('dotenv').config();

const axios = require('axios');
const async = require('async');
const moment = require('moment-timezone');
moment.tz.setDefault("UTC");
// Client (/src/main.js) ALSO uses same timezone default: "UTC"

// Axios
const $http = axios.create({
    // baseURL: `http://localhost:${process.env.PORT}/offline_api`,
    baseURL: `http://127.0.0.1:${process.env.PORT}/offline_api`,
});

function generateSessions(id) {
  let sessions = [];
  let nums = id.replace('tt', '').split('').map(item => {
    let num = parseInt(item);
    if (num === 0) { num = 1; }
    if (num > 6) { num = num - 2; }
    return num;
  });
  nums.splice(nums[3], 0, nums[0]);
  nums.shift();
  nums.forEach((num, index) => {
    let date = moment().startOf('day').add(index, 'days');
    for (let i = 0; i < num; i++) {
      let pos = index + i <= nums.length ? index + i : index + i - nums.length;
      let hours = nums[pos] + 12;
      let mins = nums[pos] < 2.5 ? 0 : nums[pos] < 5 ? 15 : nums[pos] < 7.5 ? 30 : 45;
      sessions.push({
        id: `${id}_${i}`,
        time: moment(date).add(hours, 'hours').add(mins, 'minutes'),
        seats: Math.round(200 - nums.reduce((acc, val) => { return acc + val; }) + (num * i))
      });
      // WR__
//        console.log('WR__ To Terminal Console, n\'est-ce pas?')
//        console.log('WR__ sessions[0] is: ', sessions[0])
        /*
         [nodemon] restarting due to changes...
         [nodemon] starting `node ./server.js`
         Example app listening on port 8000!
         (node:62781) DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
         parseQuery() will be replaced with getOptions() in the next major version of loader-utils.
         webpack: wait until bundle finished: /dist/build.js
         webpack built a79af28b131cec686b17 in 10135ms
         Hash: a79af28b131cec686b17
         Version: webpack 2.7.0
         Time: 10135ms
         Asset     Size  Chunks                    Chunk Names
         build.js  3.13 MB       0  [emitted]  [big]  main
         chunk    {0} build.js (main) 1.14 MB [entry] [rendered]
         [3] ./~/vue/dist/vue.common.js 268 kB {0} [built]
         [129] (webpack)/buildin/module.js 517 bytes {0} [built]
         [130] ./src/main.js 6.29 kB {0} [built]
         [131] (webpack)-hot-middleware/client.js?path=/__webpack_hmr&timeout=20000 6.68 kB {0} [built]
         [155] ./~/html-entities/index.js 231 bytes {0} [built]
         [159] ./~/moment-timezone/index.js 116 bytes {0} [built]
         [165] ./~/querystring-es3/index.js 127 bytes {0} [built]
         [166] ./~/strip-ansi/index.js 161 bytes {0} [built]
         [168] ./src/style.scss 1.01 kB {0} [built]
         [170] ./src/components/MovieFilter.vue 1.37 kB {0} [built]
         [172] ./src/components/MovieList.vue 1.37 kB {0} [built]
         [177] ./~/vue-resource/dist/vue-resource.es2015.js 35.9 kB {0} [built]
         [178] (webpack)-hot-middleware/client-overlay.js 1.82 kB {0} [built]
         [179] (webpack)-hot-middleware/process-update.js 3.88 kB {0} [built]
         [182] multi ./src/main.js webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000 40 bytes {0} [built]
         + 168 hidden modules
         webpack: Compiled successfully.
         WR__ To Terminal Console, n'est-ce pas?
         WR__ sessions[0] is:  { id: 'tt0379225_0',
         time: moment.utc("2017-09-07T15:15:00.000+00:00"),
         seats: 175 }
         WR__ To Terminal Console, n'est-ce pas?
         WR__ sessions[0] is:  { id: 'tt0379225_0',
         time: moment.utc("2017-09-07T15:15:00.000+00:00"),
         seats: 175 }
...
         */
    }
  });
  return sessions.sort((a, b) => { if (a.time < b.time) { return - 1 } else { return a.time > b.time; } });
}

function cleanData(movie) {
  if (movie.Rated === 'N/A' || movie.Rated === 'UNRATED' || movie.Rated === 'NOT RATED') {
    let last = parseInt(movie.imdbID[movie.imdbID.length - 1]);
    movie.Rated = last < 7 ? ( last < 4 ? 'G' : 'PG-13' ) : 'R';
  }
  return movie;
}

module.exports = {
  data: [],
  getData(callback) {
    if (!this.data.length) {
      let ids = process.env.IMDB_IDS.split(',');
      let data = [];
      async.each(
        ids,
        function (id, callback) {
          if (!data.find(item => item.id === id)) {
            $http.get(`?i=${id}`)
              .then(
                function (response) {
                  if (!response.data.Error) {
                    data.push({
                      id,
                      movie: cleanData(response.data),
                      sessions: generateSessions(id)
                    });
                  } else {
                    console.log(response.data.Error);
                  }
                  callback();
                },
                function (err) {
                  callback(err);
                }
              )
            ;
          } else {
            callback();
          }
        },
        (err) => {
          if (err) {
            callback(err, null);
          } else {
            this.data = ids.map(id => data.find(item => id === item.id) );
            callback(null, this.data);
          }
        }
      );
    } else {
      callback(null, this.data);
    }
  }
};
