var update = (function() {

  var history = [{
    version: "5.9.1",
    list: [
      "Correct typos in UI and in code."
    ]
  }, {
    version: "5.9.0",
    list: [
      "Added option to add Dodge Bonus to CMD.",
      "Added Enhancement, Insight, Luck, Profane, Sacred, Trait, Temp Armor Bonuses and Misc Armor Bonuses to the AC section. These Bonuses can effect Armor Class, Flat Footed AC and Touch AC.",
      "Added Arcane Spell Failure, Weight and Notes for Armor and Shield to the Equipment section."
    ]
  }, {
    version: "5.8.0",
    list: [
      "Added support for Untrained Skills. Skills which may be used Untrained or with Skill Ranks will be shown in Display Mode."
    ]
  }, {
    version: "5.7.0",
    list: [
      "Added Include option for each Item in Equipment."
    ]
  }, {
    version: "5.6.0",
    list: [
      "Added Equipped states to Attacks."
    ]
  }, {
    version: "5.5.0",
    list: [
      "Added Senses to Basics section.",
      "Added Notes to Skills section.",
      "Added Favoured HP and Ranks to all Classes"
    ]
  }, {
    version: "5.4.0",
    list: [
      "Added Level Count to the Experience tab and to the total Levels on the Classes tab.",
    ]
  }, {
    version: "5.3.0",
    list: [
      "*Update Equipment Items. You may need to review Item Quantities.",
    ]
  }, {
    version: "5.2.0",
    list: [
      "Update Display mode design and module.",
      "*Newly added Feats Traits and Languages will have descriptions.",
      "Added notes for Abilities."
    ]
  }, {
    version: "5.0.0",
    list: [
      "Update and optimise the character data object."
    ]
  }, {
    version: "4.4.0",
    list: [
      "*Added Spell Search, newly added Spells will have a descriptions."
    ]
  }, {
    version: "4.3.0",
    list: [
      "Added Powers section to track character special abilities."
    ]
  }, {
    version: "4.2.0",
    list: [
      "*Added Spell DC controls. You may need to review your previous DCs and turn on appropriate bonuses for each Spell Level."
    ]
  }, {
    version: "4.1.0",
    list: [
      "Added a Replace feature to Character Select menu. Useful for when updating the current character from another device."
    ]
  }, {
    version: "4.0.1",
    list: [
      "Fixed Classes, Item, Consumables and Custom Skills not setting or recalling the correct data."
    ]
  }, {
    version: "4.0.0",
    list: [
      "Rebuild of the storing and retrieving logic for better performance.",
      "Added Potions and Scrolls area to Equipment.",
      "Added Mobile Safari support."
    ]
  }, {
    version: "3.31.0",
    list: [
      "Added Header with new Character Select dropdown.",
      "Improved Modal, Prompt and Menu design.",
      "Added awesomeSheet Logo to Menu."
    ]
  }, {
    version: "3.30.2",
    list: [
      "*Missing characters? Please read this post: "
    ],
    link: {
      text: "Github issues-115",
      url: "https://github.com/the-data-is-a-lie/awesomeSheet/issues/115"
    }
  }, {
    version: "3.30.1",
    list: [
      "*Disable HTTPS redirect as user data is not migrating. A fix is in the works. Until then users wont be redirected to HTTPS."
    ]
  }, {
    version: "3.30.0",
    list: [
      "Improved Event logger."
    ]
  }, {
    version: "3.29.0",
    list: [
      "*Improved the Stat and Modifier inputs. You may have to review your stats as new options for Racial, Enhancement and Misc modifiers are now available."
    ]
  }, {
    version: "3.28.0",
    list: [
      "Added Weapon Type to each attack block."
    ]
  }, {
    version: "3.27.0",
    list: [
      "*Added Character Image options."
    ]
  }, {
    version: "3.26.0",
    list: [
      "*Added new Speed options: fly, swim, climb and burrow."
    ]
  }, {
    version: "3.25.0",
    list: [
      "*Added a Feedback link. If you find a problem, issue or just have suggestions use the link in the Nav."
    ]
  }, {
    version: "3.24.0",
    list: [
      "Added XP advancement speed and next level counts."
    ]
  }, {
    version: "3.23.0",
    list: [
      "*XP and Wealth is now tracked and can be viewd in logs."
    ]
  }, {
    version: "3.22.0",
    list: [
      "Added apply and clearing to XP and Wealth counts."
    ]
  }, {
    version: "3.21.1",
    list: [
      "Added missing 512x512 icon to manifest file."
    ]
  }, {
    version: "3.21.0",
    list: [
      "Added alternative STR score to calculation Encumbrance."
    ]
  }, {
    version: "3.20.1",
    list: [
      "Fixed an issue causing Clone Skills Bonuses not applying correctly."
    ]
  }, {
    version: "3.20.0",
    list: [
      "Adding SR, DR and Energy Resistance."
    ]
  }, {
    version: "3.19.2",
    list: [
      "Refactor Nav open and close logic and performance."
    ]
  }, {
    version: "3.19.1",
    list: [
      "Fix bug where invisible line breaks would cause empty Textarea Blocks to render in Display mode."
    ]
  }, {
    version: "3.19.0",
    list: [
      "Introduced Tabs to improve Edit layout."
    ]
  }, {
    version: "3.18.0",
    list: [
      "Added Character Description."
    ]
  }, {
    version: "3.17.0",
    list: [
      "*Added Wealth totaling.",
      "Improved Display layout.",
      "General UI fixes to Card design."
    ]
  }, {
    version: "3.16.1",
    list: [
      "*Added automatic Encumbrance calculation.",
      "Improved Display layout.",
      "Added more Tips.",
      "General refactoring and UI fixes."
    ]
  }, {
    version: "3.15.0",
    list: [
      "Added Alphabetical Spell sort."
    ]
  }, {
    version: "3.14.0",
    list: [
      "Improved Total Bonus modal layout."
    ]
  }, {
    version: "3.13.1",
    list: [
      "Added more Tips.",
      "Fixing bug where Tips would not be removed from the DOM."
    ]
  }, {
    version: "3.12.0",
    list: [
      "Added Caster Level Check support.",
      "Updated demo PCs."
    ]
  }, {
    version: "3.10.0",
    list: [
      "Improved Damage, Temp and Non Leathal HP controls."
    ]
  }, {
    version: "3.9.1",
    list: [
      "Update print styles to use columns."
    ]
  }, {
    version: "3.9.0",
    list: [
      "*Added Multi class support!",
      "Added areas for more than one Class.",
      "Added skill rank totals.",
      "Improved edit mode layout and general UI fixes."
    ]
  }, {
    version: "3.8.0",
    list: [
      "Redesigned layout of Display mode.",
      "Improved Log design."
    ]
  }, {
    version: "3.7.0",
    list: [
      "*Offline use feature added. AwesomeSheet will now work offline if it has been cached."
    ]
  }, {
    version: "3.6.1",
    list: [
      "Added Feat and Trait inputs to Saves, removing Racial inputs on Saves.",
      "*Added Size categories with auto calculation and Alignment dropdown. You may need to re-enter you size and Alignment.",
      "Moved Armor and Shield to Equipment section."
    ]
  }, {
    version: "3.5.2",
    list: [
      "Added Item list total weight.",
      "Updated character object repair for concentration bonuses."
    ]
  }, {
    version: "3.5.1",
    list: [
      "Improve Clone and Import UI."
    ]
  }, {
    version: "3.5.0",
    list: [
      "Refactored Clones, Input and Textarea modules.",
      "*New Items feature added.",
      "*New Custom Skills feature added."
    ]
  }, {
    version: "3.4.0",
    list: [
      "Redesigned edit mode layout and style for ease of reading."
    ]
  }, {
    version: "3.3.0",
    list: [
      "Optimise Consumable, Attack and Note modules for faster page load.",
      "Fixed a bug with Skill totals not recognising class skill."
    ]
  }, {
    version: "3.2.2",
    list: [
      "Refactored change log module.",
      "*Customisable Initiative block added. You will have to re-enter you Initiative bonuses if any.",
      "Fixed a bug with Update Prompt not hiding and Change Log control in the Nav not working.",
      "UI fixes and updates."
    ]
  }, {
    version: "3.1.0",
    list: [
      "Added a new feature Update Prompt. You're looking at it.",
      "UI fixes and updates."
    ]
  }, {
    version: "3.0.0",
    list: [
      "Improve edit and display modes and introduce card layout."
    ]
  }];

  var version = function() {
    var number = history[0].version.split(".");
    return parseFloat(number.shift() + "." + number.join(""));
  };

  // exposed methods
  return {
    version: version,
    history: history
  };

})();
