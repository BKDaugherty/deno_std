// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
import { assertEquals } from "../assert/mod.ts";
import * as posix from "./posix/mod.ts";
import * as windows from "./windows/mod.ts";

Deno.test("posix.isAbsolute()", function () {
  assertEquals(posix.isAbsolute("/home/foo"), true);
  assertEquals(posix.isAbsolute("/home/foo/.."), true);
  assertEquals(posix.isAbsolute("bar/"), false);
  assertEquals(posix.isAbsolute("./baz"), false);
});

Deno.test("windows.isAbsolute()", function () {
  assertEquals(windows.isAbsolute("/"), true);
  assertEquals(windows.isAbsolute("//"), true);
  assertEquals(windows.isAbsolute("//server"), true);
  assertEquals(windows.isAbsolute("//server/file"), true);
  assertEquals(windows.isAbsolute("\\\\server\\file"), true);
  assertEquals(windows.isAbsolute("\\\\server"), true);
  assertEquals(windows.isAbsolute("\\\\"), true);
  assertEquals(windows.isAbsolute("c"), false);
  assertEquals(windows.isAbsolute("c:"), false);
  assertEquals(windows.isAbsolute("c:\\"), true);
  assertEquals(windows.isAbsolute("c:/"), true);
  assertEquals(windows.isAbsolute("c://"), true);
  assertEquals(windows.isAbsolute("C:/Users/"), true);
  assertEquals(windows.isAbsolute("C:\\Users\\"), true);
  assertEquals(windows.isAbsolute("C:cwd/another"), false);
  assertEquals(windows.isAbsolute("C:cwd\\another"), false);
  assertEquals(windows.isAbsolute("directory/directory"), false);
  assertEquals(windows.isAbsolute("directory\\directory"), false);
});
