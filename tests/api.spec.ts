import { test, expect, request } from "@playwright/test";
import { API_BASE_URL } from "./configs/constants";
import { CreateObjectRequest } from "./common/spec";

test.describe("REST API Tests", () => {
  let objectId: string;

  test("1) GET list of all objects", async ({ request }) => {
    const response = await request.get(API_BASE_URL);
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log("Objects List:", data);
    expect(Array.isArray(data)).toBeTruthy();
  });

  test("2) Create a new object using POST", async ({ request }) => {
    const objectData: CreateObjectRequest = {
      name: "Apple MacBook Pro 16",
      data: {},
    };

    const response = await request.post(API_BASE_URL, {
      data: objectData,
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log("Created Object:", responseBody);

    expect(responseBody).toHaveProperty("id");
    expect(responseBody.name).toBe(objectData.name);
    objectId = responseBody.id;
  });

  test("3) Retrieve the created object", async ({ request }) => {
    console.log("Waiting for object to be available...");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const response = await request.get(`${API_BASE_URL}/${objectId}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log("Fetched Object:", responseBody);
    expect(responseBody.id).toBe(objectId);
  });
  

  test("4) Update the object using PUT", async ({ request }) => {
    const updatedData = {
      name: "Updated Playwright Test Object",
      data: { description: "Updated with PUT request" },
    };

    const response = await request.put(`${API_BASE_URL}/${objectId}`, {
      data: updatedData,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log("Updated Object:", responseBody);
    expect(responseBody.name).toBe(updatedData.name);
  });

  test("5) Partially update the object using PATCH", async ({ request }) => {
    const patchResponse = await request.patch(`${API_BASE_URL}/${objectId}`, {
      data: {
        name: "Partially Updated Object",
      },
    });

    expect(patchResponse.ok()).toBeTruthy();

    const patchData = await patchResponse.json();
    console.log("Patched Object:", patchData);

    expect(patchData.name).toBe("Partially Updated Object");
  });

  test("6) Delete the object using DELETE", async ({ request }) => {
    const response = await request.delete(`${API_BASE_URL}/${objectId}`);
    expect(response.status()).toBe(200);
    console.log(`Deleted Object ID: ${objectId}`);

    const checkResponse = await request.get(`${API_BASE_URL}/${objectId}`);
    expect(checkResponse.status()).toBe(404);
  });
});
