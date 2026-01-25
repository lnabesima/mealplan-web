import { Days } from "@/core/constants";
import type { IMenuService } from "@/core/interfaces/menu-service.interface";
import type { WeeklyPlan } from "@/core/models";

const SIMULATED_DELAY_MS: number = 500;

const MOCK_WEEKLY_PLAN: WeeklyPlan = [
  {
    day: Days.SUNDAY,
    breakfast: { id: "1", name: "Panqueca de Banana" },
    lunch: { id: "2", name: "Churrasco" },
    dinner: null,
  },
  {
    day: Days.MONDAY,
    breakfast: { id: "3", name: "Aveia com Frutas" },
    lunch: { id: "4", name: "Salada de Frango Grelhado" },
    dinner: { id: "5", name: "Sopa de Legumes" },
  },
  {
    day: Days.TUESDAY,
    breakfast: null,
    lunch: { id: "6", name: "Arroz e Feijão" },
    dinner: { id: "7", name: "Tacos" },
  },
  {
    day: Days.WEDNESDAY,
    breakfast: { id: "8", name: "Torrada com ovos mexidos" },
    lunch: { id: "9", name: "Peixe assado" },
    dinner: null,
  },
  {
    day: Days.THURSDAY,
    breakfast: { id: "10", name: "Iogurte Grego com granola" },
    lunch: { id: "11", name: "Espaguete à carbonara" },
    dinner: { id: "12", name: "Sanduíche de frango" },
  },
  {
    day: Days.FRIDAY,
    breakfast: { id: "13", name: "Smoothie" },
    lunch: null,
    dinner: { id: "14", name: "Pizza" },
  },
  {
    day: Days.SATURDAY,
    breakfast: { id: "15", name: "Waffles" },
    lunch: { id: "16", name: "Feijoada" },
    dinner: { id: "17", name: "Hamburger" },
  },
];

export const MenuService: IMenuService = {
  getCurrentWeeklyPlan: async (): Promise<WeeklyPlan> => {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

    return MOCK_WEEKLY_PLAN;
  },
};
