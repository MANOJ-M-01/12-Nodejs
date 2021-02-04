import http from 'http';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
const server=http.createServer((req,res)=>{
console.log('request was made:'+req.ul);
if(req.url==='/'){
    res.end("hai");
}
else if(req.url==='/about'){
    var a=__dirname+'/404.html';
    res.end(a);
}
else if(req.url==='/404'){
    res.writeHead(200,{'Content-Type':'text/html'});
    fs.createReadStream(__dirname+'/404.html');
}
else{
    res.write("<h1 style='color:black;font-size:80px;width:100%;text-align:center;margin-top:20%'>404 not found</h1>");
    res.end();
}
});

server.listen(3023);