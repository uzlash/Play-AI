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
    turboActivePurchase: false,
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
  turboDamageMultiplier: 10,
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const advanceLevel = (state, newPoints) => {
  let { currentLevel, levelData } = state;
  let newLevelDataPoints = levelData.points + newPoints;
  let newLevel = currentLevel;

  if (newLevelDataPoints >= levelData.maxPoints) {
    newLevelDataPoints = 0;
    newLevel++;

    if (config.levels[newLevel - 1]) {
      const nextLevelConfig = config.levels[newLevel - 1];
      return {
        points: state.points + newPoints + levelData.bonus,
        currentLevel: newLevel,
        levelData: {
          ...levelData,
          level: nextLevelConfig.level,
          name: nextLevelConfig.name,
          points: newLevelDataPoints,
          maxPoints: nextLevelConfig.maxPoints,
          bonus: nextLevelConfig.bonus
        }
      };
    }
  }

  return {
    points: state.points + newPoints,
    levelData: {
      ...levelData,
      points: newLevelDataPoints
    }
  };
};


const updateStateWithLevel = (state, newPoints, newLevelDataPoints, newEnergy) => {
  const { currentLevel, levelData } = state;
  let newLevel = currentLevel;

  if (newLevelDataPoints >= levelData.maxPoints) {
    newLevelDataPoints = 0;
    newLevel++;
    if (config.levels[newLevel - 1]) {
      const nextLevelConfig = config.levels[newLevel - 1];
      return {
        energy: newEnergy,
        points: state.points + newPoints + levelData.bonus,
        currentLevel: newLevel,
        levelData: {
          ...state.levelData,
          level: nextLevelConfig.level,
          name: nextLevelConfig.name,
          points: newLevelDataPoints,
          maxPoints: nextLevelConfig.maxPoints,
          bonus: nextLevelConfig.bonus
        }
      };
    }
  }
  return {
    energy: newEnergy,
    points: state.points + newPoints,
    levelData: {
      ...state.levelData,
      points: newLevelDataPoints
    }
  };
};


const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const millionUnits = [
  '',
  'million',
  'billion',
  'trillion',
  'quatrillion'
]

export function parsePoints(points) {
  let value = points
  let million = 0
  if (value > 1000000) {
    value /= 1000000
    million += 1
    while (value / 1000 > 1) {
      value /= 1000
      million += 1
    }
  }

  return {
    value: formatter.format(value),
    units: millionUnits[million]
  }
}

