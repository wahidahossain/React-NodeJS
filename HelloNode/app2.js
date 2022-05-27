var http=require('http');
var server=http.Server(function(req,res) {
    res.end('<p>hello world</p><script>alert("hello world")</script>');
});

server.listen(8080);