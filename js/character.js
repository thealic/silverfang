careersList = Object.values(careers)
speciesList = Object.values(species)
giftsList   = Object.values(gifts)
//merged = {...careers, ...careers};

function updateSelect(selectId, item) {
  document.getElementById(selectId).innerHTML = item.innerHTML;
}

function addOptionsFromList(selectId, list) {
  for (ii = 0; ii < list.length; ii++) {
    let option = document.createElement("option");
    option.text = list[ii].name;
    document.getElementById(selectId).appendChild(option)
  }
}

function setCareer(name) {
  clearSkillsTable("career")

  //TODO:

  let careerDice = document.getElementById("select-trait-dice-career").value;
  if( careerDice == "Choose") {
    alert("You must have a Career Dice set");
    document.getElementById("selectCareer").value = "Choose";
    return;
  } 

  cur = careers[name];

  for(jj = 0; jj < cur.skills.length; jj++) {
    setSkillCareerDice(cur.skills[jj], careerDice);
  }
}

function setSpecies(name) {
  clearSkillsTable("species")

  let speciesDice = document.getElementById("select-trait-dice-species").value;
  if( speciesDice == "Choose") {
    alert("You must have a species dice set");
    document.getElementById("selectSpecies").value = "Choose species";
    return;
  } 

  cur = species[name];
  console.log(cur);
  document.getElementById("inputHabitat").placeholder = cur.habitat;
  document.getElementById("inputSenses").placeholder = cur.senses;
  document.getElementById("inputDiet").placeholder = cur.diet;
  document.getElementById("inputWeapons").placeholder = cur.weapons;
  document.getElementById("inputCycle").placeholder = cur.cycle;

  for(jj = 0; jj < cur.skills.length; jj++) {
    setSkillSpeciesDice(cur.skills[jj], speciesDice);
  }
}

function setSkillCareerDice(skill, dice) {
  //Iterate through the skills table
  table = document.getElementById("tableSkills")
  skillTableRows = table.children[1].children

  for(ii = 0; ii < skillTableRows.length; ii++) {
    row = skillTableRows[ii];
    columns = row.children;
    if(skill == columns[2].innerHTML) {
      columns[5].innerHTML = dice;
    }
  }
}


function setSkillSpeciesDice(skill, dice) {
  //Iterate through the skills table
  table = document.getElementById("tableSkills")
  skillTableRows = table.children[1].children

  for(ii = 0; ii < skillTableRows.length; ii++) {
    row = skillTableRows[ii];
    columns = row.children;
    if(skill == columns[2].innerHTML) {
      columns[4].innerHTML = dice;
    }
  }
}

function clearSkillsTable(column) {
  
  if(column == "species"){
    colnumber = 4;
  } else if (column == "career") {
    colnumber = 5;
  }


  table = document.getElementById("tableSkills")
  skillTableRows = table.children[1].children

  for(ii = 0; ii < skillTableRows.length; ii++) {
    row = skillTableRows[ii];
    columns = row.children;
    columns[colnumber].innerHTML = "";
  }
}

function setBattleStats() {

// TODO
}

function getDice(name, asInt = false) {
    name = name.toLowerCase();
    var id;

    switch(name) {
        case "species":
            id = "select-trait-dice-species";
            break;
        case "career":
            id = "select-trait-dice-career";
            break;
        case "body":
            id = "select-trait-dice-body";
            break;
        case "speed":
            id = "select-trait-dice-speed";
            break;
        case "mind":
            id = "select-trait-dice-mind";
            break;
        case "will":
            id = "select-trait-dice-will";
            break;
        default:
            console.error("Not a valid dice name");
            return null;
    }

    var value = document.getElementById(id).value;

    // Check if value is sane
    if(value == "Choose") {
        console.warn("Dice has not been set yet")
        return null;
    }

    if(asInt) {
        var slice = value.slice(1);
        num = parseInt(slice, 10);
        return num;
    }

    return value;
}

function diceCheck() {
    // Routine: check the state of all dice. If they're all set - trigger
    // further events
    var diceNames = ["species", "career", "body", "speed", "mind", "will"]
    isComplete = true;

    for (index in diceNames) {
        var value = getDice(diceNames[index])
        if(value == null) {
            isComplete = false;
            break; 
        }
    }

    if(isComplete) {
        alert("All dice are set!");
        populateBattleStats();
    }
}

function setInitiative(str) {
    var element = document.getElementById("input-battle-initiative");
    element.value = str;
}

function setSprint(num) {
    var element = document.getElementById("input-battle-sprint");
    element.value = num;
}

function setDash(num) {
    var element = document.getElementById("input-battle-dash");
    element.value = num;
}

function setRun(num) {
    var element = document.getElementById("input-battle-run");
    element.value = num;
}

function populateBattleStats() {
    // This function will populate all of the battle statistics
    var strideElement = document.getElementById("input-battle-stride");
    var dashElement = document.getElementById("input-battle-dash");
    var sprintElement = document.getElementById("input-battle-sprint");
    var runElement = document.getElementById("input-battle-run");


    var mindDice = getDice("mind")
    var speedDice = getDice("speed");
    var speedNum = getDice("speed", true);
    var bodyNum = getDice("body", true);

    var inistr = speedDice + ", " + mindDice;
    setInitiative(inistr);
    setSprint(speedNum);

    var dash = speedNum / 2; // Will be fine because all dice values are even 

    if(bodyNum > speedNum) {
        dash++;
    }

    setDash(dash);

    var run = bodyNum + speedNum + dash;
    setRun(run);
}

