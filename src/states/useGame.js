import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


const gameStat = {
  points: 0,
  currentLevel: 1,
  levelData: {
      level: 1,
      maxPoints: 5000,
      points: 0,
      name: 'Normies',
      bonus: 10000
  },
  manager: {
    level: 0,
    timeTriggered: 0,
    managerRestAt: 0,
  },
  damage: 1,
  energy: 1000,
  energyCap: 1000,
  rechargeSpeed: 1,
  freeBoosts: {
    turboCount: 3,
    maxTurbo: 3,
    turboLastActivatedAt: 0,
    turboAmountLastRechargeDate: 0,
    refillEnergyAmount: 3,
    maxRefillEnergyAmount: 3,
    refillEnergyLastActivatedAt: 0,
    refillEnergyAmountLastRechargeDate: 0
  },
  managerActive: false,
  turboActive: false,
  turboDamageEndAt: 0,
  turboDamageStartAt: 0,
  turboDamageMultiplier: 10,
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default create(
  persist(
    (set, get) => ({
      ...gameStat,
      tap: () => {
        // ensure gamestat.energy is greater than damage
        //increament gamestat.point and gamestate.leveData.point by gamestat.damage
        //decresment gamestat.energy by gamestate.damage
        //if levelData.points == levelData.maxPoint, upgrade their level. reset levelData.points to 0, then maxPoint to config.level[CurrentLevel].maxPoint and config.level[CurrentLevel].bonus to pinta then increment currentLevel
        const { energy, damage, points, levelData, currentLevel } = get();

        if (energy >= damage) {
          let newPoints = points + damage;
          let newLevelDataPoints = levelData.points + damage;
          let newEnergy = energy - damage;
          let newLevel = currentLevel;
          if (newLevelDataPoints >= levelData.maxPoints) {
            newLevelDataPoints = 0;
            newLevel++;

            if (config.levels[newLevel - 1]) {
              const nextLevelConfig = config.levels[newLevel - 1];
              set(state => ({
                points: newPoints + levelData.bonus,
                currentLevel: newLevel,
                levelData: {
                  ...state.levelData,
                  level: nextLevelConfig.level,
                  name: nextLevelConfig.name,
                  points: newLevelDataPoints,
                  maxPoints: nextLevelConfig.maxPoints,
                  bonus: nextLevelConfig.bonus
                }
              }));
            }
          } else {
            set({
              energy: newEnergy,
              points: newPoints,
              levelData: {
                ...levelData,
                points: newLevelDataPoints
              }
            });
          }
          return true
        }
        return false
      },
      recharge: () => {
        //ensure gameState.energy is less than gameState.energyCap
        //increament gameState.energy by rechargeSpeed
        // energy cannot be greater than energyCap
        const { energy, energyCap, rechargeSpeed, lastRecharged } = get();
        const now = Date.now();
        if (lastRecharged > -1) {
          const elapsed = Math.floor((now - lastRecharged) / 999);

          const additionalEnergy = elapsed * rechargeSpeed;
          const newEnergy = Math.min(energy + additionalEnergy, energyCap);

          set({
            energy: newEnergy,
            lastRecharged: now,
          });
        } else {
          set({
            energy: energyCap,
            lastRecharged: now,
          });
        }
      },
      upgradeRechargeSpeed: () => {
        //calc cost following [100, ...(1000 *2^(rechargeSpeed))] this means the first upgrade cost 100 point, every other upgrades cost 1000*2^(rechargeSpeed)
        //ensure point >= cost
        //deduct cost from point,
        //increment rechargeSpeed by 1
        const { points, rechargeSpeed } = get();
        const cost = rechargeSpeed === 1 ? 100 : 1000 * Math.pow(2, rechargeSpeed - 1);

        if (points >= cost) {
          set({
            points: points - cost,
            rechargeSpeed: rechargeSpeed + 1
          });
        }
      },
      upgradeDamage: () => {
        //calc cost following [100, ...(1000 *2^(damage))] this means the first upgrade cost 100 point, every other upgrades cost 1000*2^(damage)
        //ensure point >= cost
        //deduct cost from point,
        //increment damage by 1
        const { points, damage } = get();
        const cost = damage === 1 ? 100 : 1000 * Math.pow(2, damage - 1);

        if (points >= cost) {
          set({
            points: points - cost,
            damage: damage + 1
          });
        }
      },
      upgradeEnergyCap: () => {
        //energyCapLevel is calc by if energyCap == 1000, level 1. then ((energyCap - 1000)/500)+1
        //calc cost following [100, ...(1000 *2^(energyCapLevel))] this means the first upgrade cost 100 point, every other upgrades cost 1000*2^(energyCapLevel)
        //ensure point >= cost
        //deduct cost from point,
        //increment energyCap by 500
        const { points, energyCap } = get();
        const energyCapLevel = energyCap === 1000 ? 1 : ((energyCap - 1000) / 500) + 1;
        const cost = energyCapLevel === 1 ? 100 : 1000 * Math.pow(2, energyCapLevel - 1);

        if (points >= cost) {
          set({
            points: points - cost,
            energyCap: energyCap + 500
          });
        }
      },
      upgradeManager: () => {
        //calc cost following [25000, ...(50000 * 2^(manager.level+1))] this means the first upgrade cost 100 point, every other upgrades cost 50000*2^(manager.level+1)
        //ensure point >= cost
        //deduct cost from point,
        //increment manager.level by 1
        const { points, manager } = get();
        const cost = manager.level === 0 ? 5000 : 10000 * Math.pow(2, manager.level + 1);

        if (points >= cost) {
          set({
            points: (points - cost),
            manager: {
              ...manager,
              level: manager.level + 1
            }
          });
        }
      },
      claimRefill: () => {
        //ensure freeBoost.refillEnergyAmount > 0
        // increment energy to energyCap
        //decrement freeBoost.refillEnergyAmount by 1
        const { energyCap, freeBoosts } = get();

        if (freeBoosts.refillEnergyAmount > 0) {
          set(state => ({
            energy: energyCap,
            freeBoosts: {
              ...state.freeBoosts,
              refillEnergyAmount: state.freeBoosts.refillEnergyAmount - 1,
              refillEnergyLastActivatedAt: Date.now(),
            }
          }));
        }
      },
      claimTurbo: () => {
        //ensure freeBoost.turboCount > 0
        // set turboActive to true
        //decrement freeBoost.turboCount by 1
        const { freeBoosts } = get();

        if (freeBoosts.turboCount > 0) {
          set(state => ({
            turboActive: true,
            freeBoosts: {
              ...state.freeBoosts,
              turboCount: state.freeBoosts.turboCount - 1,
              turboLastActivatedAt: Date.now(),
            }
          }));
        }
      },
      rechargeTurbo: () => {
        //ensure freeBoosts.turboLastActivatedAt > 24hrs or turboAmountLastRechargeDate > 24hrs
        //increament freeBoosts.turboCount to freeBoosts.maxTurbo
        //set turboAmountLastRechargeDate to date now
        const { freeBoosts } = get();
        const now = Date.now();

        if (now - freeBoosts.turboLastActivatedAt >= ONE_DAY_MS ||
          now - freeBoosts.turboAmountLastRechargeDate >= ONE_DAY_MS) {
          set(state => ({
            freeBoosts: {
              ...state.freeBoosts,
              turboCount: state.freeBoosts.maxTurbo,
              turboAmountLastRechargeDate: now,
            }
          }));
        }

      },
      rechargeRefill: () => {
        //ensure freeBoosts.refillEnergyLastActivatedAt > 24hrs or refillEnergyAmountLastRechargeDate > 24hrs
        //increament freeBoosts.refillEnergyAmount to freeBoosts.maxRefillEnergyAmount
        //set refillEnergyAmountLastRechargeDate to date nowconst { freeBoosts } = get();
        const { freeBoosts } = get();
        const now = Date.now();

        if (now - freeBoosts.refillEnergyLastActivatedAt > ONE_DAY_MS ||
          now - freeBoosts.refillEnergyAmountLastRechargeDate > ONE_DAY_MS) {
          set(state => ({
            freeBoosts: {
              ...state.freeBoosts,
              refillEnergyAmount: state.freeBoosts.maxRefillEnergyAmount,
              refillEnergyAmountLastRechargeDate: now,
            }
          }));
        }

      },
      startManager: () => {
        const { manager, managerActive } = get();
        const now = Date.now();
        const autoTapDuration = manager.level * 60 * 1000;

        if (!managerActive) {
          set((state) => ({
            managerActive: true,
            manager: {
              ...state.manager,
              timeTriggered: now,
              managerRestAt: now + autoTapDuration,
            },
          }));
        }
      },
      managerTap: () => {
        const { manager, managerActive, energy, energyCap, levelData, currentLevel, damage, points, rechargeSpeed } = get();
        const now = Date.now();

        if (managerActive) {
          if (now >= manager.managerRestAt) {
            if (energy === energyCap) {
              const elapsed = Math.max(0, manager.managerRestAt - manager.timeTriggered);
              const posiblePoints = damage * Math.floor(elapsed / 1000);
              const totalRechargeableEnergy = energy + rechargeSpeed * Math.floor(elapsed / 1000);
              const totalPoints = Math.min(totalRechargeableEnergy, posiblePoints);

              console.log({ totalPoints, totalRechargeableEnergy, posiblePoints, elapsed })
              let newPoints = points + totalPoints;
              let newLevelDataPoints = levelData.points + totalPoints;
              let newEnergy = Math.min(energyCap, Math.max(0, totalRechargeableEnergy - totalPoints));
              let newLevel = currentLevel;

              if (newLevelDataPoints >= levelData.maxPoints) {
                newLevelDataPoints = 0;
                newLevel++;

                if (config.levels[newLevel - 1]) {
                  const nextLevelConfig = config.levels[newLevel - 1];
                  set(state => ({
                    points: newPoints + levelData.bonus,
                    currentLevel: newLevel,
                    managerActive: false,
                    levelData: {
                      ...state.levelData,
                      level: nextLevelConfig.level,
                      name: nextLevelConfig.name,
                      points: newLevelDataPoints,
                      maxPoints: nextLevelConfig.maxPoints,
                      bonus: nextLevelConfig.bonus
                    },
                    manager: {
                      ...state.manager,
                      managerRestAt: 0,
                      timeTriggered: 0,
                    },
                  }));
                }
              } else {
                set({
                  energy: newEnergy,
                  points: newPoints,
                  managerActive: false,
                  levelData: {
                    ...levelData,
                    points: newLevelDataPoints
                  },
                  manager: {
                    ...manager,
                    managerRestAt: 0,
                    timeTriggered: 0,
                  }
                });
              }
            }
          } else {
            const elapsed = now - manager.timeTriggered;
            const totalPoints = damage * Math.floor(elapsed / 999);
            const totalRechargeableEnergy = energy + rechargeSpeed * Math.floor(elapsed / 1000);
            const minEnergyPoints = Math.min(totalRechargeableEnergy, totalPoints);
            console.log({ minEnergyPoints, totalRechargeableEnergy, totalPoints, elapsed })

            if (energy >= totalPoints) {
              // Sufficient energy, simple subtraction
              let newPoints = points + totalPoints;
              let newLevelDataPoints = levelData.points + totalPoints;
              let newEnergy = energy - totalPoints;
              let newLevel = currentLevel;

              if (newLevelDataPoints >= levelData.maxPoints) {
                newLevelDataPoints = 0;
                newLevel++;

                if (config.levels[newLevel - 1]) {
                  const nextLevelConfig = config.levels[newLevel - 1];
                  set(state => ({
                    energy: newEnergy,
                    points: newPoints + levelData.bonus,
                    currentLevel: newLevel,
                    levelData: {
                      ...state.levelData,
                      level: nextLevelConfig.level,
                      name: nextLevelConfig.name,
                      points: newLevelDataPoints,
                      maxPoints: nextLevelConfig.maxPoints,
                      bonus: nextLevelConfig.bonus
                    },
                    manager: {
                      ...state.manager,
                      timeTriggered: now,
                    },
                  }));
                }
              } else {
                set({
                  energy: newEnergy,
                  points: newPoints,
                  levelData: {
                    ...levelData,
                    points: newLevelDataPoints
                  },
                  manager: {
                    ...manager,
                    timeTriggered: now,
                  }
                });
              }
            } else {
              if (energy === energyCap) {
                // Insufficient energy, use up all energy and recharge if possible
                let newEnergy = Math.min(energyCap, Math.max(0, totalRechargeableEnergy - totalPoints));
                let newPoints = points + minEnergyPoints;
                let newLevelDataPoints = levelData.points + minEnergyPoints;
                let newLevel = currentLevel;

                // console.log({minEnergyPoints, totalRechargeableEnergy, totalPoints, elapsed})
                if (newLevelDataPoints >= levelData.maxPoints) {
                  newLevelDataPoints = 0;
                  newLevel++;

                  if (config.levels[newLevel - 1]) {
                    const nextLevelConfig = config.levels[newLevel - 1];
                    set(state => ({
                      points: newPoints + levelData.bonus,
                      currentLevel: newLevel,
                      levelData: {
                        ...state.levelData,
                        level: nextLevelConfig.level,
                        name: nextLevelConfig.name,
                        points: newLevelDataPoints,
                        maxPoints: nextLevelConfig.maxPoints,
                        bonus: nextLevelConfig.bonus
                      },
                      energy: newEnergy,
                      manager: {
                        ...state.manager,
                        timeTriggered: now,
                      },
                    }));
                  }
                } else {
                  set({
                    energy: newEnergy,
                    points: newPoints,
                    levelData: {
                      ...levelData,
                      points: newLevelDataPoints
                    },
                    manager: {
                      ...manager,
                      timeTriggered: now,
                    }
                  });
                }
              }
            }
          }
        }
      },
    }),
    {
      name: "play-ai-game-record",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

const config = {
  levels: [
    {
      level: 1,
      maxPoints: 5000,
      name: 'Normies',
      desc: ' ',
      bonus: 10000
    },
    {
      level: 2,
      maxPoints: 200000,
      name: 'Cadet',
      desc: ' ',
      bonus: 50000
    },
    {
      level: 3,
      maxPoints: 2000000,
      name: 'Officer',
      desc: ' ',
      bonus: 100000
    },
    {
      level: 4,
      maxPoints: 3000000,
      name: 'Lieutenant',
      desc: ' ',
      bonus: 500000
    },
    {
      level: 5,
      maxPoints: 4000000,
      name: 'Captain',
      desc: ' ',
      bonus: 1000000
    },
    {
      level: 6,
      maxPoints: 6000000,
      name: 'Major',
      desc: ' ',
      bonus: 1500000
    },
    {
      level: 7,
      maxPoints: 8000000,
      name: 'Colonel',
      desc: ' ',
      bonus: 2000000
    },
    {
      level: 8,
      maxPoints: 10000000,
      name: 'Brigadier',
      desc: ' ',
      bonus: 3000000
    },
    {
      level: 9,
      maxPoints: 13000000,
      name: 'General',
      desc: ' ',
      bonus: 4500000
    },
    {
      level: 10,
      maxPoints: 16000000,
      name: 'Field Marshal',
      desc: ' ',
      bonus: 6000000
    },
    {
      level: 11,
      maxPoints: 20000000,
      name: 'CHAD',
      desc: ' ',
      bonus: 8000000
    }
  ]

}