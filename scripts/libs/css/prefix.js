"use strict";
const {
  OBS_CHARACTER_PREFIX: pre_chara,
  OBS_ENEMY_PREFIX: pre_enemy,
  OBS_QUARTZ_PREFIX: pre_quartz,
  OBS_TROPHY_PREFIX: pre_trophy,
} = process.env;

const prefix = (category) => {
  switch (category) {
    case "Character":
      return pre_chara;
    case "Enemy":
      return pre_enemy;
    case "Trophy":
      return pre_trophy;
    default:
      if (category.indexOf("Quartz") >= 0) {
        return pre_quartz;
      }
      return null;
  }
};

module.exports.prefix = prefix;
