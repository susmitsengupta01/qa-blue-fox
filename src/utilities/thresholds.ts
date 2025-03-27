export const thresholds = {
    
    http_req_duration:['p(95)<500'],    // 95% of requests should complete within 5 seconds
    http_req_failed:['rate<0.01'],      // 1% of requests only can fail 
    http_req_waiting:['p(95)<300']       // 95% of requests should have waiting less than 3 seconds

}