[
    { elementId: 'basics-character-name', dataKey: 'character_full_name' },
    { elementId: 'basics-character-description', dataKey: 'professions' },


// physical appearance varialbes
    { elementId: 'basics-character-race', dataKey: 'chosen_race' },
    { elementId: 'basics-character-age', dataKey: 'age_number' },
    { elementId: 'basics-character-weight', dataKey: 'weight_number' },
    { elementId: 'basics-character-height', dataKey: 'height_number' },


  // Spiritual variables
  { elementId: 'basics-character-alignment', dataKey: 'alignment' },
  { elementId: 'basics-character-deity', dataKey:'deity_name' },


  // Stat variables
  { elementId: 'statistics-stats-str-base', dataKey:'str' },
  { elementId: 'statistics-stats-dex-base', dataKey:'dex' },
  { elementId: 'statistics-stats-con-base', dataKey:'con' },
  { elementId: 'statistics-stats-int-base', dataKey:'int' },
  { elementId: 'statistics-stats-wis-base', dataKey:'wis' },
  { elementId: 'statistics-stats-cha-base', dataKey:'cha' },

// Equipment variables
{ elementId: 'equipment-body-slots-belts',                dataKey:['equipment_list', 0] },
{ elementId: 'equipment-body-slots-body',                 dataKey:['equipment_list', 1] },
{ elementId: 'equipment-body-slots-chest',                dataKey:['equipment_list', 2] },
{ elementId: 'equipment-body-slots-eyes',                 dataKey:['equipment_list', 3] },
{ elementId: 'equipment-body-slots-feet',                 dataKey:['equipment_list', 4] },
{ elementId: 'equipment-body-slots-hands',                dataKey:['equipment_list', 5] },
{ elementId: 'equipment-body-slots-head',                 dataKey:['equipment_list', 6] },
{ elementId: 'equipment-body-slots-headband',             dataKey:['equipment_list', 7] },
{ elementId: 'equipment-body-slots-neck',                 dataKey:['equipment_list', 8] },
{ elementId: 'equipment-body-slots-shoulders',            dataKey:['equipment_list', 9] },
{ elementId: 'equipment-body-slots-wrist',                dataKey:['equipment_list', 10] },
{ elementId: 'equipment-body-slots-ring-left-hand',       dataKey:['equipment_list', 11] },
{ elementId: 'equipment-body-slots-ring-right-hand',      dataKey:['equipment_list', 12] },


// Class name section
{ elementId: 'basics-classes-all-0-name', dataKey:'c_class' },
{ elementId: 'basics-classes-all-0-level', dataKey:'level' },
{ elementId: 'basics-classes-all-0-hp-base', dataKey:'total_hp_rolls' },
{ elementId: 'basics-classes-all-0-saves-fortitude', dataKey:'fort_saving_throw' },
{ elementId: 'basics-classes-all-0-saves-reflex', dataKey:'reflex_saving_throw' },
{ elementId: 'basics-classes-all-0-saves-will', dataKey:'wisdom_saving_throw' },
{ elementId: 'basics-classes-all-0-bab', dataKey:'bab_total' },


// Defense section
{ elementId: 'defense-ac-stats-armor', dataKey:'armor_ac' },
{ elementId: 'defense-ac-stats-shield', dataKey:'shield_ac' },


{ elementId: 'equipment-armor-armor-name', dataKey:'armor_name' },
{ elementId: 'equipment-armor-armor-check-penalty', dataKey:'armor_armor_check_penalty' },
{ elementId: 'equipment-armor-armor-max-dex', dataKey:'armor_max_dex_bonus' },
{ elementId: 'equipment-armor-armor-arcane-spell-failure', dataKey:'armor_spell_failure' },
{ elementId: 'equipment-armor-armor-weight', dataKey:'armor_weight' },

{ elementId: 'equipment-armor-shield-name', dataKey:'shield_name' },
{ elementId: 'equipment-armor-shield-check-penalty', dataKey:'shield_armor_check_penalty' },
{ elementId: 'equipment-armor-shield-max-dex', dataKey:'shield_max_dex_bonus' },
{ elementId: 'equipment-armor-shield-arcane-spell-failure', dataKey:'shield_spell_failure' },
{ elementId: 'equipment-armor-shield-weight', dataKey:'shield_weight' },

// description / test variables

    
    // Add more mappings for additional variables as needed
];


export default variableMappings;