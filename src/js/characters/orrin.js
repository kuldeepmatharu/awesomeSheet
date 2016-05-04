var orrin = (function() {

  var data = {
    basics: {
      name: "Orrin Alareth",
      race: "Human",
      class: "Rogue",
      level: "2",
      size: "Medium",
      alignment: "Lawful Neutral",
      xp: "1,300",
      height: "6'0",
      weight: "136 lbs",
      age: "26 years",
      gender: "Male",
      speed: "30 ft, 6 sq",
      initiative: "6",
      hero_points: "",
      luck_points: ""
    },
    statistics: {
      stats: {
        str: {
          score: "13",
          temp: ""
        },
        dex: {
          score: "18",
          temp: ""
        },
        con: {
          score: "12",
          temp: ""
        },
        int: {
          score: "12",
          temp: ""
        },
        wis: {
          score: "12",
          temp: ""
        },
        cha: {
          score: "7",
          temp: ""
        }
      },
      feats: "<div>Weapon Finesse,&nbsp;Dodge<br></div>",
      traits: "Reactionary,&nbsp;Resilient",
      languages: "Common, Elven",
      special_abilities: "Sneak Attack (+1d6), Trapfinding, Evasion, Rogue talent"
    },
    equipment: {
      gear: "Fur coat and cold weather outfit, Spell component pouch, Spellbook, Backpack, Flask of Oil (3), Pouch (belt), Sack, Candle, Flint and Steel, Tindertwig (5), Rations (5 days), Waterskin, Bedroll, Blanket, Bloodblock, Healer's Kik, Rope (silk), Mirror, Compass, Ink, Inkpen, Paper sheets,&nbsp;Buckler",
      magic_gear: "",
      encumbrance: {
        light: "50 lbs or less",
        medium: "51–100 lbs",
        heavy: "101–150 lbs"
      },
      body_slots: {
        armor: "",
        belts: "",
        body: "Hide armor",
        chest: "",
        eyes: "",
        feet: "",
        hands: "",
        head: "",
        headband: "",
        neck: "",
        ring_left_hand: "",
        ring_right_hand: "",
        shield: "",
        shoulders: "",
        wrist: ""
      },
      wealth: {
        platinum: "",
        gold: "800",
        silver: "",
        copper: ""
      },
      consumable: []
    },
    defense: {
      hp: {
        total: "17",
        temp: "",
        damage: "",
        non_lethal_damage: ""
      },
      ac: {
        misc: "",
        temp: "",
        armor: "4",
        shield: "1",
        deflect: "",
        dodge: "1",
        natural: "",
        size_bonus: "",
        str_bonus: false,
        dex_bonus: true,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false
      },
      flat_footed: {
        misc: "",
        temp: "",
        str_bonus: false,
        dex_bonus: false,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false
      },
      touch: {
        misc: "",
        temp: "",
        str_bonus: false,
        dex_bonus: true,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false
      },
      ac_notes: "",
      fortitude: {
        base: "0",
        racial: "",
        resistance: "",
        misc: "1",
        temp: "",
        str_bonus: false,
        dex_bonus: false,
        con_bonus: true,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false
      },
      reflex: {
        base: "3",
        racial: "",
        resistance: "",
        misc: "",
        temp: "",
        str_bonus: false,
        dex_bonus: true,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false
      },
      will: {
        base: "0",
        racial: "",
        resistance: "",
        misc: "",
        temp: "",
        str_bonus: false,
        dex_bonus: false,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: true,
        cha_bonus: false
      },
      save_notes: ""
    },
    offense: {
      base_attack: "1",
      special_size_bonus: "",
      concentration: "6",
      cmb: {
        misc: "",
        temp: "",
        str_bonus: true,
        dex_bonus: false,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false,
        level: false,
        bab: false
      },
      cmd: {
        misc: "",
        temp: "",
        str_bonus: true,
        dex_bonus: true,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false,
        level: false,
        bab: false
      },
      melee_attack: {
        misc: "",
        temp: ""
      },
      ranged_attack: {
        misc: "",
        temp: ""
      },
      attack: {
        melee: [{
          weapon: "Rapier (MW)",
          attack: "6",
          damage: "1d6+1",
          critical: "18–20/×2"
        }],
        ranged: [{
          weapon: "Shortbow (MW)",
          attack: "6",
          damage: "1d6",
          critical: "x3",
          range: "60 ft",
          ammo: "50"
        }]
      },
      attack_notes: "+1d6 Sneak attack, +2 to overcome spell resistance"
    },
    skills: {
      acrobatics: {
        ranks: "2",
        misc: "",
        class_skill: true
      },
      appraise: {
        ranks: "1",
        misc: "",
        class_skill: true
      },
      bluff: {
        ranks: "1",
        misc: "",
        class_skill: true
      },
      climb: {
        ranks: "1",
        misc: "",
        class_skill: true
      },
      craft_1: {
        ranks: "",
        misc: "",
        class_skill: false,
        variant_name: ""
      },
      craft_2: {
        ranks: "",
        misc: "",
        class_skill: false,
        variant_name: ""
      },
      diplomacy: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      disable_device: {
        ranks: "2",
        misc: "",
        class_skill: true
      },
      disguise: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      escape_artist: {
        ranks: "2",
        misc: "",
        class_skill: true
      },
      fly: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      handle_animal: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      heal: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      intimidate: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      knowledge_arcana: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      knowledge_dungeoneering: {
        ranks: "1",
        misc: "",
        class_skill: true
      },
      knowledge_engineering: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      knowledge_geography: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      knowledge_history: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      knowledge_local: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      knowledge_nature: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      knowledge_nobility: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      knowledge_planes: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      knowledge_religion: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      linguistics: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      perception: {
        ranks: "2",
        misc: "",
        class_skill: true
      },
      perform_1: {
        ranks: "",
        misc: "",
        class_skill: false,
        variant_name: ""
      },
      perform_2: {
        ranks: "",
        misc: "",
        class_skill: false,
        variant_name: ""
      },
      profession_1: {
        ranks: "",
        misc: "",
        class_skill: false,
        variant_name: ""
      },
      profession_2: {
        ranks: "",
        misc: "",
        class_skill: false,
        variant_name: ""
      },
      ride: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      sense_motive: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      sleight_of_hand: {
        ranks: "2",
        misc: "",
        class_skill: true
      },
      spellcraft: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      stealth: {
        ranks: "2",
        misc: "",
        class_skill: true
      },
      survival: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      swim: {
        ranks: "",
        misc: "",
        class_skill: false
      },
      use_magic_device: {
        ranks: "2",
        misc: "",
        class_skill: true
      },
      custom_1: {
        name: "Perception (Traps)",
        ranks: "2",
        misc: "",
        class_skill: true,
        str_bonus: false,
        dex_bonus: false,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: true,
        cha_bonus: false,
        level: false,
        half_level: true
      },
      custom_2: {
        name: "Disable Device (Traps)",
        ranks: "2",
        misc: "",
        class_skill: true,
        str_bonus: false,
        dex_bonus: true,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false,
        level: false,
        half_level: true
      },
      custom_3: {
        name: "",
        ranks: "",
        misc: "",
        class_skill: false,
        str_bonus: false,
        dex_bonus: false,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false,
        level: false,
        half_level: false
      },
      custom_4: {
        name: "",
        ranks: "",
        misc: "",
        class_skill: false,
        str_bonus: false,
        dex_bonus: false,
        con_bonus: false,
        int_bonus: false,
        wis_bonus: false,
        cha_bonus: false,
        level: false,
        half_level: false
      }
    },
    spells: {
      per_day: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      dc: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      known: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      book: [{
        level_0: []
      }, {
        level_1: []
      }, {
        level_2: []
      }, {
        level_3: []
      }, {
        level_4: []
      }, {
        level_5: []
      }, {
        level_6: []
      }, {
        level_7: []
      }, {
        level_8: []
      }, {
        level_9: []
      }]
    },
    notes: {
      character: "<div><br></div>",
      story: ""
    }
  };
  // var data = {
  //   basics: {
  //     name: "Orrin Alareth",
  //     race: "Elf",
  //     class: "Wizard",
  //     level: "2",
  //     size: "Medium",
  //     alignment: "Lawful Neutral",
  //     xp: "1,300",
  //     height: "6'0",
  //     weight: "136 lbs",
  //     age: "110 years",
  //     gender: "Male",
  //     speed: "30 ft, 6 sq",
  //     initiative: "2",
  //     hero_points: "",
  //     luck_points: ""
  //   },
  //   statistics: {
  //     stats: {
  //       str: {
  //         score: "8",
  //         temp: ""
  //       },
  //       dex: {
  //         score: "14",
  //         temp: ""
  //       },
  //       con: {
  //         score: "12",
  //         temp: ""
  //       },
  //       int: {
  //         score: "18",
  //         temp: ""
  //       },
  //       wis: {
  //         score: "12",
  //         temp: ""
  //       },
  //       cha: {
  //         score: "8",
  //         temp: ""
  //       }
  //     },
  //     feats: "Scribe Scroll, Augment Summoning",
  //     traits: "",
  //     languages: "Common, Elven, Celestial, Draconic, Goblin, Orc, Abyssal",
  //     special_abilities: "Low-Light Vision, Elven Immunities, Elven Magic, Keen Senses, Weapon Familiarity, Familiar (Rat), Arcane schools, Opposition arcane school, Summoner's Charm (Su), Shift (Su), Cantrips"
  //   },
  //   equipment: {
  //     gear: "Fur coat and cold weather outfit, Spell component pouch, Spellbook, Backpack, Flask of Oil (3), Pouch (belt), Sack, Candle, Flint and Steel, Tindertwig (5), Rations (5 days), Waterskin, Bedroll, Blanket, Bloodblock, Healer's Kik, Rope (silk), Mirror, Compass, Ink, Inkpen, Paper sheets, Case for maps/scrolls",
  //     magic_gear: "Scroll of Summon Monster I (3), Scroll of Grease (3)",
  //     encumbrance: {
  //       light: "26 lbs or less",
  //       medium: "27–53 lbs",
  //       heavy: "54–80 lbs"
  //     },
  //     body_slots: {
  //       armor: "",
  //       belts: "",
  //       body: "",
  //       chest: "",
  //       eyes: "",
  //       feet: "",
  //       hands: "",
  //       head: "",
  //       headband: "",
  //       neck: "",
  //       ring_left_hand: "",
  //       ring_right_hand: "",
  //       shield: "",
  //       shoulders: "",
  //       wrist: ""
  //     },
  //     wealth: {
  //       platinum: "",
  //       gold: "250",
  //       silver: "",
  //       copper: ""
  //     },
  //     consumable: [{
  //       item: "Wand of Magic Missile",
  //       total: "50",
  //       used: ""
  //     }]
  //   },
  //   defense: {
  //     hp: {
  //       total: "16",
  //       temp: "",
  //       damage: "",
  //       non_lethal_damage: ""
  //     },
  //     ac: {
  //       misc: "",
  //       temp: "",
  //       armor: "",
  //       shield: "",
  //       deflect: "",
  //       dodge: "",
  //       natural: "",
  //       size_bonus: "",
  //       str_bonus: false,
  //       dex_bonus: true,
  //       con_bonus: false,
  //       int_bonus: false,
  //       wis_bonus: false,
  //       cha_bonus: false
  //     },
  //     flat_footed: {
  //       misc: "",
  //       temp: "",
  //       str_bonus: false,
  //       dex_bonus: false,
  //       con_bonus: false,
  //       int_bonus: false,
  //       wis_bonus: false,
  //       cha_bonus: false
  //     },
  //     touch: {
  //       misc: "",
  //       temp: "",
  //       str_bonus: false,
  //       dex_bonus: true,
  //       con_bonus: false,
  //       int_bonus: false,
  //       wis_bonus: false,
  //       cha_bonus: false
  //     },
  //     ac_notes: "",
  //     fortitude: {
  //       base: "",
  //       racial: "",
  //       resistance: "",
  //       misc: "2",
  //       temp: "",
  //       str_bonus: false,
  //       dex_bonus: false,
  //       con_bonus: true,
  //       int_bonus: false,
  //       wis_bonus: false,
  //       cha_bonus: false
  //     },
  //     reflex: {
  //       base: "",
  //       racial: "",
  //       resistance: "",
  //       misc: "",
  //       temp: "",
  //       str_bonus: false,
  //       dex_bonus: true,
  //       con_bonus: false,
  //       int_bonus: false,
  //       wis_bonus: false,
  //       cha_bonus: false
  //     },
  //     will: {
  //       base: "3",
  //       racial: "",
  //       resistance: "",
  //       misc: "",
  //       temp: "",
  //       str_bonus: false,
  //       dex_bonus: false,
  //       con_bonus: false,
  //       int_bonus: false,
  //       wis_bonus: true,
  //       cha_bonus: false
  //     },
  //     save_notes: "Immune to sleep effecrs, +2 against enchantment spells and effects."
  //   },
  //   offense: {
  //     base_attack: "1",
  //     special_size_bonus: "",
  //     concentration: "6",
  //     cmb: {
  //       misc: "",
  //       temp: "",
  //       str_bonus: true,
  //       dex_bonus: false,
  //       con_bonus: false,
  //       int_bonus: false,
  //       wis_bonus: false,
  //       cha_bonus: false,
  //       level: false,
  //       bab: false
  //     },
  //     cmd: {
  //       misc: "",
  //       temp: "",
  //       str_bonus: true,
  //       dex_bonus: true,
  //       con_bonus: false,
  //       int_bonus: false,
  //       wis_bonus: false,
  //       cha_bonus: false,
  //       level: false,
  //       bab: false
  //     },
  //     melee_attack: {
  //       misc: "",
  //       temp: ""
  //     },
  //     ranged_attack: {
  //       misc: "",
  //       temp: ""
  //     },
  //     attack: {
  //       melee: [],
  //       ranged: []
  //     },
  //     attack_notes: "+2 to overcome spell resistance"
  //   },
  //   skills: {
  //     acrobatics: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     appraise: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     bluff: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     climb: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     craft_1: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false,
  //       variant_name: ""
  //     },
  //     craft_2: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false,
  //       variant_name: ""
  //     },
  //     diplomacy: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     disable_device: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     disguise: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     escape_artist: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     fly: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     handle_animal: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     heal: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     intimidate: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     knowledge_arcana: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     knowledge_dungeoneering: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     knowledge_engineering: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     knowledge_geography: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     knowledge_history: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     knowledge_local: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     knowledge_nature: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     knowledge_nobility: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     knowledge_planes: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     knowledge_religion: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     linguistics: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     perception: {
  //       ranks: "",
  //       misc: "2",
  //       class_skill: false
  //     },
  //     perform_1: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false,
  //       variant_name: ""
  //     },
  //     perform_2: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false,
  //       variant_name: ""
  //     },
  //     profession_1: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false,
  //       variant_name: ""
  //     },
  //     profession_2: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false,
  //       variant_name: ""
  //     },
  //     ride: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     sense_motive: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     sleight_of_hand: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     spellcraft: {
  //       ranks: "1",
  //       misc: "",
  //       class_skill: true
  //     },
  //     stealth: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     survival: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     swim: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     use_magic_device: {
  //       ranks: "",
  //       misc: "",
  //       class_skill: false
  //     },
  //     custom_1: {
  //       name: "Spellcraft (Magic items)",
  //       ranks: "1",
  //       misc: "2",
  //       class_skill: true,
  //       str_bonus: false,
  //       dex_bonus: false,
  //       con_bonus: false,
  //       int_bonus: true,
  //       wis_bonus: false,
  //       cha_bonus: false,
  //       level: false,
  //       half_level: false
  //     },
  //     custom_2: {
  //       name: "",
  //       ranks: "",
  //       misc: "",
  //       class_skill: false,
  //       str_bonus: false,
  //       dex_bonus: false,
  //       con_bonus: false,
  //       int_bonus: false,
  //       wis_bonus: false,
  //       cha_bonus: false,
  //       level: false,
  //       half_level: false
  //     },
  //     custom_3: {
  //       name: "",
  //       ranks: "",
  //       misc: "",
  //       class_skill: false,
  //       str_bonus: false,
  //       dex_bonus: false,
  //       con_bonus: false,
  //       int_bonus: false,
  //       wis_bonus: false,
  //       cha_bonus: false,
  //       level: false,
  //       half_level: false
  //     },
  //     custom_4: {
  //       name: "",
  //       ranks: "",
  //       misc: "",
  //       class_skill: false,
  //       str_bonus: false,
  //       dex_bonus: false,
  //       con_bonus: false,
  //       int_bonus: false,
  //       wis_bonus: false,
  //       cha_bonus: false,
  //       level: false,
  //       half_level: false
  //     }
  //   },
  //   spells: {
  //     per_day: {
  //       level_0: "4",
  //       level_1: "3",
  //       level_2: "",
  //       level_3: "",
  //       level_4: "",
  //       level_5: "",
  //       level_6: "",
  //       level_7: "",
  //       level_8: "",
  //       level_9: ""
  //     },
  //     dc: {
  //       level_0: "14",
  //       level_1: "15",
  //       level_2: "",
  //       level_3: "",
  //       level_4: "",
  //       level_5: "",
  //       level_6: "",
  //       level_7: "",
  //       level_8: "",
  //       level_9: ""
  //     },
  //     known: {
  //       level_0: "",
  //       level_1: "",
  //       level_2: "",
  //       level_3: "",
  //       level_4: "",
  //       level_5: "",
  //       level_6: "",
  //       level_7: "",
  //       level_8: "",
  //       level_9: ""
  //     },
  //     book: [{
  //       level_0: [
  //         { name: "Bleed", prepared: 0, active: false, cast: 0 },
  //         { name: "Erase", prepared: 0, active: false, cast: 0 },
  //         { name: "Daze", prepared: 0, active: false, cast: 0 },
  //         { name: "Disrupt Undead", prepared: 0, active: false, cast: 0 },
  //         { name: "Touch of Fatigue", prepared: 0, active: false, cast: 0 },
  //         { name: "Prestidigitation", prepared: 0, active: false, cast: 0 },
  //         { name: "Light", prepared: 0, active: false, cast: 0 },
  //         { name: "Ghost Sound", prepared: 0, active: false, cast: 0 },
  //         { name: "Spark", prepared: 0, active: false, cast: 0 },
  //         { name: "Acid Splash", prepared: 0, active: false, cast: 0 },
  //         { name: "Mage Hand", prepared: 0, active: false, cast: 0 },
  //         { name: "Flare", prepared: 0, active: false, cast: 0 },
  //         { name: "Detect Magic", prepared: 1, active: false, cast: 0 },
  //         { name: "Detect Poison", prepared: 0, active: false, cast: 0 },
  //         { name: "Dancing Lights", prepared: 1, active: false, cast: 0 },
  //         { name: "Mending", prepared: 0, active: false, cast: 0 },
  //         { name: "Arcane Mark", prepared: 0, active: false, cast: 0 },
  //         { name: "Message", prepared: 1, active: false, cast: 0 },
  //         { name: "Ray of Frost", prepared: 0, active: false, cast: 0 },
  //         { name: "Read Magic", prepared: 1, active: false, cast: 0 },
  //         { name: "Open Close", prepared: 0, active: false, cast: 0 },
  //         { name: "Resistance", prepared: 0, active: false, cast: 0 }
  //       ]
  //     }, {
  //       level_1: [
  //         { name: "Comprehend Languages", prepared: 0, active: false, cast: 0 },
  //         { name: "Enlarge Person", prepared: 0, active: false, cast: 0 },
  //         { name: "Feather Fall", prepared: 0, active: false, cast: 0 },
  //         { name: "Grease", prepared: 2, active: false, cast: 0 },
  //         { name: "Mage Armor", prepared: 0, active: false, cast: 0 },
  //         { name: "Mount", prepared: 0, active: false, cast: 0 },
  //         { name: "Obscuring Mist", prepared: 0, active: false, cast: 0 },
  //         { name: "Protection from Chaos", prepared: 0, active: false, cast: 0 },
  //         { name: "Protection from Evil", prepared: 0, active: false, cast: 0 },
  //         { name: "Shield", prepared: 0, active: false, cast: 0 },
  //         { name: "Summon Monster I", prepared: 1, active: false, cast: 0 },
  //         { name: "Unseen Servant", prepared: 0, active: false, cast: 0 }
  //       ]
  //     }, {
  //       level_2: []
  //     }, {
  //       level_3: []
  //     }, {
  //       level_4: []
  //     }, {
  //       level_5: []
  //     }, {
  //       level_6: []
  //     }, {
  //       level_7: []
  //     }, {
  //       level_8: []
  //     }, {
  //       level_9: []
  //     }]
  //   },
  //   notes: {
  //     character: "<strong>Low-Light Vision</strong> Elves can see twice as far as humans in conditions of dim light.<br><strong>Elven Immunities</strong> Elves are immune to magic sleep effects and get a +2 racial saving throw bonus against enchantment spells and effects.<br><strong>Elven Magic</strong> Elves receive a +2 racial bonus on caster level checks made to overcome spell resistance. In addition, elves receive a +2 racial bonus on Spellcraft skill checks made to identify the properties of magic items.<br><strong>Keen Senses</strong> Elves receive a +2 racial bonus on Perception skill checks.<br><strong>Weapon Familiarity</strong> Elves are proficient with longbows (including composite longbows), longswords, rapiers, and shortbows (including composite shortbows), and treat any weapon with the word \"elven\" in its name as a martial weapon.<br><strong>Familiar, Rat</strong> Master gains a +2 bonus on Fortitude saves.<br><strong>Arcane schools</strong> Conjuration, Teleportation sub school,<br><strong>Opposition arcane school</strong> Enchantment, Necromancy,<br><strong>Summoner's Charm (Su)</strong> Whenever you cast a conjuration (summoning) spell, increase the duration by a number of rounds equal to 1/2 your wizard level (minimum 1). This increase is not doubled by Extend Spell. At 20th level, you can change the duration of all summon monster spells to permanent. You can have no more than one summon monster spell made permanent in this way at one time. If you designate another summon monster spell as permanent, the previous spell immediately ends.<br><strong>Shift (Su)</strong> At 1st level, you can teleport to a nearby space as a swift action as if using dimension door. This movement does not provoke an attack of opportunity. You must be able to see the space that you are moving into. You cannot take other creatures with you when you use this ability (except for familiars). You can move 5 feet for every two wizard levels you possess (minimum 5 feet). You can use this ability a number of times per day equal to 3 + your Intelligence modifier.<br><strong>Cantrips</strong> Wizards can prepare a number of cantrips, or 0-level spells, each day, as noted on Table: Wizard under \"Spells per Day.\" These spells are cast like any other spell, but they are not expended when cast and may be used again. A wizard can prepare a cantrip from a prohibited school, but it uses up two of his available slots.<br><strong>Scribe Scroll</strong> At 1st level, a wizard gains Scribe Scroll as a bonus feat.<br><strong>Augment Summoning</strong> Each creature you conjure with any summon spell gains a +4 enhancement bonus to Strength and Constitution for the duration of the spell that summoned it.",
  //     story: "",
  //   }
  // };

  // exposed methods
  return {
    data: data
  };

})();
