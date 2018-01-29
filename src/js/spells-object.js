var spellsObject = (function() {

  var _all_spellsObject = null;

  function get(array) {
    var _get_allSpells = function(data) {
      _all_spellsObject = helper.csvToJSON(data);
      // clean up spell objects
      _all_spellsObject.forEach(function(arrayItem) {
        if (arrayItem) {

          // school
          var tempSchool = {};
          tempSchool.base = arrayItem.school;
          tempSchool.subschool = arrayItem.subschool;
          // add
          arrayItem.school = tempSchool;
          // remove
          delete arrayItem.subschool;

          // descriptors
          var tempDescriptor = {};
          tempDescriptor.acid = arrayItem.acid;
          tempDescriptor.air = arrayItem.air;
          tempDescriptor.chaotic = arrayItem.chaotic;
          tempDescriptor.cold = arrayItem.cold;
          tempDescriptor.curse = arrayItem.curse;
          tempDescriptor.darkness = arrayItem.darkness;
          tempDescriptor.death = arrayItem.death;
          tempDescriptor.disease = arrayItem.disease;
          tempDescriptor.earth = arrayItem.earth;
          tempDescriptor.electricity = arrayItem.electricity;
          tempDescriptor.emotion = arrayItem.emotion;
          tempDescriptor.evil = arrayItem.evil;
          tempDescriptor.fear = arrayItem.fear;
          tempDescriptor.fire = arrayItem.fire;
          tempDescriptor.force = arrayItem.force;
          tempDescriptor.good = arrayItem.good;
          tempDescriptor.language_dependent = arrayItem.language_dependent;
          tempDescriptor.lawful = arrayItem.lawful;
          tempDescriptor.light = arrayItem.light;
          tempDescriptor.mind_affecting = arrayItem.mind_affecting;
          tempDescriptor.pain = arrayItem.pain;
          tempDescriptor.poison = arrayItem.poison;
          tempDescriptor.shadow = arrayItem.shadow;
          tempDescriptor.sonic = arrayItem.sonic;
          tempDescriptor.water = arrayItem.water;
          for (var key in tempDescriptor) {
            if (tempDescriptor[key] == "1") {
              tempDescriptor[key] = true;
            } else {
              tempDescriptor[key] = false;
            };
          };
          tempDescriptor.string = arrayItem.descriptor;
          // add
          arrayItem.descriptor = tempDescriptor;
          // remove
          delete arrayItem.acid;
          delete arrayItem.air;
          delete arrayItem.chaotic;
          delete arrayItem.cold;
          delete arrayItem.curse;
          delete arrayItem.darkness;
          delete arrayItem.death;
          delete arrayItem.disease;
          delete arrayItem.earth;
          delete arrayItem.electricity;
          delete arrayItem.emotion;
          delete arrayItem.evil;
          delete arrayItem.fear;
          delete arrayItem.fire;
          delete arrayItem.force;
          delete arrayItem.good;
          delete arrayItem.language_dependent;
          delete arrayItem.lawful;
          delete arrayItem.light;
          delete arrayItem.mind_affecting;
          delete arrayItem.pain;
          delete arrayItem.poison;
          delete arrayItem.shadow;
          delete arrayItem.sonic;
          delete arrayItem.water;

          // description
          var tempDescription = {};
          tempDescription.short = arrayItem.short_description;
          tempDescription.plain = arrayItem.description;
          tempDescription.formated = arrayItem.description_formated;
          tempDescription.mythic = arrayItem.mythic_text;
          // add
          arrayItem.description = tempDescription;
          // remove
          delete arrayItem.description_formated;
          delete arrayItem.short_description;
          delete arrayItem.mythic_text;

          // level
          var tempLevel = {};
          tempLevel.sla = arrayItem.SLA_Level;
          tempLevel.sorcerer = arrayItem.sorcerer;
          tempLevel.wizard = arrayItem.wizard;
          tempLevel.cleric = arrayItem.cleric;
          tempLevel.druid = arrayItem.druid;
          tempLevel.ranger = arrayItem.ranger;
          tempLevel.bard = arrayItem.bard;
          tempLevel.paladin = arrayItem.paladin;
          tempLevel.alchemist = arrayItem.alchemist;
          tempLevel.summoner = arrayItem.summoner;
          tempLevel.witch = arrayItem.witch;
          tempLevel.inquisitor = arrayItem.inquisitor;
          tempLevel.oracle = arrayItem.oracle;
          tempLevel.antipaladin = arrayItem.antipaladin;
          tempLevel.magus = arrayItem.magus;
          tempLevel.adept = arrayItem.adept;
          tempLevel.mythic = arrayItem.mythic;
          tempLevel.bloodrager = arrayItem.bloodrager;
          tempLevel.shaman = arrayItem.shaman;
          tempLevel.psychic = arrayItem.psychic;
          tempLevel.medium = arrayItem.medium;
          tempLevel.mesmerist = arrayItem.mesmerist;
          tempLevel.occultist = arrayItem.occultist;
          tempLevel.spiritualist = arrayItem.spiritualist;
          tempLevel.skald = arrayItem.skald;
          tempLevel.investigator = arrayItem.investigator;
          tempLevel.hunter = arrayItem.hunter;
          for (var key in tempLevel) {
            if (!isNaN(parseInt(tempLevel[key], 10))) {
              tempLevel[key] = parseInt(tempLevel[key], 10);
            } else {
              tempLevel[key] = null;
            };
          };
          tempLevel.string = arrayItem.spell_level;
          // add
          arrayItem.level = tempLevel;
          // remove
          delete arrayItem.SLA_Level;
          delete arrayItem.sorcerer;
          delete arrayItem.wizard;
          delete arrayItem.cleric;
          delete arrayItem.druid;
          delete arrayItem.ranger;
          delete arrayItem.bard;
          delete arrayItem.paladin;
          delete arrayItem.alchemist;
          delete arrayItem.summoner;
          delete arrayItem.witch;
          delete arrayItem.inquisitor;
          delete arrayItem.oracle;
          delete arrayItem.antipaladin;
          delete arrayItem.magus;
          delete arrayItem.adept;
          delete arrayItem.mythic;
          delete arrayItem.bloodrager;
          delete arrayItem.shaman;
          delete arrayItem.psychic;
          delete arrayItem.medium;
          delete arrayItem.mesmerist;
          delete arrayItem.occultist;
          delete arrayItem.spiritualist;
          delete arrayItem.skald;
          delete arrayItem.investigator;
          delete arrayItem.hunter;

          // components
          var tempComponents = {};
          tempComponents.verbal = arrayItem.verbal;
          tempComponents.somatic = arrayItem.somatic;
          tempComponents.material = arrayItem.material;
          tempComponents.focus = arrayItem.focus;
          tempComponents.divine_focus = arrayItem.divine_focus;
          for (var key in tempComponents) {
            if (tempComponents[key] == "1") {
              tempComponents[key] = true;
            } else {
              tempComponents[key] = false;
            };
          };
          // add
          tempComponents.string = arrayItem.components;
          arrayItem.components = tempComponents
          // remove
          delete arrayItem.verbal;
          delete arrayItem.somatic;
          delete arrayItem.material;
          delete arrayItem.focus;
          delete arrayItem.divine_focus;

        };
      });
    };
    var _findSpell = function() {
      if (array) {
        array.forEach(function(arrayItem) {
          console.log(_all_spellsObject[arrayItem.index]);
        });
      } else {
        console.log(_all_spellsObject);
      };
    };
    if (_all_spellsObject == null) {
      helper.loadCsv("../db/spells.csv", function(data) {
        _get_allSpells(data);
        _findSpell();
      });
    } else {
      _findSpell();
    };
  };

  // exposed methods
  return {
    get: get
  };

})();