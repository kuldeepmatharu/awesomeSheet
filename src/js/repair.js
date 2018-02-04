var repair = (function() {

  var _debug = false;

  // legacy sheet update
  function _update_440andBelow(characterObject) {
    if (_debug) {
      console.log("\tlegacy repair");
    };
    // --------------------------------------------------
    // repair spell notes
    if (characterObject.spells.book) {
      for (var i in characterObject.spells.book) {
        for (var j in characterObject.spells.book[i]) {
          if (characterObject.spells.book[i][j].length > 0) {
            for (var k in characterObject.spells.book[i][j]) {
              if (!("note" in characterObject.spells.book[i][j][k]) && typeof characterObject.spells.book[i][j][k].note != "string") {
                if (_debug) {
                  console.log("\trepair spell notes");
                };
                characterObject.spells.book[i][j][k].note = "";
              };
            };
          };
        };
      };
    };
    // --------------------------------------------------
    // repair item array
    if (typeof characterObject.equipment.item == "string" || !characterObject.equipment.item) {
      if (_debug) {
        console.log("\trepair item array");
      };
      characterObject.equipment.item = [];
    };
    // --------------------------------------------------
    // repair note array
    if (typeof characterObject.notes.character == "string" || typeof characterObject.notes.story == "string") {
      if (_debug) {
        console.log("\trepair note array");
      };
      characterObject.notes.character = [];
      characterObject.notes.story = [];
    };
    // --------------------------------------------------
    // repair custom skills array
    if (typeof characterObject.skills.custom == "string" || !characterObject.skills.custom) {
      if (_debug) {
        console.log("\trepair custom skills array");
      };
      characterObject.skills.custom = [];
    };
    // --------------------------------------------------
    // repair custom skills
    if ("custom_1" in characterObject.skills || "custom_2" in characterObject.skills || "custom_3" in characterObject.skills || "custom_4" in characterObject.skills || "custom_5" in characterObject.skills || "custom_6" in characterObject.skills || "custom_7" in characterObject.skills || "custom_8" in characterObject.skills) {
      if (_debug) {
        console.log("\trepair custom skills");
      };
      var skillKeys = ["custom_1", "custom_2", "custom_3", "custom_4", "custom_5", "custom_6", "custom_7", "custom_8"];
      for (var i = 0; i < skillKeys.length; i++) {
        if (characterObject.skills[skillKeys[i]].name != "" || characterObject.skills[skillKeys[i]].ranks || characterObject.skills[skillKeys[i]].misc) {
          var newSkill = characterObject.skills[skillKeys[i]];
          characterObject.skills.custom.push(newSkill);
        };
        delete characterObject.skills[skillKeys[i]];
      };
    };
    // --------------------------------------------------
    // repair concentration bonus object
    if (typeof characterObject.spells.concentration.bonuses != "object" || !characterObject.spells.concentration.bonuses) {
      if (_debug) {
        console.log("\trepair concentration bonus object");
      };
      characterObject.spells.concentration.bonuses = {
        str_bonus: false,
        dex_bonus: false,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false,
        level: false,
        half_level: false
      };
    };
    // --------------------------------------------------
    // repair initiative object
    if (typeof characterObject.basics.initiative != "object" || typeof characterObject.basics.initiative.bonuses != "object" || !characterObject.basics.initiative.bonuses) {
      if (_debug) {
        console.log("\trepair initiative object");
      };
      characterObject.basics.initiative = {
        misc: "",
        temp: "",
        feat: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false
        }
      };
    };
    // --------------------------------------------------
    // repair size object
    if (typeof characterObject.basics.size != "object" || "size_bonus" in characterObject.defense.ac) {
      if (_debug) {
        console.log("\trepair size object");
      };
      var size = characterObject.basics.size;
      if (size == "M" || size == "m" || size == "medium" || size == "Medium" || size != "") {
        size = "Medium";
      } else if (size == "") {
        size = false;
      };
      characterObject.basics.size = {
        category: "",
        size_modifier: 0,
        special_size_modifier: 0,
        size_modifier_fly: 0,
        size_modifier_stealth: 0
      };
      if (size) {
        characterObject.basics.size.category = size;
      };
      delete characterObject.defense.ac.size_bonus;
      delete characterObject.offense.cmb.size;
      delete characterObject.offense.cmd.size;
      delete characterObject.offense.melee_attack.size;
      delete characterObject.offense.ranged_attack.size;
      characterObject.offense.cmb.bonuses.special_size = true;
      characterObject.offense.cmd.bonuses.special_size = true;
      characterObject.offense.melee_attack.bonuses.size = true;
      characterObject.offense.ranged_attack.bonuses.size = true;
      characterObject.skills.fly.bonuses.size_modifier_fly = true;
      characterObject.skills.stealth.bonuses.size_modifier_stealth = true;
    };
    // --------------------------------------------------
    // repair alignment
    if (["Lawful Good", "Lawful Neutral", "Lawful Evil", "Neutral Good", "Neutral", "Neutral Evil", "Chaotic Good", "Chaotic Neutral", "Chaotic Evil", ""].indexOf(characterObject.basics.alignment) === -1) {
      if (_debug) {
        console.log("\trepair alignment");
      };
      if (["Lawful Good", "Lawful good", "lawful good", "LG", "Lg", "lg"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Lawful Good";
      };
      if (["Lawful Neutral", "Lawful neutral", "lawful neutral", "LN", "Ln", "ln"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Lawful Neutral";
      };
      if (["Lawful Evil", "Lawful evil", "lawful evil", "LE", "Le", "le"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Lawful Evil";
      };
      if (["Neutral Good", "Neutral good", "neutral good", "NG", "Ng", "ng"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Neutral Good";
      };
      if (["Neutral", "Neutral", "neutral", "N", "n"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Neutral";
      };
      if (["Neutral Evil", "Neutral evil", "neutral evil", "NE", "Ne", "ne"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Neutral Evil";
      };
      if (["Chaotic Good", "Chaotic good", "chaotic good", "CG", "Cg", "cg"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Chaotic Good";
      };
      if (["Chaotic Neutral", "Chaotic neutral", "chaotic neutral", "CN", "Cn", "cn"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Chaotic Neutral";
      };
      if (["Chaotic Evil", "Chaotic evil", "chaotic evil", "CE", "Ce", "ce"].indexOf(characterObject.basics.alignment) > -1) {
        characterObject.basics.alignment = "Chaotic Evil";
      };
    };
    // --------------------------------------------------
    // repair armor
    if (typeof characterObject.equipment.armor != "object") {
      if (_debug) {
        console.log("\trepair armor");
      };
      characterObject.equipment.armor = {
        armor: "",
        check_penalty: "",
        max_dex: "",
        shield: ""
      };
      if (characterObject.equipment.body_slots.armor != "") {
        characterObject.equipment.armor.armor = characterObject.equipment.body_slots.armor;
      };
      if (characterObject.equipment.body_slots.shield != "") {
        characterObject.equipment.armor.shield = characterObject.equipment.body_slots.shield;
      };
      if (characterObject.defense.ac.max_dex != "") {
        characterObject.equipment.armor.max_dex = characterObject.defense.ac.max_dex;
      };
      if (characterObject.defense.ac.check_penalty != "") {
        characterObject.equipment.armor.check_penalty = characterObject.defense.ac.check_penalty;
      };
      delete characterObject.equipment.body_slots.armor;
      delete characterObject.equipment.body_slots.shield;
      delete characterObject.defense.ac.max_dex;
      delete characterObject.defense.ac.check_penalty;
    };
    // --------------------------------------------------
    // repair racial save bonuses
    var ifRacial = function(key, object) {
      if (key in object) {
        if (object.racial != "" && !isNaN(object.racial)) {
          if (object.misc != "" && !isNaN(object.misc)) {
            if (_debug) {
              console.log("\trepair racial save bonuses");
            };
            object.misc = object.misc + object.racial;
          } else {
            object.misc = object.racial;
          };
        };
        delete object[key];
      };
    };
    ifRacial("racial", characterObject.defense.fortitude);
    ifRacial("racial", characterObject.defense.reflex);
    ifRacial("racial", characterObject.defense.will);
    // --------------------------------------------------
    // repair classes
    if (!characterObject.basics.classes || typeof characterObject.basics.class == "string") {
      if (_debug) {
        console.log("\trepair classes");
      };
      characterObject.basics.classes = [{
        classname: "",
        level: "",
        hp: "",
        fortitude: "",
        reflex: "",
        will: "",
        ranks: "",
        bab: ""
      }];
      // move class to classes
      if (characterObject.basics.class != "") {
        characterObject.basics.classes[0].classname = characterObject.basics.class;
      };
      // move level to classes
      if (characterObject.basics.level != "") {
        characterObject.basics.classes[0].level = parseInt(characterObject.basics.level, 10);
        characterObject.basics.level = "";
      };
      // remove con bonus from hp and add it to classes
      if (characterObject.defense.hp.total != "") {
        var conMod = 0;
        if (characterObject.statistics.stats.con.temp_score != "") {
          conMod = Math.floor((parseInt(characterObject.statistics.stats.con.temp_score, 10) - 10) / 2);
        } else {
          conMod = Math.floor((parseInt(characterObject.statistics.stats.con.score, 10) - 10) / 2);
        };
        var conHp = conMod * characterObject.basics.classes[0].level;
        characterObject.basics.classes[0].hp = characterObject.defense.hp.total - conHp;
        characterObject.defense.hp.total = "";
      };
      // move bab
      if (characterObject.offense.base_attack != "") {
        characterObject.basics.classes[0].bab = parseInt(characterObject.offense.base_attack, 10);
        characterObject.offense.base_attack = "";
        characterObject.offense.base_attack_bonuses = "";
      };
      // move base saves
      if (characterObject.defense.fortitude.base != "") {
        characterObject.basics.classes[0].fortitude = characterObject.defense.fortitude.base;
      };
      if (characterObject.defense.reflex.base != "") {
        characterObject.basics.classes[0].reflex = characterObject.defense.reflex.base;
      };
      if (characterObject.defense.will.base != "") {
        characterObject.basics.classes[0].will = characterObject.defense.will.base;
      };
      delete characterObject.basics.class;
    };
    // --------------------------------------------------
    // repair caster level check
    if (!characterObject.spells.caster_level_check) {
      if (_debug) {
        console.log("\trepair caster level check");
      };
      characterObject.spells.caster_level_check = {
        current: "",
        misc: "",
        temp: "",
        feat: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: true,
          half_level: false
        }
      };
    };
    // --------------------------------------------------
    // repair encumbrance
    if ("light" in characterObject.equipment.encumbrance || "medium" in characterObject.equipment.encumbrance || "heavy" in characterObject.equipment.encumbrance || "lift" in characterObject.equipment.encumbrance || "drag" in characterObject.equipment.encumbrance) {
      if (_debug) {
        console.log("\trepair encumbrance");
      };
      delete characterObject.equipment.encumbrance.light;
      delete characterObject.equipment.encumbrance.medium;
      delete characterObject.equipment.encumbrance.heavy;
      delete characterObject.equipment.encumbrance.lift;
      delete characterObject.equipment.encumbrance.drag;
    };
    // --------------------------------------------------
    // repair xp
    if (typeof characterObject.basics.xp == "string" && !characterObject.basics.xp == "") {
      if (_debug) {
        console.log("\trepair xp");
      };
      characterObject.basics.xp = parseInt(characterObject.basics.xp.replace(/,/g, ""), 10);
    };
    // --------------------------------------------------
    // repair wealth
    if (typeof characterObject.equipment.wealth.platinum == "string" && !characterObject.equipment.wealth.platinum == "") {
      if (_debug) {
        console.log("\trepair wealth platinum");
      };
      characterObject.equipment.wealth.platinum = parseInt(characterObject.equipment.wealth.platinum.replace(/,/g, ""), 10);
    };
    if (typeof characterObject.equipment.wealth.gold == "string" && !characterObject.equipment.wealth.gold == "") {
      if (_debug) {
        console.log("\trepair wealth gold");
      };
      characterObject.equipment.wealth.gold = parseInt(characterObject.equipment.wealth.gold.replace(/,/g, ""), 10);
    };
    if (typeof characterObject.equipment.wealth.silver == "string" && !characterObject.equipment.wealth.silver == "") {
      if (_debug) {
        console.log("\trepair wealth silver");
      };
      characterObject.equipment.wealth.silver = parseInt(characterObject.equipment.wealth.silver.replace(/,/g, ""), 10);
    };
    if (typeof characterObject.equipment.wealth.copper == "string" && !characterObject.equipment.wealth.copper == "") {
      if (_debug) {
        console.log("\trepair wealth copper");
      };
      characterObject.equipment.wealth.copper = parseInt(characterObject.equipment.wealth.copper.replace(/,/g, ""), 10);
    };
    // --------------------------------------------------
    // repair events array
    if (!characterObject.hasOwnProperty("events")) {
      if (_debug) {
        console.log("\trepair events array");
      };
      characterObject.events = [];
    };
    // --------------------------------------------------
    // repair xp and next level
    if (typeof characterObject.basics.xp == "string" || typeof characterObject.basics.xp == "number") {
      if (_debug) {
        console.log("\trepair xp and next level");
      };
      var oldXp;
      if (typeof characterObject.basics.xp == "number") {
        oldXp = characterObject.basics.xp;
      } else if (typeof characterObject.basics.xp == "string") {
        oldXp = parseInt(characterObject.basics.xp.replace(/,/g, ""), 10);
      };
      if (isNaN(oldXp)) {
        oldXp = "";
      };
      characterObject.basics.xp = {};
      characterObject.basics.xp.total = oldXp;
    };
    // --------------------------------------------------
    // repair speed
    if (typeof characterObject.basics.speed == "string" || typeof characterObject.basics.speed == "number" || characterObject.basics.speed == "" || typeof characterObject.basics.speed != "object") {
      if (_debug) {
        console.log("\trepair speed");
      };
      var oldSpeed = characterObject.basics.speed;
      characterObject.basics.speed = {};
      characterObject.basics.speed.land = oldSpeed;
    };
    // --------------------------------------------------
    // repair character image
    if (!characterObject.basics.character_image) {
      if (_debug) {
        console.log("\trepair character image");
      };
      characterObject.basics.character_image = {
        uploaded: false,
        background: "",
        color: {
          r: "",
          g: "",
          b: ""
        },
        image: "",
        orientation: "",
        position: {
          x: "",
          y: ""
        },
        size: {
          width: "",
          height: ""
        },
        scale: ""
      };
    };
    // --------------------------------------------------
    // repair attack types
    if (characterObject.offense.attack.melee.length > 0) {
      for (var i = 0; i < characterObject.offense.attack.melee.length; i++) {
        if (!characterObject.offense.attack.melee[i].type && characterObject.offense.attack.melee[i].type != "") {
          if (_debug) {
            console.log("\trepair attack types melee");
          };
          characterObject.offense.attack.melee[i].type = "";
        };
      };
    };
    if (characterObject.offense.attack.ranged.length > 0) {
      for (var i = 0; i < characterObject.offense.attack.ranged.length; i++) {
        if (!characterObject.offense.attack.ranged[i].type && characterObject.offense.attack.ranged[i].type != "") {
          if (_debug) {
            console.log("\trepair attack types ranged");
          };
          characterObject.offense.attack.ranged[i].type = "";
        };
      };
    };
    // --------------------------------------------------
    // repair stats
    if (!("enhancement" in characterObject.statistics.stats.str) || !("enhancement" in characterObject.statistics.stats.dex) || !("enhancement" in characterObject.statistics.stats.con) || !("enhancement" in characterObject.statistics.stats.int) || !("enhancement" in characterObject.statistics.stats.wis) || !("enhancement" in characterObject.statistics.stats.cha)) {
      if (_debug) {
        console.log("\trepair stats");
      };
      for (var key in characterObject.statistics.stats) {
        characterObject.statistics.stats[key].current = "";
        characterObject.statistics.stats[key].modifier = "";
        characterObject.statistics.stats[key].base = "";
        characterObject.statistics.stats[key].enhancement = "";
        characterObject.statistics.stats[key].misc = "";
        characterObject.statistics.stats[key].racial = "";
        characterObject.statistics.stats[key].temp = "";
        var score = parseInt(characterObject.statistics.stats[key].score, 10);
        var tempScore = parseInt(characterObject.statistics.stats[key].temp_score, 10);
        characterObject.statistics.stats[key].base = score;
        if (!isNaN(tempScore)) {
          characterObject.statistics.stats[key].temp = (tempScore - score);
        } else {
          characterObject.statistics.stats[key].temp = "";
        };
        delete characterObject.statistics.stats[key].score;
        delete characterObject.statistics.stats[key].temp_score;
        delete characterObject.statistics.stats[key].temp_modifier;
      };
    };
    // --------------------------------------------------
    // repair events
    if ("events" in characterObject) {
      if (characterObject.events.length > 0) {
        for (var i = 0; i < characterObject.events.length; i++) {
          if (characterObject.events[i].event.aggregateValue) {
            if (_debug) {
              console.log("\trepair events");
            };
            characterObject.events[i].event.aggregate_value = characterObject.events[i].event.aggregateValue;
            delete characterObject.events[i].event.aggregateValue;
          };
        };
      };
    } else {
      characterObject.events = [];
    };
    // --------------------------------------------------
    // repair character image cover and contain
    if ("cover" in characterObject.basics.character_image || "contain" in characterObject.basics.character_image) {
      if (_debug) {
        console.log("\trepair character image cover and contain");
      };
      delete characterObject.basics.character_image.cover;
      delete characterObject.basics.character_image.contain;
    };
    // --------------------------------------------------
    // repair character image size
    if (!characterObject.basics.character_image.size) {
      if (_debug) {
        console.log("\trepair character image size");
      };
      characterObject.basics.character_image.size = {
        width: "",
        height: ""
      };
    };
    // --------------------------------------------------
    // repair character image uploaded
    if (!("uploaded" in characterObject.basics.character_image)) {
      if (_debug) {
        console.log("repair character image uploaded");
      };
      if (characterObject.equipment.potion_viles_oils != "") {
        characterObject.basics.character_image.uploaded = true;
      } else {
        characterObject.basics.character_image.uploaded = false;
      };
    };
    // --------------------------------------------------
    // repair equipment
    if (!characterObject.equipment.potion_viles_oils && characterObject.equipment.potion_viles_oils != "") {
      if (_debug) {
        console.log("\trepair equipment");
      };
      characterObject.equipment.potion_viles_oils = "";
    };
    if (!characterObject.equipment.scrolls && characterObject.equipment.scrolls != "") {
      characterObject.equipment.scrolls = "";
    };
    // --------------------------------------------------
    // repair skills
    if (!("all" in characterObject.skills)) {
      if (_debug) {
        console.log("\trepair skills");
      };
      characterObject.skills.all = {};
      if ("acrobatics" in characterObject.skills) {
        characterObject.skills.all.acrobatics = characterObject.skills.acrobatics;
      };
      if ("appraise" in characterObject.skills) {
        characterObject.skills.all.appraise = characterObject.skills.appraise;
      };
      if ("bluff" in characterObject.skills) {
        characterObject.skills.all.bluff = characterObject.skills.bluff;
      };
      if ("climb" in characterObject.skills) {
        characterObject.skills.all.climb = characterObject.skills.climb;
      };
      if ("craft_1" in characterObject.skills) {
        characterObject.skills.all.craft_1 = characterObject.skills.craft_1;
      };
      if ("craft_2" in characterObject.skills) {
        characterObject.skills.all.craft_2 = characterObject.skills.craft_2;
      };
      if ("diplomacy" in characterObject.skills) {
        characterObject.skills.all.diplomacy = characterObject.skills.diplomacy;
      };
      if ("disable_device" in characterObject.skills) {
        characterObject.skills.all.disable_device = characterObject.skills.disable_device;
      };
      if ("disguise" in characterObject.skills) {
        characterObject.skills.all.disguise = characterObject.skills.disguise;
      };
      if ("escape_artist" in characterObject.skills) {
        characterObject.skills.all.escape_artist = characterObject.skills.escape_artist;
      };
      if ("fly" in characterObject.skills) {
        characterObject.skills.all.fly = characterObject.skills.fly;
      };
      if ("handle_animal" in characterObject.skills) {
        characterObject.skills.all.handle_animal = characterObject.skills.handle_animal;
      };
      if ("heal" in characterObject.skills) {
        characterObject.skills.all.heal = characterObject.skills.heal;
      };
      if ("intimidate" in characterObject.skills) {
        characterObject.skills.all.intimidate = characterObject.skills.intimidate;
      };
      if ("knowledge_arcana" in characterObject.skills) {
        characterObject.skills.all.knowledge_arcana = characterObject.skills.knowledge_arcana;
      };
      if ("knowledge_dungeoneering" in characterObject.skills) {
        characterObject.skills.all.knowledge_dungeoneering = characterObject.skills.knowledge_dungeoneering;
      };
      if ("knowledge_engineering" in characterObject.skills) {
        characterObject.skills.all.knowledge_engineering = characterObject.skills.knowledge_engineering;
      };
      if ("knowledge_geography" in characterObject.skills) {
        characterObject.skills.all.knowledge_geography = characterObject.skills.knowledge_geography;
      };
      if ("knowledge_history" in characterObject.skills) {
        characterObject.skills.all.knowledge_history = characterObject.skills.knowledge_history;
      };
      if ("knowledge_local" in characterObject.skills) {
        characterObject.skills.all.knowledge_local = characterObject.skills.knowledge_local;
      };
      if ("knowledge_nature" in characterObject.skills) {
        characterObject.skills.all.knowledge_nature = characterObject.skills.knowledge_nature;
      };
      if ("knowledge_nobility" in characterObject.skills) {
        characterObject.skills.all.knowledge_nobility = characterObject.skills.knowledge_nobility;
      };
      if ("knowledge_planes" in characterObject.skills) {
        characterObject.skills.all.knowledge_planes = characterObject.skills.knowledge_planes;
      };
      if ("knowledge_religion" in characterObject.skills) {
        characterObject.skills.all.knowledge_religion = characterObject.skills.knowledge_religion;
      };
      if ("linguistics" in characterObject.skills) {
        characterObject.skills.all.linguistics = characterObject.skills.linguistics;
      };
      if ("perception" in characterObject.skills) {
        characterObject.skills.all.perception = characterObject.skills.perception;
      };
      if ("perform_1" in characterObject.skills) {
        characterObject.skills.all.perform_1 = characterObject.skills.perform_1;
      };
      if ("perform_2" in characterObject.skills) {
        characterObject.skills.all.perform_2 = characterObject.skills.perform_2;
      };
      if ("profession_1" in characterObject.skills) {
        characterObject.skills.all.profession_1 = characterObject.skills.profession_1;
      };
      if ("profession_2" in characterObject.skills) {
        characterObject.skills.all.profession_2 = characterObject.skills.profession_2;
      };
      if ("ride" in characterObject.skills) {
        characterObject.skills.all.ride = characterObject.skills.ride;
      };
      if ("sense_motive" in characterObject.skills) {
        characterObject.skills.all.sense_motive = characterObject.skills.sense_motive;
      };
      if ("sleight_of_hand" in characterObject.skills) {
        characterObject.skills.all.sleight_of_hand = characterObject.skills.sleight_of_hand;
      };
      if ("spellcraft" in characterObject.skills) {
        characterObject.skills.all.spellcraft = characterObject.skills.spellcraft;
      };
      if ("stealth" in characterObject.skills) {
        characterObject.skills.all.stealth = characterObject.skills.stealth;
      };
      if ("survival" in characterObject.skills) {
        characterObject.skills.all.survival = characterObject.skills.survival;
      };
      if ("swim" in characterObject.skills) {
        characterObject.skills.all.swim = characterObject.skills.swim;
      };
      if ("use_magic_device" in characterObject.skills) {
        characterObject.skills.all.use_magic_device = characterObject.skills.use_magic_device;
      };
      delete characterObject.skills.acrobatics;
      delete characterObject.skills.appraise;
      delete characterObject.skills.bluff;
      delete characterObject.skills.climb;
      delete characterObject.skills.craft_1;
      delete characterObject.skills.craft_2;
      delete characterObject.skills.diplomacy;
      delete characterObject.skills.disable_device;
      delete characterObject.skills.disguise;
      delete characterObject.skills.escape_artist;
      delete characterObject.skills.fly;
      delete characterObject.skills.handle_animal;
      delete characterObject.skills.heal;
      delete characterObject.skills.intimidate;
      delete characterObject.skills.knowledge_arcana;
      delete characterObject.skills.knowledge_dungeoneering;
      delete characterObject.skills.knowledge_engineering;
      delete characterObject.skills.knowledge_geography;
      delete characterObject.skills.knowledge_history;
      delete characterObject.skills.knowledge_local;
      delete characterObject.skills.knowledge_nature;
      delete characterObject.skills.knowledge_nobility;
      delete characterObject.skills.knowledge_planes;
      delete characterObject.skills.knowledge_religion;
      delete characterObject.skills.linguistics;
      delete characterObject.skills.perception;
      delete characterObject.skills.perform_1;
      delete characterObject.skills.perform_2;
      delete characterObject.skills.profession_1;
      delete characterObject.skills.profession_2;
      delete characterObject.skills.ride;
      delete characterObject.skills.sense_motive;
      delete characterObject.skills.sleight_of_hand;
      delete characterObject.skills.spellcraft;
      delete characterObject.skills.stealth;
      delete characterObject.skills.survival;
      delete characterObject.skills.swim;
      delete characterObject.skills.use_magic_device;
    };
    // --------------------------------------------------
    // repair custom skills
    if (characterObject.skills.custom.length > 0) {
      for (var i = 0; i < characterObject.skills.custom.length; i++) {
        if (!("racial" in characterObject.skills.custom[i])) {
          if (_debug) {
            console.log("\t\t repair custom skills");
          };
          characterObject.skills.custom[i].racial = "";
        };
        if (!("trait" in characterObject.skills.custom[i])) {
          if (_debug) {
            console.log("\t\t repair custom skills");
          };
          characterObject.skills.custom[i].trait = "";
        };
        if (!("feat" in characterObject.skills.custom[i])) {
          if (_debug) {
            console.log("\t\t repair custom skills");
          };
          characterObject.skills.custom[i].feat = "";
        };
      };
    };
    // --------------------------------------------------
    // repair concentration stats
    if (!("trait" in characterObject.spells.concentration)) {
      if (_debug) {
        console.log("\t\t repair spell stats");
      };
      characterObject.spells.concentration.trait = "";
    };
    // repair caster level stats
    if (!("trait" in characterObject.spells.caster_level_check)) {
      if (_debug) {
        console.log("\t\t caster level stats");
      };
      characterObject.spells.caster_level_check.trait = "";
    };
    // --------------------------------------------------
    // repair item
    if (Array.isArray(characterObject.equipment.item)) {
      if (_debug) {
        console.log("\trepair item");
      };
      var tempItems = characterObject.equipment.item.slice();
      characterObject.equipment.item = {};
      characterObject.equipment.item.all = tempItems;
    };
    if (!("weight" in characterObject.equipment.item)) {
      if (_debug) {
        console.log("\trepair item weight");
      };
      characterObject.equipment.item.weight = {};
      characterObject.equipment.item.weight.current = "";
    };
    if (!("value" in characterObject.equipment.item)) {
      if (_debug) {
        console.log("\trepair item value");
      };
      characterObject.equipment.item.value = {};
      characterObject.equipment.item.value.current = "";
    };
    // --------------------------------------------------
    // repair spell bonus
    if (!("bonus" in characterObject.spells)) {
      if (_debug) {
        console.log("\trepair spells bonus");
      };
      characterObject.spells.bonus = {};
      characterObject.spells.bonus.level_0 = "";
      characterObject.spells.bonus.level_1 = "";
      characterObject.spells.bonus.level_2 = "";
      characterObject.spells.bonus.level_3 = "";
      characterObject.spells.bonus.level_4 = "";
      characterObject.spells.bonus.level_5 = "";
      characterObject.spells.bonus.level_6 = "";
      characterObject.spells.bonus.level_7 = "";
      characterObject.spells.bonus.level_8 = "";
      characterObject.spells.bonus.level_9 = "";
    };
    // --------------------------------------------------
    // repair skills
    for (var i in characterObject.skills.all) {
      if (!("racial" in characterObject.skills.all[i])) {
        if (_debug) {
          console.log("\trepair skill", i, "racial");
        };
        characterObject.skills.all[i].racial = "";
      };
      if (!("feat" in characterObject.skills.all[i])) {
        if (_debug) {
          console.log("\trepair skill", i, "feat");
        };
        characterObject.skills.all[i].feat = "";
      };
      if (!("trait" in characterObject.skills.all[i])) {
        if (_debug) {
          console.log("\trepair skill", i, "trait");
        };
        characterObject.skills.all[i].trait = "";
      };
    };
    // --------------------------------------------------
    // repair spells
    if (typeof characterObject.spells.dc.level_0 != "object") {
      if (_debug) {
        console.log("\trepair spell dc");
      };
      var dcObject = function(level, oldDc) {
        var object = {
          spell_level: level,
          misc: "",
          temp: "",
          feat: "",
          trait: "",
          current: "",
          bonuses: {
            str_bonus: false,
            dex_bonus: false,
            con_bonus: false,
            int_bonus: false,
            wis_bonus: false,
            cha_bonus: false,
            level: false,
            half_level: false,
            spell_level: false,
            plus_ten: false
          }
        };
        if (oldDc) {
          object.misc = oldDc;
        };
        return object;
      };
      characterObject.spells.dc.level_0 = dcObject(0, characterObject.spells.dc.level_0);
      characterObject.spells.dc.level_1 = dcObject(1, characterObject.spells.dc.level_1);
      characterObject.spells.dc.level_2 = dcObject(2, characterObject.spells.dc.level_2);
      characterObject.spells.dc.level_3 = dcObject(3, characterObject.spells.dc.level_3);
      characterObject.spells.dc.level_4 = dcObject(4, characterObject.spells.dc.level_4);
      characterObject.spells.dc.level_5 = dcObject(5, characterObject.spells.dc.level_5);
      characterObject.spells.dc.level_6 = dcObject(6, characterObject.spells.dc.level_6);
      characterObject.spells.dc.level_7 = dcObject(7, characterObject.spells.dc.level_7);
      characterObject.spells.dc.level_8 = dcObject(8, characterObject.spells.dc.level_8);
      characterObject.spells.dc.level_9 = dcObject(9, characterObject.spells.dc.level_9);
    };
    // --------------------------------------------------
    // repair caster level check and concentration
    if (!("racial" in characterObject.spells.concentration)) {
      if (_debug) {
        console.log("\trepair concentration racial");
      };
      characterObject.spells.concentration.racial = "";
    };
    if (!("racial" in characterObject.spells.caster_level_check)) {
      if (_debug) {
        console.log("\trepair caster level check racial");
      };
      characterObject.spells.caster_level_check.racial = "";
    };
    // --------------------------------------------------
    // repair initiative trait
    if (!("trait" in characterObject.basics.initiative)) {
      if (_debug) {
        console.log("\trepair initiative trait");
      };
      characterObject.basics.initiative.trait = "";
    };
    // --------------------------------------------------
    if (!("school" in characterObject.spells)) {
      if (_debug) {
        console.log("\trepair spell school");
      };
      characterObject.spells.school = "";
    };
    // --------------------------------------------------
    if (!("opposition" in characterObject.spells)) {
      if (_debug) {
        console.log("\trepair spell opposition");
      };
      characterObject.spells.opposition = "";
    };
    // --------------------------------------------------
    if (!("domains" in characterObject.spells)) {
      if (_debug) {
        console.log("\trepair spell domains");
      };
      characterObject.spells.domains = "";
    };
    // --------------------------------------------------
    if (!("bloodline" in characterObject.spells)) {
      if (_debug) {
        console.log("\trepair spell bloodline");
      };
      characterObject.spells.bloodline = "";
    };
    // --------------------------------------------------
    if (!("power" in characterObject.statistics)) {
      if (_debug) {
        console.log("\trepair power");
      };
      characterObject.statistics.power = [];
    };
  };

  function _update_500(characterObject) {
    if (_debug) {
      console.log("\tupgrade character to 5.0.0");
    };
    tempCharacterObject = JSON.parse(JSON.stringify(characterObject));

    characterObject.awesomeSheet = {};
    characterObject.awesomeSheet.awesome = true;
    characterObject.awesomeSheet.version = "5.0.0";

    var basics = {
      character: {
        name: tempCharacterObject.basics.name,
        race: tempCharacterObject.basics.race,
        alignment: tempCharacterObject.basics.alignment,
        deity: tempCharacterObject.basics.deity,
        height: tempCharacterObject.basics.height,
        weight: tempCharacterObject.basics.weight,
        age: tempCharacterObject.basics.age,
        gender: tempCharacterObject.basics.gender,
        hero_points: tempCharacterObject.basics.hero_points,
        description: tempCharacterObject.basics.character_description,
        size: {
          category: tempCharacterObject.basics.size.category,
          modifier: {
            base: "",
            special: "",
            fly: "",
            stealth: ""
          }
        }
      },
      classes: {
        all: tempCharacterObject.basics.classes
      },
      experience: {
        level: "",
        next_level: "",
        total: tempCharacterObject.basics.xp.total,
        advancement_speed: tempCharacterObject.basics.xp.advancement_speed,
        needed: ""
      },
      initiative: {
        misc: tempCharacterObject.basics.initiative.misc,
        temp: tempCharacterObject.basics.initiative.temp,
        feat: tempCharacterObject.basics.initiative.feat,
        trait: tempCharacterObject.basics.initiative.trait,
        current: "",
        bonuses: {
          str: tempCharacterObject.basics.initiative.bonuses.str,
          dex: tempCharacterObject.basics.initiative.bonuses.dex,
          con: tempCharacterObject.basics.initiative.bonuses.con,
          int: tempCharacterObject.basics.initiative.bonuses.int,
          wis: tempCharacterObject.basics.initiative.bonuses.wis,
          cha: tempCharacterObject.basics.initiative.bonuses.cha,
          level: tempCharacterObject.basics.initiative.bonuses.level,
          half_level: tempCharacterObject.basics.initiative.bonuses.half_level
        }
      },
      speed: {
        land: tempCharacterObject.basics.speed.land,
        fly: tempCharacterObject.basics.speed.fly,
        maneuverability: tempCharacterObject.basics.speed.maneuverability,
        swim: tempCharacterObject.basics.speed.swim,
        climb: tempCharacterObject.basics.speed.climb,
        burrow: tempCharacterObject.basics.speed.burrow
      },
      image: {
        uploaded: tempCharacterObject.basics.character_image.uploaded,
        background: tempCharacterObject.basics.character_image.background,
        color: {
          r: tempCharacterObject.basics.character_image.color.r,
          g: tempCharacterObject.basics.character_image.color.g,
          b: tempCharacterObject.basics.character_image.color.b
        },
        image: tempCharacterObject.basics.character_image.image,
        orientation: tempCharacterObject.basics.character_image.orientation,
        position: {
          x: tempCharacterObject.basics.character_image.position.x,
          y: tempCharacterObject.basics.character_image.position.y
        },
        size: {
          width: tempCharacterObject.basics.character_image.size.width,
          height: tempCharacterObject.basics.character_image.size.height
        },
        scale: tempCharacterObject.basics.character_image.scale
      }
    };


    // basics
    characterObject.basics = basics;
    // characterObject.basics.character = {};
    // characterObject.basics.classes = {};
    // characterObject.basics.experience = {};
    // characterObject.basics.initiative = {};
    // characterObject.basics.speed = {};
    // characterObject.basics.image = {};
    // // statistics
    // characterObject.statistics = {};
    // characterObject.statistics.stats = {};
    // characterObject.statistics.abilities = {};
    // characterObject.statistics.power = {};
    // // equipment
    // characterObject.equipment = {};
    // characterObject.equipment.possessions = {};
    // characterObject.equipment.armor = {};
    // characterObject.equipment.body_slots = {};
    // characterObject.equipment.item = {};
    // characterObject.equipment.encumbrance = {};
    // characterObject.equipment.consumable = {};
    // characterObject.equipment.wealth = {};
    // // defense
    // characterObject.defense = {};
    // characterObject.defense.hp = {};
    // characterObject.defense.ac = {};
    // characterObject.defense.saves = {};
    // characterObject.defense.cmd = {};
    // characterObject.defense.dr = {};
    // characterObject.defense.resist = {};
    // characterObject.defense.sr = {};
    // // offense
    // characterObject.offense = {};
    // characterObject.offense.stats = {};
    // characterObject.offense.cmb = {};
    // characterObject.offense.attack = {};
    // // skills
    // characterObject.skills = {};
    // characterObject.skills.ranks = {};
    // characterObject.skills.custom = {};
    // characterObject.skills.all = {};
    // // spells
    // characterObject.spells = {};
    // characterObject.spells.stats = {};
    // characterObject.spells.book = {};
    // // notes
    // characterObject.notes = {};
    // characterObject.notes.character = {};
    // characterObject.notes.story = {};
    // // events
    // characterObject.events = {};
    // characterObject.events.all = {};
    // console.log(characterObject);
  };

  function _update(options) {
    var defaultOptions = {
      object: null,
      bumpTo: null
    };
    if (options) {
      var defaultOptions = helper.applyOptions(defaultOptions, options);
    };
    var _bumpToVersion = function(version, updateAction) {
      if (defaultOptions.object.awesomeSheet.version != version) {
        updateAction(defaultOptions.object);
      };
    };
    if (defaultOptions.object != null) {
      if (defaultOptions.bumpTo == "5.0.0") {
        _bumpToVersion("5.0.0", _update_500);
      };
    };
  };

  function _repair(options) {
    var defaultOptions = {
      object: null
    };
    if (options) {
      var defaultOptions = helper.applyOptions(defaultOptions, options);
    };
    if (_debug) {
      console.log("---------------------------------------");
      console.log("Repair:", defaultOptions.object.basics.name);
    };
    // if awesomeSheet check is a boolean
    if (typeof defaultOptions.object.awesomeSheet == "boolean") {
      _update_440andBelow(defaultOptions.object);
    };
    // version bump
    if (defaultOptions.object.awesomeSheet.version != update.version()) {
      _update({
        object: defaultOptions.object,
        bumpTo: update.version()
      });
    };
  };

  function render(options) {
    var defaultOptions = {
      debug: false,
      object: null
    };
    if (options) {
      var defaultOptions = helper.applyOptions(defaultOptions, options);
    };
    _debug = defaultOptions.debug;
    // check for character object
    if (defaultOptions.object) {
      _repair({
        object: defaultOptions.object
      });
      // if no object repair all characters
    } else {
      var allCharacters = sheet.getAll();
      allCharacters.forEach(function(arrayItem) {
        _repair({
          object: arrayItem
        });
      });
    };
    // store characters
    sheet.store();
  };

  // exposed methods
  return {
    render: render
  };

})();
