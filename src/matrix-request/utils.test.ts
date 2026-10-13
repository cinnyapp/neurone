/*
Cinny Project
Copyright 2024-present Ajay Bura
SPDX-License-Identifier: Apache-2.0
https://cinny.in

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { parseMatrixResp } from "./utils";

test("test parse matrix success response", async () => {
  const resultData = {
    roomId: "!XYZ",
  };
  const res1 = new Response(JSON.stringify(resultData), {
    status: 200,
  });

  const [err, result] = await parseMatrixResp<typeof resultData>(res1);
  expect(err).toBe(undefined);
  expect(result).toEqual(resultData);
});

test("test parse matrix error response", async () => {
  const errorData = {
    errcode: "XYZ",
    error: "xyz",
  };
  const res1 = new Response(JSON.stringify(errorData), {
    status: 400,
  });

  const [err, result] = await parseMatrixResp<undefined, typeof errorData>(
    res1,
  );
  expect(err).toEqual({
    url: "",
    status: 400,
    data: errorData,
  });
  expect(result).toBe(undefined);
});

test("test parse matrix bad json response", async () => {
  const res1 = new Response(`{"data": "some",}`, {
    status: 200,
  });

  try {
    await parseMatrixResp(res1);
    throw Error("Unexpected test output");
  } catch (err) {
    const error = err as SyntaxError;
    expect(error.name).toBe("SyntaxError");
  }
});
