import {Router, Request, Response} from "express"
import { createManyTestResults } from "../services/testResults.service";
import { createTestResult, getResults} from "../services/testResults.service";

const router = Router();

// Create a new test result
router.post("/", (req: Request, res: Response) => {

      const body = req.body;

  // ---- BULK insert ----
  if (Array.isArray(body)) {

    for (const item of body) {
      const {
        facilityId,
        productionLineId,
        cfuCount,
        location,
        timestamp
      } = item;

      if (
        !facilityId ||
        !productionLineId ||
        cfuCount === undefined ||
        !location ||
        !timestamp
      ) {
        return res.status(400).json({
          message: "Invalid item in request array"
        });
      }
    }

    const created = createManyTestResults(body);
    return res.status(201).json(created);
  }


// ---- Single insert ----
    const {
        facilityId,
        productionLineId,
        cfuCount,
        location,
        timestamp
    } = req.body;

    if (
        !facilityId ||
        !productionLineId ||
        cfuCount === undefined ||
        !location ||
        !timestamp
    ) {
        return res.status(400).json({ error: "Missing required fields" });
    }
 
    const created = createTestResult({
        facilityId,
        productionLineId,
        cfuCount,
        location,
        timestamp
    });
    res.status(201).json(created);
    });

    /**
   * Retrieve historical results
   * Filters:
   *  - facilityId
   *  - productionLineId
   */

    router.get("/", (req: Request, res: Response) => {
    const { facilityId, productionLineId } = req.query;

    const data  = getResults({
        facilityId: facilityId as string | undefined,
        productionLineId: productionLineId as string | undefined
    });

    res.json(data);
    });

export default router;
