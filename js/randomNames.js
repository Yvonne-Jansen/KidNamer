/*********************************************************************************
/* File:          randomNames.js
/* Authors:       Yvonne Jansen and Pierre Dragicevic <py@dataphys.org>
/* Description:   This file is part of Kid Namer. It loads a database table
                  containing a curated list of names with weights and ranks.
                  The weights should indicate how well a name corresponds to
                  some set criteria and the rank indicates the popularity of
                  that name. The ranks can be turned off if desired by setting
                  use_ranks to false.
*********************************************************************************/




function getListOfNames() {
  var xhttp = new XMLHttpRequest();

  
// load weighted names
  xhttp.open("GET", name_tb_uri);
  xhttp.send();
  xhttp.onloadend = function() {
    if(xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200)
    {
    // TODO: find a way to use the name defined in the variable db_tb_name instead of the hardcoded name_table.
      json = xhttp.responseText;
      name_table = JSON.parse(json).name_table;
      console.log(name_table);
    }
  }
}

function weightedRandomDraw(){
  var weight_index = name_table.columns.indexOf("weight");
  var n = Math.random(), amt=0, amt2=0;
  for(var i=0; i<name_table.records.length; i++){
    amt = amt2;
    amt2 += name_table.records[i][weight_index]; 
    if(amt < n && n <= amt2){
      return i;
    }
  }
}

function getRandomName() {
  var newName;
  var rank;
  var name_index = name_table.columns.indexOf("name");
  var rank_index = name_table.columns.indexOf("rank");

  do {
    // this is code to get a random name from a weighted list
    var index = weightedRandomDraw();
    newName = name_table.records[index][name_index];
    rank = name_table.records[index][rank_index];
  } while (nameExists(newName));
  // To simplify the return value, we write the rank at the end of the name and separate
  // the two items before writing them in the database.
  return (newName + rank);
}