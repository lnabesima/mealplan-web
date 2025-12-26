# ADR-001 - Modular & Layered Frontend Architecture
- **Status:** Accepted
- **Date:** 2025-12-19
- **Deciders:** Lucas Nabesima
- **Technical Context:** Next.js 15+ (App Router), React, TypeScript, Future .NET Backend migration.

## Context and Problem Statement
We are developing the **Mealplan** application as a Fullstack Next.js MVP, with a planned migration of the backend to .NET (C#) in the near future. The default Next.js directory structure (grouping by route or generic file type like `components/`) often leads to:
1. **"Spaghetti Code":** Business logic leaking into UI components.
2. **High Coupling:** Frontend components becoming tightly coupled to specific API response shapes.
3. **Migration Friction:** Difficulty in swapping the "Mock" Next.js backend for the real .NET API without major refactoring.
We need a structure that enforces strict separation of concerns, supports type safety, and aligns with the team's background in Angular and C#.

## Decision Drivers
- **Decoupling:** The UI should not "know" about the specific shape of the backend API (DTOs).
- **Scalability:** The codebase must remain organized as the number of features grows.
- **Familiarity:** The structure should resonate with Enterprise patterns (Domain-Driven Design) common in the .NET/Angular ecosystem.
- **Refactoring Safety:** Renaming a backend field should not require changes in 50 UI files, only in one mapper.

## Considered Options
1. **Standard Next.js Structure:** Flat `components`, `hooks`, `types` folders.
2. **Feature-Sliced Design (FSD):** Highly standardized but complex initial learning curve.
3. **"Angular/C# Hybrid" Modular Layered:** Grouping by Domain Module, separating Core/Shared.

## Decision Outcome
We chose option **3: "Angular/C# Hybrid" Modular Layered Architecture**.
We will structure the `src/` directory into four distinct layers:
1. **`core/`**: Pure Domain logic. Contains **Models** (Internal State), **DTOs** (API Contracts), and Constants. _No React Code allowed here._
2. **`modules/`**: Feature-specific implementation (e.g., `menu`, `recipes`). Contains Components, Containers, Services, and Hooks specific to that domain.
3. **`shared/`**: Cross-cutting concerns. Contains reusable UI atoms (`shadcn/ui`), Utils, and Mappers.
4. **`app/`**: Next.js Routing. Keeps logic minimal, acting only as the entry point/router.

### Key Implementation Rules
- **Strict Naming:** Files must use kebab-case with explicit suffixes (e.g., `recipe.model.ts`, `recipe.dto.ts`, `week-grid.component.tsx`).
- **DTO/Model Separation:** We will NOT use API responses directly in the UI.
    - `DTO`: Exact mirror of JSON response.
    - `Model`: Clean, internal TypeScript interface.
    - `Mapper`: Function to convert `DTO -> Model`.
- **UI Library:** Generic UI components reside in `src/shared/ui`, configured via `components.json`.

## Consequences

### Positive
- **Backend Agnostic:** We can swap the backend (Next.js API -> .NET) by only updating the `Service` and `Mapper` layers.
- **Discoverability:** Developers know exactly where to find code based on the filename and domain folder.
- **Type Safety:** Strict contracts prevent subtle bugs during data fetching.

### Negative
- **Boilerplate:** Requires creating more files (Model, DTO, Mapper) for simple entities.
- **Learning Curve:** React developers used to "move fast and break things" may find the discipline restrictive initially.