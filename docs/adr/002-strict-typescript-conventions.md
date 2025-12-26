# ADR-002: Strict TypeScript Interface vs Type Usage

- **Status:** Accepted
- **Date:** 2025-12-24
- **Deciders:** Lucas Nabesima
- **Technical Context:** TypeScript 5+, React, Enterprise Domain Modeling.

## Context and Problem Statement
TypeScript offers two similar constructs to define shapes: `interface` and `type`.
Without a strict rule, codebases often become inconsistent, with some entities defined as types and others as interfaces. This inconsistency:
1. Increases cognitive load (switching mental models).
2. Leads to "bikeshedding" discussions during code reviews.
3. Makes the codebase feel less like a cohesive "System" (C# style) and more like a loose collection of scripts.

We need a unified standard to decide when to use which.

## Decision Drivers
- **Consistency:** The codebase should look like it was written by one person.
- **Familiarity:** The style should align with Object-Oriented patterns (C# Classes) where applicable.
- **Performance:** Interfaces have marginal performance benefits in TS compiler (though negligible in small apps).
- **Extensibility:** Interfaces support declaration merging, which is standard for Entity definitions.

## Decision Outcome
We will follow the **"Entity-Interface, Value-Type"** rule.

### 1. Use `interface` for Objects and Entities
Any data structure that represents a "thing" (a Domain Model, a DTO, or a Component Prop definition) must use `interface`.
* **Why:** It closely mimics a `class` or `struct` in C#. It suggests an extendable, defined shape.

```typescript
// ✅ Correct
export interface Recipe {
  id: string;
  name: string;
}

// ❌ Incorrect
export type Recipe = {
  id: string;
  name: string;
}
```

### 2. Use type for Values, Unions, and Utilities
Any definition that represents a specific value constraint, a union of options, or a functional utility must use type.

- **Why:** Interfaces cannot handle unions or primitives.

```typescript
// ✅ Correct
export type DayOfWeek = 'sunday' | 'monday';
export type MealSlot = Recipe | null;

// ❌ Incorrect (Impossible with interface)
// interface DayOfWeek ...
```

## Consequences
### Positive
- Zero ambiguity: Developers know exactly which keyword to type without thinking.
- Cleaner Imports: Domain models are clearly distinguishable from utility types.
- C# Alignment: The code feels more structured to backend developers.
### Negative
- Verbosity: Interfaces are slightly more verbose than types for simple one-off objects.
