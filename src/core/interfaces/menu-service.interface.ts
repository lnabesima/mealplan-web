import type { WeeklyPlan } from "../models";

export interface IMenuService {
  getCurrentWeeklyPlan(): Promise<WeeklyPlan>;
}
