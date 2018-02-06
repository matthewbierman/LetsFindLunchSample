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

const fetchNewLunch = (location) =>
{
    var host = window.location.protocol + '//' + window.location.hostname;
    var url = host + "/api/findLunch";
   
    url += "?location=" + location;
  
    var request = new XMLHttpRequest();
   
    request.open("GET", url, true); 
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function(){requestReadyStateChange(request);}; 
    request.send();
}

const btnFindLunchClick = () =>
{
    var location = document.getElementById("txtLocation").value;
  
    fetchNewLunch(location);
  
};

const btnClearClick = () =>
{
   document.getElementById("olLocations").innerHTML = "";
   document.getElementById("divLocations").style.display = 'none';
   document.getElementById("txtLocation").value  = "";
};



const documentReady = () =>
{
  document.getElementById("btnFindLunch").onclick = btnFindLunchClick;
  document.getElementById("btnClear").onclick = btnClearClick;
  document.getElementById("divLocations").style.display = 'none';
};

documentReady();