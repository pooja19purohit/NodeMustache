var	express        = require('express');
var app            = express();
var http           = require('http').Server(app);
var unirest        = require('unirest');
var fs = require('fs');
var mustache = require('mustache');

http.listen(3000);

app.use('/', express.static(__dirname + '/views'));
app.set('views', __dirname+'/views');
app.set('view engine', 'mustache');
/*app.set('view engine', 'mustache');
  app.set('views', __dirname + '/');
  //app.register(".mustache", require('stache'));
  app.use(express.static(__dirname + '/'));*/


console.log("----------");
console.log("Server started");

function loadTemplate(template) {
  //console.log((app.get('views') + '/' +template+ '.html').toString());
    return fs.readFileSync(app.get('views') + '/' +template+ '.html').toString();
}

app.get('/recipes', function(req, res){
  unirest.get('https://unhrecipe.herokuapp.com/rest/recipes')
  .end(function (response) {
    //var page = fs.readFileSync('listing.html', "utf8"); // bring in the HTML file
    var rData = response.body;
    //console.log(response.body);
    var html = mustache.to_html(loadTemplate('listAll'), rData);
    res.send(html);
    //console.log(response.body);
});
});

app.get('/getRecipe/:name/:value', function(req, res){
  unirest.get('https://unhrecipe.herokuapp.com/rest/recipes/getone/' + req.params.name + '/' + req.params.value)
  .end(function (response) {
    //var page = fs.readFileSync('listing.html', "utf8"); // bring in the HTML file
    var rData = response.body;
    console.log(response.body);
    var html = mustache.to_html(loadTemplate('recipePage'), rData);
    res.send(html);
    //console.log(response.body);
});
});

    //Setup your client
    //var client = http.createClient(80, 'https://unhrecipe.herokuapp.com');
    //Setup the request by passing the parameters in the URL (REST API)
    //var request = client.request('GET', '/rest/recipes', {"host":"https://unhrecipe.herokuapp.com"});


    /*request.addListener("response", function(response) { //Add listener to watch for the response
        var body = "";
        response.addListener("data", function(data) { //Add listener for the actual data
            body += data; //Append all data coming from api to the body variable
        });

        response.addListener("end", function() { //When the response ends, do what you will with the data
            var response = JSON.parse(body); //In this example, I am parsing a JSON response
            console.log(response);
        });
    });
    request.end();
    res.send(response); //Print the response to the screen*/
