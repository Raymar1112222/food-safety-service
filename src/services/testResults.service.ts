import { create } from "domain";
import { TestResult } from "../models/testResults.model.js";
import { createDecipheriv, randomUUID } from "crypto";

const results: TestResult[] = [];

export function createTestResult(
  data: Omit<TestResult, "id">
): TestResult {

   // clear previous results
  results.length = 0;
  
  const newResult: TestResult = {
    id: randomUUID(),
    ...data
  };

  results.push(newResult);
  return newResult;
}


export function createManyTestResults(
  data: Omit<TestResult, "id">[]
): TestResult[] {

  // clear previous results
  results.length = 0;

  const created: TestResult[] = data.map(d => {
    const newResult: TestResult = {
      id: randomUUID(),
      ...d
    };

    results.push(newResult);
    return newResult;
  });

  return created;
}



export function getResults(filter?: {
  facilityId?: string;
  productionLineId?: string;
}): TestResult[] {

  let filtered = results;

  if (filter?.facilityId) {
    filtered = filtered.filter(r => r.facilityId === filter.facilityId);
  }

  if (filter?.productionLineId) {
    filtered = filtered.filter(
      r => r.productionLineId === filter.productionLineId
    );
  }

  return filtered;
}
