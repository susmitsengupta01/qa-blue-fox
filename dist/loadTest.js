// src/tests/loadTest.ts
import http from "k6/http";
import { sleep, check } from "k6";

// src/utilities/thresholds.ts
var thresholds = {
  http_req_duration: ["p(95)<500"],
  // 95% of requests should complete within 5 seconds
  http_req_failed: ["rate<0.01"],
  // 1% of requests only can fail 
  http_req_waiting: ["p(95)<300"]
  // 95% of requests should have waiting less than 3 seconds
};

// src/tests/loadTest.ts
var options = {
  stages: [
    { duration: "30s", target: 10 },
    // ramp up
    { duration: "2m", target: 10 },
    // stable
    { duration: "30s", target: 0 }
    // ramp-down to zero users
  ],
  thresholds
};
function loadTest_default() {
  const res = http.get("https://automationexercise.com/api/productsList");
  check(res, { "200": (r) => r.status === 200 });
  sleep(1);
}
export {
  loadTest_default as default,
  options
};
