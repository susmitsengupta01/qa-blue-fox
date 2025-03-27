//Load Test on a Public API
import http from 'k6/http';
import { sleep, check } from 'k6';
import { thresholds } from '../utilities/thresholds';

export const options = {
    stages: [ 
        { duration: '30s', target: 10 }, // ramp up
        { duration: '2m', target: 10 }, // stable
        { duration: '30s', target: 0 }, // ramp-down to zero users
    ],
    thresholds: thresholds 
};

export default function() {
    const res = http.get('https://automationexercise.com/api/productsList');
    check(res, { '200': (r) => r.status === 200 });
    sleep(1);
}
