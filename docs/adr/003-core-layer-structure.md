# ADR-003: Core Layer Structure (Interfaces Strategy)

- **Status:** Accepted
- **Date:** 2026-01-03
- **Deciders:** Lucas Nabesima
- **Technical Context:** Modular Architecture (ADR-001), TypeScript strict typing (ADR-002).

## Context and Problem Statement
In ADR-001, we established that the `core/` layer is responsible for "Pure Domain logic" and "Contracts."
However, we did not specify *how* to organize these contracts within the `core/` directory.
Without a standard, developers might place interfaces in `core/services`, `core/gateways`, `core/types`, or mixed with models, leading to inconsistent discovery and architectural drift.

We need a unified standard for where to define the **Ports** (Contracts) that our **Adapters** (Feature Modules) will implement.

## Decision Drivers
- **Clarity:** A developer should know exactly where to look for an abstraction.
- **Decoupling:** The directory structure should physically separate the "What" (Interface) from the "How" (Implementation).
- **Industry Standards:** The naming convention should be immediately recognizable to TypeScript/React developers.

## Considered Options
1. **`src/core/gateways/`**: Accurately describes data-access points but feels specific to external APIs.
2. **`src/core/services/`**: Conflicts mentally with the implementation layer (typically called "services" in Angular/NestJS).
3. **`src/core/interfaces/`**: Generic, widely adopted, and encompasses all types of contracts (Repositories, Services, Adapters).

## Decision Outcome
We chosen option **3: `src/core/interfaces/`**.

All dependency inversion contracts (the "Ports") will live in `src/core/interfaces/`.
- **Naming Convention:** Files shall be named `[domain]-service.interface.ts` (e.g., `menu-service.interface.ts`).
- **Export Name:** Interfaces shall be prefixed with `I` (e.g., `IMenuService`) to distinguish them from the concrete implementation classes/objects, aligning with C# conventions.

## Consequences
### Positive
- **Zero Ambiguity:** If it's an abstraction, it's in `interfaces/`.
- **Backend Alignment:** Prepares the mental model for Dependency Injection patterns common in .NET.
- **Circular Dependency Prevention:** By keeping interfaces in `core` and implementations in `modules`, we physically prevent the Domain from importing Feature logic.

### Negative
- **Verbosity:** We explicitly separate the interface definition from the model definition.
