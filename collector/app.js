
var express = require('express'),
    faye = require('faye'),
    Redis   = require('ioredis'),
    Promise = require('bluebird'),
    compression = require('compression'),

    session = require('express-session'),

    app        = express(),
    redis      = new Redis(process.env.REDISTOGO_URL);


app.use(session({secret: process.env.SESSION_SECRET || 'keyboard cat'}));

app.use(compression());
app.use(express.static(__dirname + '/public'));


app.post('/time', function(req, res){

  // respond with the time
  var n = Date.now();
  res.status(200).send('' + n);

  var t = parseInt(req.query.t, 10);
  var k = '-sync--' + req.query.k;

  if(req.query.t && req.query.k && (k.length < 30)){
    redis.multi()
      .append(k, [n, t].join(',') + ';')
      .expire(k, 10)
      .exec()
      .then(function(results){
        console.log(n,t)

        // H-A-C-K-Y
        // trim keys with lots of data
        if(results[0][1] > 1500){ // characters != items

          console.log("...triming " + k)

          redis
            .get(k)
            .then(function(d){
              var items = d.split(';');
              console.log('>> from ' + items.length + ' to ' + ~~(items.length/2));
              var trimmed = items.slice(~~(items.length/2)).join(';');
              console.log(trimmed)
              return redis.multi()
                .set(k, trimmed)
                .expire(k, 10)
                .exec()
            })
            .then(function(){
              console.log('..trimmed')
            })
            .catch(function(e){
              console.error(e);
            })
        }
      })
    
    bayeux.getClient().publish('/data', [k, n, t]);
  }
  
});


app.get('/data', function(req, res, next){
  redis
    //todo scan
    .keys('-sync--*')
    .then(function(keys){
      return Promise.map(keys, function(key){
        return redis
          .get(key)
          .then(function(data){
            return {
              key: key,
              data: data.split(';').map(function(t){
                return t.split(',').map(parseFloat);
              }).filter(function(d){
                return d[0];
              })
            }
          })
      })

    })
    .then(function(all){
      res.send(all)
    })
})



bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

var server = app.listen(process.env.PORT || 3000, function () {

  bayeux.attach(server);
  var host = server.address().address;
  var port = server.address().port;

  console.log('Collector at http://%s:%s', host, port);

});


