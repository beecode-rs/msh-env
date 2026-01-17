# PRD: Terminal Default Value Getter

## Introduction

Currently, the `default()` method in `EnvType` returns `this`, allowing chaining with `.required` or `.optional`. However, this creates a redundant API: if a default value is set, the result can never be `undefined`, making `.required` unnecessary and `.optional` misleading. This PRD addresses the issue by making `default()` a terminal operation that returns a value of type `T`, similar to how `.required` and `.optional` work.

## Goals

- Make `default()` a terminal operation that returns `T` (not `T | undefined`)
- Prevent chaining `.required` or `.optional` after `.default()`
- Simplify the API by having exactly three ways to end the chain: `.required`, `.optional`, or `.default(value)`
- Update documentation to reflect the new behavior with concise examples

## User Stories

### US-001: Convert default() from method to getter property
**Description:** As a developer, I need `default()` to be refactored as a terminal getter operation so it behaves consistently with `.required` and `.optional`.

**Acceptance Criteria:**
- [x] Change `default(defaultValue: T): this` method to `default(defaultValue: T): T` getter
- [x] Remove the return of `this` from default implementation
- [x] The getter returns the converted value or the default value (never undefined)
- [x] Calls `_validateAllowedValues()` before returning
- [x] Typecheck passes

### US-002: Update type definitions to prevent chaining after default
**Description:** As a TypeScript user, I need the type system to prevent me from calling `.required` or `.optional` after `.default()` so I avoid API misuse at compile time.

**Acceptance Criteria:**
- [x] `default(value: T)` returns type `T` (not `this`)
- [x] Attempting to call `.required` or `.optional` after `.default()` causes a TypeScript error
- [x] IntelliSense shows `default()` as a terminal operation
- [x] Typecheck passes

### US-003: Update unit tests for new default behavior
**Description:** As a maintainer, I need tests updated to reflect that `default()` is now a terminal operation.

**Acceptance Criteria:**
- [x] Remove tests that chain `.default().required` or `.default().optional`
- [x] Add tests verifying `default()` returns `T` directly
- [x] Add tests verifying `default()` validates allowed values
- [x] Add tests verifying `default()` uses fallback when env var is undefined
- [x] All tests pass
- [x] Typecheck passes

### US-004: Update README.md with new usage examples
**Description:** As a library user, I need the README updated to show the new terminal default behavior with 1-2 clear examples.

**Acceptance Criteria:**
- [ ] Update line 44 in README to show `.default('default-value')` without `.required`
- [ ] Add brief explanation (1-2 sentences) that `.default()` is a terminal operation returning required type
- [ ] Ensure examples show all three ways to end the chain: `.required`, `.optional`, `.default(value)`
- [ ] No excessive documentation added (keep it concise)
- [ ] Typecheck passes

### US-005: Run full test suite and fix any failures
**Description:** As a maintainer, I need to run the complete test suite after all changes to ensure nothing is broken and fix any test failures that arise.

**Acceptance Criteria:**
- [ ] Run `npm run test` in the env package
- [ ] All tests pass successfully
- [ ] Fix any test failures related to the default() changes
- [ ] Verify no unrelated tests were broken by the changes
- [ ] Typecheck passes

## Non-Goals

- No backward compatibility - this is a breaking change
- No deprecation warnings or migration path
- No changes to `.required` or `.optional` behavior
- No new validation logic beyond what exists
- No changes to allowed values API

## Technical Considerations

- This is a breaking change: users with `.default(x).required` in their code will need to update to `.default(x)`
- The implementation should reuse existing conversion and validation logic
- Testing should cover interaction with `.allowed()` since validation still applies
