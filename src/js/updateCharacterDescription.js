document.addEventListener('DOMContentLoaded', function () {
    // Dynamic import inside the DOMContentLoaded event listener
    const variableMappings = [{
      elementId: 'basics-character-name',
      dataKey: 'character_full_name'
    }, {
      elementId: 'basics-character-description',
      dataKey: 'professions'
    },
    // physical appearance varialbes
    {
      elementId: 'basics-character-race',
      dataKey: 'chosen_race'
    }, {
      elementId: 'basics-character-age',
      dataKey: 'age_number'
    }, {
      elementId: 'basics-character-weight',
      dataKey: 'weight_number'
    }, {
      elementId: 'basics-character-height',
      dataKey: 'height_number'
    },
    // Spiritual variables
    {
      elementId: 'basics-character-alignment',
      dataKey: 'alignment'
    }, {
      elementId: 'basics-character-deity',
      dataKey: 'deity_name'
    },
    // Stat variables
    {
      elementId: 'statistics-stats-str-base',
      dataKey: 'str'
    }, {
      elementId: 'statistics-stats-dex-base',
      dataKey: 'dex'
    }, {
      elementId: 'statistics-stats-con-base',
      dataKey: 'con'
    }, {
      elementId: 'statistics-stats-int-base',
      dataKey: 'int'
    }, {
      elementId: 'statistics-stats-wis-base',
      dataKey: 'wis'
    }, {
      elementId: 'statistics-stats-cha-base',
      dataKey: 'cha'
    },
    // Equipment variables
    {
      elementId: 'equipment-body-slots-belts',
      dataKey: ['equipment_list', 0]
    }, {
      elementId: 'equipment-body-slots-body',
      dataKey: ['equipment_list', 1]
    }, {
      elementId: 'equipment-body-slots-chest',
      dataKey: ['equipment_list', 2]
    }, {
      elementId: 'equipment-body-slots-eyes',
      dataKey: ['equipment_list', 3]
    }, {
      elementId: 'equipment-body-slots-feet',
      dataKey: ['equipment_list', 4]
    }, {
      elementId: 'equipment-body-slots-hands',
      dataKey: ['equipment_list', 5]
    }, {
      elementId: 'equipment-body-slots-head',
      dataKey: ['equipment_list', 6]
    }, {
      elementId: 'equipment-body-slots-headband',
      dataKey: ['equipment_list', 7]
    }, {
      elementId: 'equipment-body-slots-neck',
      dataKey: ['equipment_list', 8]
    }, {
      elementId: 'equipment-body-slots-shoulders',
      dataKey: ['equipment_list', 9]
    }, {
      elementId: 'equipment-body-slots-wrist',
      dataKey: ['equipment_list', 10]
    }, {
      elementId: 'equipment-body-slots-ring-left-hand',
      dataKey: ['equipment_list', 11]
    }, {
      elementId: 'equipment-body-slots-ring-right-hand',
      dataKey: ['equipment_list', 12]
    },
    // Class name section
    {
      elementId: 'basics-classes-all-0-name',
      dataKey: 'c_class'
    }, {
      elementId: 'basics-classes-all-0-level',
      dataKey: 'level'
    }, {
      elementId: 'basics-classes-all-0-hp-base',
      dataKey: 'total_hp_rolls'
    }, {
      elementId: 'basics-classes-all-0-saves-fortitude',
      dataKey: 'fort_saving_throw'
    }, {
      elementId: 'basics-classes-all-0-saves-reflex',
      dataKey: 'reflex_saving_throw'
    }, {
      elementId: 'basics-classes-all-0-saves-will',
      dataKey: 'wisdom_saving_throw'
    }, {
      elementId: 'basics-classes-all-0-bab',
      dataKey: 'bab_total'
    },
    // Defense section
    {
      elementId: 'defense-ac-stats-armor',
      dataKey: 'armor_ac'
    }, {
      elementId: 'defense-ac-stats-shield',
      dataKey: 'shield_ac'
    }, {
      elementId: 'equipment-armor-armor-name',
      dataKey: 'armor_name'
    }, {
      elementId: 'equipment-armor-armor-check-penalty',
      dataKey: 'armor_armor_check_penalty'
    }, {
      elementId: 'equipment-armor-armor-max-dex',
      dataKey: 'armor_max_dex_bonus'
    }, {
      elementId: 'equipment-armor-armor-arcane-spell-failure',
      dataKey: 'armor_spell_failure'
    }, {
      elementId: 'equipment-armor-armor-weight',
      dataKey: 'armor_weight'
    }, {
      elementId: 'equipment-armor-shield-name',
      dataKey: 'shield_name'
    }, {
      elementId: 'equipment-armor-shield-check-penalty',
      dataKey: 'shield_armor_check_penalty'
    }, {
      elementId: 'equipment-armor-shield-max-dex',
      dataKey: 'shield_max_dex_bonus'
    }, {
      elementId: 'equipment-armor-shield-arcane-spell-failure',
      dataKey: 'shield_spell_failure'
    }, {
      elementId: 'equipment-armor-shield-weight',
      dataKey: 'shield_weight'
    },
    // Wealth
    {
      elementId: 'equipment-wealth-platinum',
      dataKey: 'platnium'
    },
    // description / test variables
  
    // Bloodlines + Domains + Schools
    {
      elementId: 'spells-stats-school',
      dataKey: 'school'
    }, {
      elementId: 'spells-stats-opposition',
      dataKey: 'opposing_school'
    }, {
      elementId: 'spells-stats-domains',
      dataKey: 'full_domain'
    }, {
      elementId: 'spells-stats-bloodline',
      dataKey: 'bloodline'
    }
  
    // Add more mappings for additional variables as needed
    ];
    let spellLists, featsList, day_list, known_list;
    function updateCharacterDescription() {
      fetch('https://pathfinder-char-creator.onrender.com/get_character_data', {
        method: 'GET',
        credentials: 'omit'
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(characterData => {
        console.log('Received character data:', characterData);
  
        // Auto Replace Skills function
        if (characterData.spell_list_choose_from) {
          spellLists = characterData.spell_list_choose_from;
          day_list = characterData.day_list;
          known_list = characterData.known_list;
        } else {
          console.log("spellLists is not populated");
          // Handle the case where spellLists is not populated
        }
        updatespells_known_and_spells_per_day();
        featsList = characterData.feats;
        console.log('Feats List:', featsList);
  
        // console.log("featsList",featsList);
        // console.log(spellLists)
        const skillRanksString = characterData.skill_ranks;
        const skillRanksObject = JSON.parse(skillRanksString);
  
        //   Need to add a fix for Perform + knowledge martial + Profession portions + remove skills that don't belong in the list
        for (const skillName in skillRanksObject) {
          if (skillRanksObject.hasOwnProperty(skillName)) {
            const skillRank = skillRanksObject[skillName];
            const elementId = `skills-default-${skillName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-ranks`;
            const element = document.getElementById(elementId);
            console.log('Skill Name:', skillName);
            console.log('Element ID:', elementId);
            console.log('Element:', element);
            if (element) {
              // Check if the element is an <input> element
              if (element.tagName.toLowerCase() === 'input') {
                // Update the value property for <input> elements
                element.value = skillRank;
              } else {
                // Update the text content for other types of elements
                element.textContent = skillRank;
              }
            }
          }
        }
  
        // End of Auto Replace Skills Function
  
        variableMappings.forEach(mapping => {
          const element = document.getElementById(mapping.elementId);
          if (element) {
            let value;
            if (Array.isArray(mapping.dataKey)) {
              const [objectKey, nestedKey] = mapping.dataKey;
              value = characterData[objectKey] ? characterData[objectKey][nestedKey] : undefined;
            } else {
              const keys = mapping.dataKey.split('.'); // Split the dataKey by '.' to handle nested keys
              value = keys.reduce((acc, key) => acc ? acc[key] : undefined, characterData);
            }
            if (value !== undefined) {
              element.value = value;
            }
          }
        });
  
        // characterDescriptionElement.innerHTML = `<pre>${JSON.stringify(characterData, null, 2)}</pre>`;
      }).catch(error => {
        console.error('Error fetching or parsing character data:', error);
        // characterDescriptionElement.innerHTML = `<pre>Error: ${error.message}</pre>`;
      });
    }
  
    // Filling out Spell list + feats
    // Somewhat buggy
  
    // Event listener for the "Update Character" button
    const updateDescriptionButton = document.getElementById('updateDescriptionButton');
  
    // filling out spells per day + spells known
    function updatespells_known_and_spells_per_day() {
      console.log("day_list electric boogaloo", day_list);
      console.log("known_list electric boogaloo", known_list);
      // Update spell list per day and spells known
      for (let i = 0; i < 10; i++) {
        const dayElement = document.getElementById(`spells-book-level-${i}-per_day`);
        const knownElement = document.getElementById(`spells-book-level-${i}-known`);
        if (day_list && known_list) {
          // Check if the index is within the bounds of the lists
          if (i < day_list.length) {
            // Set the value property for input elements
            dayElement.value = day_list[i];
            knownElement.value = known_list[i];
          } else {
            // Handle the case where the lists don't have enough elements
            dayElement.value = "N/A";
            knownElement.value = "N/A";
          }
        }
      }
    }
    if (updateDescriptionButton) {
      // Define a function to handle both spells and feats
      async function handleSpellsAndFeats() {
        console.log('Button clicked');
        await updateCharacterDescription(); // Wait for character data to be fetched
        // Process spells
        if (spellLists) {
          for (let j = 0; j < spellLists.length; j++) {
            const spellList = spellLists[j];
            for (let i = 0; i < spellList.length; i++) {
              const spellName = spellList[i];
              console.log(`Spell Name: ${spellName}`);
              await addSpellWithDelay(j, spellName); // Wait for each spell to be added with a delay
            }
          }
        } else {
          console.log('spellLists is not populated');
          // Handle the case where spellLists is not populated
        }
        // Process feats
        for (let i = 0; i < featsList.length; i++) {
          const featName = featsList[i];
          console.log(`Feat Name: ${featName}`);
          await addFeatWithDelay(featName); // Wait for each feat to be added with a delay
        }
        clickApplyButton();
      }
  
      // Attach the event listener to the "Update Character" button
      updateDescriptionButton.addEventListener('click', handleSpellsAndFeats);
      function addSpellWithDelay(level, spellName) {
        return new Promise(resolve => {
          setTimeout(() => {
            const spellInput = document.getElementById(`add-new-spell-level-${level}`);
            if (spellInput && spellName) {
              spellInput.value = spellName;
              spellInput.dispatchEvent(new Event('input')); // Emulate typing in the search bar
              setTimeout(() => {
                const suggestionItems = document.querySelectorAll('.m-auto-suggest-result');
                suggestionItems.forEach(item => {
                  if (item.textContent.trim() === spellName) {
                    item.closest('.m-auto-suggest-text').click(); // Click on the suggestion item
                    const addButton = document.querySelector('.js-add-new-spell');
                    addButton.click(); // Emulate clicking the add button
                    resolve(); // Resolve the promise once the spell is added
                  }
                });
              }, 200); // Wait for the suggestion list to populate
            }
          }, 200); // Adjust delay as needed
        });
      }
  
      // Only selecting first feat, because the second option is always mythic
      function addFeatWithDelay(featName) {
        return new Promise(resolve => {
          setTimeout(() => {
            const featInput = document.getElementById('statistics-feat-all');
            const addButton = document.querySelector('.js-pill-block-add');
            if (featInput && addButton && featName) {
              // Check if the feat is already present
              const existingFeats = document.querySelectorAll('.js-pill-block');
              let featAlreadyExists = false;
              existingFeats.forEach(existingFeat => {
                if (existingFeat.textContent.trim() === featName) {
                  featAlreadyExists = true;
                }
              });
              if (!featAlreadyExists) {
                // If the feat is not already present, add it
                featInput.value = featName;
                featInput.dispatchEvent(new Event('input')); // Emulate typing in the feat input field
                console.log('Waiting for suggestion list to populate...');
                setTimeout(() => {
                  const suggestionItems = document.querySelectorAll('.m-auto-suggest-result');
                  console.log('Suggestion list populated');
                  let added = false; // Flag to track if the feat has been added
                  suggestionItems.forEach(item => {
                    if (item.textContent.trim() === featName && !added) {
                      console.log('Adding feat:', featName);
                      item.closest('.m-auto-suggest-text').click(); // Click on the suggestion item
                      addButton.click(); // Click on the add button to add the feat
                      added = true; // Set the flag to true to indicate the feat has been added
                      resolve(); // Resolve the promise once the feat is added
                    }
                  });
                }, 200); // Wait for the suggestion list to populate
              } else {
                // If the feat is already present, resolve the promise immediately
                console.log('Feat already exists:', featName);
                resolve();
              }
            }
          }, 200); // Adjust delay as needed
        });
      }
  
      // Adds platnium to the wealth calculator + clicks button after feats and spells are added  
      function clickApplyButton() {
        const applyButton = document.querySelector('a[data-input-block-aggregate-options="target:equipment-wealth-platinum,action:aggregate"]');
        if (applyButton) {
          setTimeout(() => {
            applyButton.click();
            console.log('Apply button clicked.');
          }, 200); // Adjust the delay time as needed
        } else {
          console.error('Apply button not found.');
        }
      }
      clickApplyButton();
    }
  });