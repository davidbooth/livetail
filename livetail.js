var fs       = require("fs"),
    util     = require("util"),
    events   = require("events");

var position = 0,
    reading  = false,
    file     = null,
    self     = null;


function livetail(watchFile){

  self = this;
  events.EventEmitter.call(this);
  file = watchFile;

  fs.watch(file, function(event, filename){
      readFile();
  });

}

livetail.prototype.__proto__ = events.EventEmitter.prototype;


function readFile(){

    if(!reading){
      reading = true;
      fs.open(file,"r",function(err, fd){

          if(err) throw err;

          readUntilEOF(fd);
                
      });
    }


}

function checkFileSize(){

  var stats = fs.statSync(file);

  if(stats.size < position){
    position = stats.size;
    return true;
  }

  return false;

}


function readUntilEOF(fd){

  var buffer = new Buffer(1000);

  fs.read(fd, buffer, 0, 1000, position, function(err, bytesRead, buffer){

      if(err) throw err;

      if(bytesRead == 0 && checkFileSize()){
        readUntilEOF(fd);
        return;
      }

      sendData(buffer.toString(null,null, bytesRead ));

      position += bytesRead;

      if(bytesRead == buffer.length){
        readUntilEOF(fd);
      }else{
        fs.close(fd);
        reading = false;
      }


  });

}

function sendData(string){

    if(string){
        self.emit('data',string);
    }

}

exports.livetail = livetail;