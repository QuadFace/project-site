var fs = require('fs');
var express = require('express');
var app = express();

var exports = module.exports = {};

app.set('view engine', 'ejs');

function getImageList() {
	var tempImages = fs.readdirSync(__dirname);
	var images = [];
	for(var index in tempImages){
		if (tempImages[index].match(/\.(JPG|jpg|JPEG|jpeg|PNG|png|GIF|gif)/)) {
			images.push(tempImages[index]);
		}
	}
	return images;
}

exports.getImageList = getImageList;

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
	res.locals.images = getImageList();
	res.render("gallery");
});

var server = app.listen(process.env.PORT || 3000, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
