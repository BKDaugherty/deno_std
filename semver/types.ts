// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

import { OPERATORS } from "./_constants.ts";

/**
 * The possible release types are used as an operator for the
 * increment function and as a result of the difference function.
 */
export type ReleaseType =
  | "pre"
  | "major"
  | "premajor"
  | "minor"
  | "preminor"
  | "patch"
  | "prepatch"
  | "prerelease";

/**
 * SemVer comparison operators.
 */
export type Operator = typeof OPERATORS[number];

/**
 * The style to use when formatting a SemVer object into a string
 * @deprecated (will be removed in 0.213.0)
 */
export type FormatStyle =
  | "full"
  | "release"
  | "primary"
  | "build"
  | "pre"
  | "patch"
  | "minor"
  | "major";

/**
 * The shape of a valid semantic version comparator
 * @example >=0.0.0
 */
export interface Comparator {
  operator: Operator;
  semver: SemVer;
}

/**
 * A SemVer object parsed into its constituent parts.
 */
export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease?: (string | number)[];
  build?: string[];
}

type SemVerRangeAnd = Comparator[];
type SemVerRangeOr = SemVerRangeAnd[];

/**
 * A type representing a semantic version range. The ranges consist of
 * a nested array, which represents a set of OR comparisons while the
 * inner array represents AND comparisons.
 */
export interface SemVerRange {
  // The outer array is OR while each inner array is AND
  ranges: SemVerRangeOr;
}
