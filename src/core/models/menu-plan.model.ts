import type { DayOfWeek } from "../constants";
import type { Receipe } from "./recipe.model";

export interface DailyPlan {
  day: DayOfWeek;
  breakfast: Receipe | null;
  lunch: Receipe | null;
  dinner: Receipe | null;
}

export type WeeklyPlan = DailyPlan[];
