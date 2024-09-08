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

  let careerDice = document.getElementById("selectTraitCareerDice").value;
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

  let speciesDice = document.getElementById("selectTraitSpeciesDice").value;
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

