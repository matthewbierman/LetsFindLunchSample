const getRandomPlace = (data) =>
{
  var randomIndex = Math.floor(Math.random() * data.results.length);
  console.log(randomIndex);
  var placeData = data.results[randomIndex];
  return {name:placeData.name, address: placeData.formatted_address};
}


const findLunch = (request, response) =>
{
  var location = request.query.location;
  
  if(location)
  {
    const clientRequest = require("request");
    const querystring = require('querystring');
    const googleMapsAPIURL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    
    var parameters =
        {
          key:process.env.GOOGLEAPIKEY,
          type:"restaurant",
          query:location,
        };
  
    var url = googleMapsAPIURL + "?" + querystring.stringify(parameters);

    const handleResponse = (error, clientResponse, body) =>
    {
        if (error)
        {
            console.log("error");
            console.log(error);

            response.status(500).send('something went wrong :(, JP why did you break the google?')
        }
        else
        {
            var place = getRandomPlace(body);
            response.json(place);
            response.status(200).send();
        }

    };

     clientRequest(url, { json: true, method:"get" }, handleResponse);
  }
  else
  {
    response.status(500).send("please include location in your request");
  }
  
};

module.exports = findLunch;