import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "./useUser";

const gameStat = {
  points: 0,
  currentLevel: 1,
  levelData: {
    level: 1,
    points: 0,
    maxPoints: 5000,
  },
  manager: {
    level: 0,
    timeTriggered: -1
  },
  damage: 1,
  energy: 1000,
  energyCap: 1000,
  rechargeSpeed: 1,
  freeBoosts: {
    turboCount: 3,
    maxTurbo: 3,
    turboLastActivatedAt: -1,
    turboAmountLastRechargeDate: -1,
    refillEnergyAmount: 3,
    maxRefillEnergyAmount: 3,
    refillEnergyLastActivatedAt: -1,
    refillEnergyAmountLastRechargeDate: -1
  },
  turboActive: false,
  turboDamageEndAt: -1,
  turboDamageStartAt: -1,
  turboDamageMultiplier: 10,
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const useUserStore = create(
  persist(
    (set, get) => ({
      ...gameStat,
      tap: () => {
        // ensure gamestat.energy is greater than damage
        //increament gamestat.point and gamestate.leveData.point by gamestat.damage
        //decresment gamestat.energy by gamestate.damage
        const { energy, damage, points, levelData } = get();

        if (energy >= damage) {
          set({
            energy: energy - damage,
            points: points + damage,
            levelData: {
              ...levelData,
              points: levelData.points + damage
            }
          });
        }
      },
      recharge: () => {
        //ensure gameState.energy is less than gameState.energyCap
        //increament gameState.energy by rechargeSpeed
        // energy cannot be greater than energyCap
        const { energy, energyCap, rechargeSpeed } = get();

        if (energy < energyCap) {
          const newEnergy = Math.min(energy + rechargeSpeed, energyCap);
          set({ energy: newEnergy });
        }
      },
      upgradeRechargeSpeed: () => {
        //calc cost following [100, ...(1000 *2^(rechargeSpeed))] this means the first upgrade cost 100 point, every other upgrades cost 1000*2^(rechargeSpeed)
        //ensure point >= cost
        //deduct cost from point,
        //increment rechargeSpeed by 1
        const { points, rechargeSpeed } = get();
        const cost = rechargeSpeed === 1 ? 100 : 1000 * Math.pow(2, rechargeSpeed);

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
        const cost = damage === 1 ? 100 : 1000 * Math.pow(2, damage);

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
        const cost = energyCapLevel === 1 ? 100 : 1000 * Math.pow(2, energyCapLevel);

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
        const cost = manager.level === 0 ? 25000 : 50000 * Math.pow(2, manager.level + 1);

        if (points >= cost) {
          set({
            points: points - cost,
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
      rechargTurbo: () => {
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

      }

    }),
    {
      name: "play-ai-game-record",
      storage: createJSONStorage(() => storage)
    }
  )
);