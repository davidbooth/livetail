livetail
========

Node.js implementation for tailing a file. Like tail -f

#Setup:
```
var livetail = require("livetail").livetail;
var tail = new livetail('testfile.txt');
```

#Usage:
```
tail.on('data',function(data){
  console.log(data);
});
```
#Live Streaming Log with Socket.io Example:
Checkout the example folder.