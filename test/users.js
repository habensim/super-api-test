import supertest from 'supertest';

const request = supertest('https://gorest.co.in/public/v1/');

import { expect } from 'chai';

const TOKEN = 'a9c4d470331820768ccc0bf7b19abd4d4a6c1ba612829458b12a476c6820b63a';

describe('Users',() => {
    it('GET /users', () => {
        // request.get(`users?access-token=${TOKEN}`).end((err,res) => {
        //     expect(res.body.data).to.not.be.empty;
        //     done();
        // });
        return request.get(`users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).to.not.be.empty;
        });
    });

    it('GET /users/:id', () => {
        return request.get(`users/1?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data.id).to.be.eq(1);
        });
    });
    it('GET /users with query params', () => {
        const url = `users/?access-token=${TOKEN}page=5&gender=female&status=active`;

        return request.get(url).then((res) => {
            expect(res.body.data).to.not.be.empty;
            res.body.data.forEach((data) => {
                // expect(data.page).to.eq(5);
                expect(data.gender).to.eq('male');
                expect(data.status).to.eq('active');
            });
        });
    });
});