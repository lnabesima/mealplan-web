import type { DayOfWeek } from "../constants";
import type { Recipe } from "./recipe.model";

export interface DailyPlan {
  day: DayOfWeek;
  breakfast: Recipe | null;
  lunch: Recipe | null;
  dinner: Recipe | null;
}

export type WeeklyPlan = DailyPlan[];