export default create(
  persist(
    (set, get) => ({
      ...gameStat,
      tap: () => {
        const { energy, damage } = get();
        if (energy >= damage) {
          set(state => ({
            ...advanceLevel(state, damage),
            energy: state.energy - damage
          }));
          return true;
        }
        return false;
      },
      turboTap: () => {
        const { turboActive, turboDamageEndAt, turboDamageMultiplier, damage } = get();
        if (turboActive && turboDamageEndAt >= Date.now()) {
          set(state => advanceLevel(state, damage * turboDamageMultiplier));
        } else {
          set({ turboActive: false, turboDamageEndAt: 0 });
        }
      },
      recharge: () => {
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
        const { points, manager } = get();
        const cost = manager.level === 0 ? 1000 : 2000 * Math.pow(2, manager.level + 1);
        // const cost = manager.level === 0 ? 5000 : 10000 * Math.pow(2, manager.level + 1);

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
        const { freeBoosts } = get();

        if (freeBoosts.turboCount > 0) {
          set(state => ({
            turboActive: true,
            freeBoosts: {
              ...state.freeBoosts,
              turboCount: state.freeBoosts.turboCount - 1,
              turboActivePurchase: true,
              turboLastActivatedAt: Date.now(),
            }
          }));
        }
      },
      rechargeTurbo: () => {
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
      activateTurbo: () => {
        const { turboActive, freeBoosts } = get();
        const now = Date.now();

        if (!turboActive && freeBoosts.turboActivePurchase) {
          set((state) => ({
            turboActive: true,
            turboDamageEndAt: now + (20 * 1000),
            freeBoosts: {
              ...state.freeBoosts,
              turboActivePurchase: false,
            },
          }));
        }
      },
      managerTap: () => {
        const { manager, managerActive, energy, energyCap, levelData,  damage, rechargeSpeed } = get();
        const now = Date.now();
        if (!managerActive) return;

        const elapsed = now >= manager.managerRestAt ? manager.managerRestAt - manager.timeTriggered : now - manager.timeTriggered;
        const elapsedSecs = Math.floor(elapsed / 1000);
        const totalPoints = damage * elapsedSecs;
        const totalRechargeableEnergy = energy + rechargeSpeed * elapsedSecs;
        const minEnergyPoints = Math.min(totalRechargeableEnergy, totalPoints);
        let newEnergy = energy;

        if (now >= manager.managerRestAt) {
          newEnergy = Math.min(energyCap, totalRechargeableEnergy - minEnergyPoints);
        } else {
          newEnergy = Math.max(0, energy - totalPoints);
        }
        const newLevelDataPoints = levelData.points + minEnergyPoints;
        const newState = updateStateWithLevel(get(), minEnergyPoints, newLevelDataPoints, newEnergy);

        const updatedState = now >= manager.managerRestAt
          ? {
            ...newState,
            managerActive: false,
            manager: {
              ...manager,
              managerRestAt: 0,
              timeTriggered: 0,
            },
          }
          : {
            ...newState,
            manager: {
              ...manager,
              timeTriggered: now,
            },
          };

        set(updatedState);
      },
    }),
    {
      name: "play-ai-game-record",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

// export default create(
//   persist(
//     (set, get) => ({
//       ...gameStat,
//       tap: () => {
//         const { energy, damage, points, levelData, currentLevel } = get();

//         if (energy >= damage) {
//           let newPoints = points + damage;
//           let newLevelDataPoints = levelData.points + damage;
//           let newEnergy = energy - damage;
//           let newLevel = currentLevel;
//           if (newLevelDataPoints >= levelData.maxPoints) {
//             newLevelDataPoints = 0;
//             newLevel++;

//             if (config.levels[newLevel - 1]) {
//               const nextLevelConfig = config.levels[newLevel - 1];
//               set(state => ({
//                 points: newPoints + levelData.bonus,
//                 currentLevel: newLevel,
//                 levelData: {
//                   ...state.levelData,
//                   level: nextLevelConfig.level,
//                   name: nextLevelConfig.name,
//                   points: newLevelDataPoints,
//                   maxPoints: nextLevelConfig.maxPoints,
//                   bonus: nextLevelConfig.bonus
//                 }
//               }));
//             }
//           } else {
//             set({
//               energy: newEnergy,
//               points: newPoints,
//               levelData: {
//                 ...levelData,
//                 points: newLevelDataPoints
//               }
//             });
//           }
//           return true
//         }
//         return false
//       },
//       turboTap: () => {
//         const { turboActive, turboDamageEndAt, turboDamageMultiplier, damage, points, levelData, currentLevel } = get();

//         if (turboActive) {
//           const now = Date.now();
//           if (turboDamageEndAt >= now) {
//             let newPoints = points + (damage * turboDamageMultiplier);
//             let newLevelDataPoints = levelData.points + (damage * turboDamageMultiplier);
//             let newLevel = currentLevel;
//             if (newLevelDataPoints >= levelData.maxPoints) {
//               newLevelDataPoints = 0;
//               newLevel++;

//               if (config.levels[newLevel - 1]) {
//                 const nextLevelConfig = config.levels[newLevel - 1];
//                 set(state => ({
//                   points: newPoints + levelData.bonus,
//                   currentLevel: newLevel,
//                   levelData: {
//                     ...state.levelData,
//                     level: nextLevelConfig.level,
//                     name: nextLevelConfig.name,
//                     points: newLevelDataPoints,
//                     maxPoints: nextLevelConfig.maxPoints,
//                     bonus: nextLevelConfig.bonus
//                   }
//                 }));
//               }
//             } else {
//               set({
//                 points: newPoints,
//                 levelData: {
//                   ...levelData,
//                   points: newLevelDataPoints
//                 }
//               });
//             }
//           } else {
//             set({ turboActive: false, turboDamageEndAt: 0 })
//           }
//         }
//       },
//       recharge: () => {
//         const { energy, energyCap, rechargeSpeed, lastRecharged } = get();
//         const now = Date.now();
//         if (lastRecharged > -1) {
//           const elapsed = Math.floor((now - lastRecharged) / 999);

//           const additionalEnergy = elapsed * rechargeSpeed;
//           const newEnergy = Math.min(energy + additionalEnergy, energyCap);

//           set({
//             energy: newEnergy,
//             lastRecharged: now,
//           });
//         } else {
//           set({
//             energy: energyCap,
//             lastRecharged: now,
//           });
//         }
//       },
//       upgradeRechargeSpeed: () => {
//         const { points, rechargeSpeed } = get();
//         const cost = rechargeSpeed === 1 ? 100 : 1000 * Math.pow(2, rechargeSpeed - 1);

//         if (points >= cost) {
//           set({
//             points: points - cost,
//             rechargeSpeed: rechargeSpeed + 1
//           });
//         }
//       },
//       upgradeDamage: () => {
//         const { points, damage } = get();
//         const cost = damage === 1 ? 100 : 1000 * Math.pow(2, damage - 1);

//         if (points >= cost) {
//           set({
//             points: points - cost,
//             damage: damage + 1
//           });
//         }
//       },
//       upgradeEnergyCap: () => {
//         const { points, energyCap } = get();
//         const energyCapLevel = energyCap === 1000 ? 1 : ((energyCap - 1000) / 500) + 1;
//         const cost = energyCapLevel === 1 ? 100 : 1000 * Math.pow(2, energyCapLevel - 1);

//         if (points >= cost) {
//           set({
//             points: points - cost,
//             energyCap: energyCap + 500
//           });
//         }
//       },
//       upgradeManager: () => {
//         const { points, manager } = get();
//         const cost = manager.level === 0 ? 1000 : 2000 * Math.pow(2, manager.level + 1);
//         // const cost = manager.level === 0 ? 5000 : 10000 * Math.pow(2, manager.level + 1);

//         if (points >= cost) {
//           set({
//             points: (points - cost),
//             manager: {
//               ...manager,
//               level: manager.level + 1
//             }
//           });
//         }
//       },
//       claimRefill: () => {
//         const { energyCap, freeBoosts } = get();

//         if (freeBoosts.refillEnergyAmount > 0) {
//           set(state => ({
//             energy: energyCap,
//             freeBoosts: {
//               ...state.freeBoosts,
//               refillEnergyAmount: state.freeBoosts.refillEnergyAmount - 1,
//               refillEnergyLastActivatedAt: Date.now(),
//             }
//           }));
//         }
//       },
//       claimTurbo: () => {
//         const { freeBoosts } = get();

//         if (freeBoosts.turboCount > 0) {
//           set(state => ({
//             turboActive: true,
//             freeBoosts: {
//               ...state.freeBoosts,
//               turboCount: state.freeBoosts.turboCount - 1,
//               turboActivePurchase: true,
//               turboLastActivatedAt: Date.now(),
//             }
//           }));
//         }
//       },
//       rechargeTurbo: () => {
//         const { freeBoosts } = get();
//         const now = Date.now();

//         if (now - freeBoosts.turboLastActivatedAt >= ONE_DAY_MS ||
//           now - freeBoosts.turboAmountLastRechargeDate >= ONE_DAY_MS) {
//           set(state => ({
//             freeBoosts: {
//               ...state.freeBoosts,
//               turboCount: state.freeBoosts.maxTurbo,
//               turboAmountLastRechargeDate: now,
//             }
//           }));
//         }

//       },
//       rechargeRefill: () => {
//         const { freeBoosts } = get();
//         const now = Date.now();

//         if (now - freeBoosts.refillEnergyLastActivatedAt > ONE_DAY_MS ||
//           now - freeBoosts.refillEnergyAmountLastRechargeDate > ONE_DAY_MS) {
//           set(state => ({
//             freeBoosts: {
//               ...state.freeBoosts,
//               refillEnergyAmount: state.freeBoosts.maxRefillEnergyAmount,
//               refillEnergyAmountLastRechargeDate: now,
//             }
//           }));
//         }

//       },
//       startManager: () => {
//         const { manager, managerActive } = get();
//         const now = Date.now();
//         const autoTapDuration = manager.level * 60 * 1000;

//         if (!managerActive) {
//           set((state) => ({
//             managerActive: true,
//             manager: {
//               ...state.manager,
//               timeTriggered: now,
//               managerRestAt: now + autoTapDuration,
//             },
//           }));
//         }
//       },
//       activateTurbo: () => {
//         const { turboActive, freeBoosts } = get();
//         const now = Date.now();

//         if (!turboActive && freeBoosts.turboActivePurchase) {
//           set((state) => ({
//             turboActive: true,
//             turboDamageEndAt: now + (20 * 1000),
//             freeBoosts: {
//               ...state.freeBoosts,
//               turboActivePurchase: false,
//             },
//           }));
//         }
//       },
//       managerTap: () => {
//         const { manager, managerActive, energy, energyCap, levelData, currentLevel, damage, points, rechargeSpeed } = get();
//         const now = Date.now();

//         if (managerActive) {
//           if (now >= manager.managerRestAt) {
//             const elapsed = Math.max(0, manager.managerRestAt - manager.timeTriggered);
//             const posiblePoints = damage * Math.floor(elapsed / 1000);
//             const totalRechargeableEnergy = energy + rechargeSpeed * Math.floor(elapsed / 1000);
//             const totalPoints = Math.min(totalRechargeableEnergy, posiblePoints);

//             if (totalRechargeableEnergy >= totalPoints || energy === energyCap) {
//               let newPoints = points + totalPoints;
//               let newLevelDataPoints = levelData.points + totalPoints;
//               let newEnergy = Math.min(energyCap, Math.max(0, totalRechargeableEnergy - totalPoints));
//               let newLevel = currentLevel;

//               if (newLevelDataPoints >= levelData.maxPoints) {
//                 newLevelDataPoints = 0;
//                 newLevel++;

//                 if (config.levels[newLevel - 1]) {
//                   const nextLevelConfig = config.levels[newLevel - 1];
//                   set(state => ({
//                     points: newPoints + levelData.bonus,
//                     currentLevel: newLevel,
//                     managerActive: false,
//                     levelData: {
//                       ...state.levelData,
//                       level: nextLevelConfig.level,
//                       name: nextLevelConfig.name,
//                       points: newLevelDataPoints,
//                       maxPoints: nextLevelConfig.maxPoints,
//                       bonus: nextLevelConfig.bonus
//                     },
//                     manager: {
//                       ...state.manager,
//                       managerRestAt: 0,
//                       timeTriggered: 0,
//                     },
//                   }));
//                 }
//               } else {
//                 set({
//                   energy: newEnergy,
//                   points: newPoints,
//                   managerActive: false,
//                   levelData: {
//                     ...levelData,
//                     points: newLevelDataPoints
//                   },
//                   manager: {
//                     ...manager,
//                     managerRestAt: 0,
//                     timeTriggered: 0,
//                   }
//                 });
//               }
//             }
//           } else {
//             const elapsed = now - manager.timeTriggered;
//             const totalPoints = damage * Math.floor(elapsed / 999);
//             const totalRechargeableEnergy = energy + rechargeSpeed * Math.floor(elapsed / 1000);
//             const minEnergyPoints = Math.min(totalRechargeableEnergy, totalPoints);

//             if (energy >= totalPoints) {
//               // Sufficient energy, simple subtraction
//               let newPoints = points + totalPoints;
//               let newLevelDataPoints = levelData.points + totalPoints;
//               let newEnergy = energy - totalPoints;
//               let newLevel = currentLevel;

//               if (newLevelDataPoints >= levelData.maxPoints) {
//                 newLevelDataPoints = 0;
//                 newLevel++;

//                 if (config.levels[newLevel - 1]) {
//                   const nextLevelConfig = config.levels[newLevel - 1];
//                   set(state => ({
//                     energy: newEnergy,
//                     points: newPoints + levelData.bonus,
//                     currentLevel: newLevel,
//                     levelData: {
//                       ...state.levelData,
//                       level: nextLevelConfig.level,
//                       name: nextLevelConfig.name,
//                       points: newLevelDataPoints,
//                       maxPoints: nextLevelConfig.maxPoints,
//                       bonus: nextLevelConfig.bonus
//                     },
//                     manager: {
//                       ...state.manager,
//                       timeTriggered: now,
//                     },
//                   }));
//                 }
//               } else {
//                 set({
//                   energy: newEnergy,
//                   points: newPoints,
//                   levelData: {
//                     ...levelData,
//                     points: newLevelDataPoints
//                   },
//                   manager: {
//                     ...manager,
//                     timeTriggered: now,
//                   }
//                 });
//               }
//             } else {
//               if (energy === energyCap) {
//                 // Insufficient energy, use up all energy and recharge if possible
//                 let newEnergy = Math.min(energyCap, Math.max(0, totalRechargeableEnergy - totalPoints));
//                 let newPoints = points + minEnergyPoints;
//                 let newLevelDataPoints = levelData.points + minEnergyPoints;
//                 let newLevel = currentLevel;

//                 if (newLevelDataPoints >= levelData.maxPoints) {
//                   newLevelDataPoints = 0;
//                   newLevel++;

//                   if (config.levels[newLevel - 1]) {
//                     const nextLevelConfig = config.levels[newLevel - 1];
//                     set(state => ({
//                       points: newPoints + levelData.bonus,
//                       currentLevel: newLevel,
//                       levelData: {
//                         ...state.levelData,
//                         level: nextLevelConfig.level,
//                         name: nextLevelConfig.name,
//                         points: newLevelDataPoints,
//                         maxPoints: nextLevelConfig.maxPoints,
//                         bonus: nextLevelConfig.bonus
//                       },
//                       energy: newEnergy,
//                       manager: {
//                         ...state.manager,
//                         timeTriggered: now,
//                       },
//                     }));
//                   }
//                 } else {
//                   set({
//                     energy: newEnergy,
//                     points: newPoints,
//                     levelData: {
//                       ...levelData,
//                       points: newLevelDataPoints
//                     },
//                     manager: {
//                       ...manager,
//                       timeTriggered: now,
//                     }
//                   });
//                 }
//               }
//             }
//           }
//         }
//       },
//     }),
//     {
//       name: "play-ai-game-record",
//       storage: createJSONStorage(() => localStorage)
//     }
//   )
// );

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
  ],
  dailyRewards: [500, 1000, 2500, 5000, 15000, 25000, 100000, 500000, 1000000, 5000000]
}

