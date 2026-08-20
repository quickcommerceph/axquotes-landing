# TypeScript

- Use `type`, not `interface`, for props and data shapes (`type Instrument`, `type ScrollRevealSectionProps`, etc.). The one existing exception is `SpecularButtonProps` in `SpecularButton.tsx`, which uses `interface` specifically because it `extends` another type — that's a reasonable reason to deviate, not a precedent to default to `interface`.
- Name props types `<ComponentName>Props`, declared immediately above the component. Keep them un-exported unless another file actually imports the type (e.g. `SpecularButtonVariant` is exported because other files build variant props).
