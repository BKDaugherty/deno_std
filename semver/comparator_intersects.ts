// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
import type { Comparator } from "./types.ts";
import { gte } from "./gte.ts";
import { lte } from "./lte.ts";
import { comparatorMin } from "./comparator_min.ts";
import { comparatorMax } from "./comparator_max.ts";
/**
 * Returns true if the range of possible versions intersects with the other comparators set of possible versions
 * @param c0 The left side comparator
 * @param c1 The right side comparator
 * @returns True if any part of the comparators intersect
 *
 * @deprecated (will be removed in 0.214.0) Use {@linkcode rangeIntersects} instead.
 */
export function comparatorIntersects(
  c0: Comparator,
  c1: Comparator,
): boolean {
  const l0 = comparatorMin(c0.semver, c0.operator);
  const l1 = comparatorMax(c0.semver, c0.operator);
  const r0 = comparatorMin(c1.semver, c1.operator);
  const r1 = comparatorMax(c1.semver, c1.operator);

  // We calculate the min and max ranges of both comparators.
  // The minimum min is 0.0.0, the maximum max is ANY.
  //
  // Comparators with equality operators have the same min and max.
  //
  // We then check to see if the min's of either range falls within the span of the other range.
  //
  // A couple of intersection examples:
  // ```
  // l0 ---- l1
  //     r0 ---- r1
  // ```
  // ```
  //     l0 ---- l1
  // r0 ---- r1
  // ```
  // ```
  // l0 ------ l1
  //    r0--r1
  // ```
  // ```
  // l0 - l1
  // r0 - r1
  // ```
  //
  // non-intersection example
  // ```
  // l0 -- l1
  //          r0 -- r1
  // ```
  return (gte(l0, r0) && lte(l0, r1)) || (gte(r0, l0) && lte(r0, l1));
}
