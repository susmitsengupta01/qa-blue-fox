//first load test
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 10 }, // ramp up
        { duration: '2m', target: 10 }, // stable
        { duration: '30s', target: 0 }, // ramp-down to zero users
    ],
    thresholds: {
        http_req_duration: ['p(99)<10000'] // 99% percent request should complete within 10s
    }    
};

export default function() {
    const res = http.get('https://automationexercise.com/api/productsList');
    check(res, { '200': (r) => r.status === 200 });
    sleep(1);
}


