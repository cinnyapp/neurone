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
