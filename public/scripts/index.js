const requestReadyStateChange = (request) =>
{
  if (request.readyState === XMLHttpRequest.DONE) 
  {
    if(request.status === 200)
    {
      listLunch(JSON.parse(request.responseText));
    }
    else if (request.status == 500)
    {
      alert("failed because Michael doesn't like my syntax :(");
    }
  }
};

const listLunch = (place) =>
{
  document.getElementById("divLocations").style.display = 'block';
  var olLocations = document.getElementById("olLocations");
  var listItem = document.createElement('li');
  var placeText = place.name + ":" + place.address;
  listItem.appendChild(document.createTextNode(placeText));
  olLocations.insertBefore(listItem, olLocations.firstChild);
}

const btnFindLunchClick = () =>
{
    var host = window.location.protocol + '//' + window.location.hostname;
    var url = host + "/api/findLunch";
    var location = document.getElementById("txtLocation").value;
  
    url += "?location=" + location;
  
    var request = new XMLHttpRequest();
   
    request.open("GET", url, true); 
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function(){requestReadyStateChange(request);}; 
    request.send();
};


const documentReady = () =>
{
  document.getElementById("btnFindLunch").onclick = btnFindLunchClick;
  document.getElementById("divLocations").style.display = 'none';
};

documentReady();