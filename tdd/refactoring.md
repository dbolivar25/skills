# Refactor Candidates

After TDD cycle, look for:

- **Duplication** → Consolidate repeated policy when it is the same concept; similar syntax alone does not establish shared ownership.
- **Long methods** → Look for a coherent responsibility or a proof surface worth separating. Length alone does not justify private helpers; keep tests at the interface owning the behavior.
- **Shallow modules** → Combine or deepen
- **Feature envy** → Move logic to where data lives
- **Primitive obsession** → Introduce value objects
- **Existing code** the new code reveals as problematic
