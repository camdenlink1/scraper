var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.use(express.static(__dirname));

app.get('/per_game', function(req, res){
    // The URL we will scrape from - in our example Anchorman 2.

    url = 'http://www.basketball-reference.com/players/j/jamesle01.html';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    var json;
    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            //console.log(response);
            var $ = cheerio.load(html);
            json = {
                "seasons" : {

                }
            };
            var count = 0;
            var season = "";
            //console.log($);
            // Finally, we'll define the variables we're going to capture
            $('#per_game tr').each(function() {
                var data = $(this);
                if (data.attr('id')) {
                    console.log(data.attr('id'));
                    season = data.attr('id').substring(data.attr('id').indexOf('.') + 1);
                    json["seasons"][data.attr('id').substring(data.attr('id').indexOf('.') + 1)] = {};
                    count++;

                    data.find('td').each(function(index, value) {
                        if (typeof value.children[0].data != 'undefined') {    
                            console.log(value.children[0].data);
                            json["seasons"][season][value.attribs['data-stat']] = value.children[0].data;
                        }
                        else {
                            console.log(value.children[0].children[0].data);
                            json["seasons"][season][value.attribs['data-stat']] = value.children[0].children[0].data;
                        }    
                    });
                }
                

            });
            //console.log(json);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(json));
        }
    })
    
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;