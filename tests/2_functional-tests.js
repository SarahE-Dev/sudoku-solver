const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
        chai.request(server)
        .post('/api/solve')
        .send({ puzzle: '135762984946831257728459613694387125317524896582916347473298561861573492259641738' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.solution, '135762984946831257728459613694387125317524896582916347473298561861573492259641738');
            done();
        });
    });
    
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
        chai.request(server)
        .post('/api/solve')
        .send({})
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field missing');
            done();
        });
    });
    
    test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
        chai.request(server)
        .post('/api/solve')
        .send({ puzzle: '13576298494683125772845961369438712531752489658291634747329856186157349x259641738' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid characters in puzzle');
            done();
        });
    });
    
    test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
        chai.request(server)
        .post('/api/solve')
        .send({ puzzle: '13576298494683125772845961369438712531752489658291634747329856186157349225964173' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
            done();
        });
    });
    
    test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
        chai.request(server)
        .post('/api/solve')
        .send({ puzzle: '13576298494683125772845961369438712531752489$582916347473298561861573492259641730' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid characters in puzzle');
            done();
        });
    });

    test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
        chai.request(server)
        .post('/api/check')
        .send({ puzzle: '1.5762984946831257728459613694387125317524896582916347473298561861573492259641738', coordinate: 'A2', value: '3' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, true);
            done();
        });
    });

    test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
        chai.request(server)
        .post('/api/check')
        .send({ puzzle: '1.5762984946831257728459613694387125317524896582916347473298561861573492259641738', coordinate: 'A5', value: '2' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, false);
            assert.equal(res.body.conflict.length, 3);
            done();
        });
    });

    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
        chai.request(server)
        .post('/api/check')
        .send({ puzzle: '135762984946831257728459613694387125317524896582916347473298561861573492259641738', coordinate: 'A2', value: '1' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, false);
            assert.equal(res.body.conflict.length, 3);
            done();
        });
    });

    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
        chai.request(server)
        .post('/api/check')
        .send({ puzzle: '135762984946831257728459613694387125317524896582916347473298561861573492259641738', coordinate: 'A2', value: '6' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, false);
            assert.equal(res.body.conflict.length, 3);
            done();
        });
    });

    test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
        chai.request(server)
        .post('/api/check')
        .send({ coordinate: 'A2', value: '5' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
        });
    });

    test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
        chai.request(server)
        .post('/api/check')
        .send({ puzzle: '13576298494683125772845961369438712531752489658291634747329856186157349x259641738', coordinate: 'A2', value: '5' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid characters in puzzle');
            done();
        });
    });

    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
        chai.request(server)
        .post('/api/check')
        .send({ puzzle: '135762984946831257728459613694387125317524896582916347473298561861573492259641738', coordinate: 'A10', value: '5' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid coordinate');
            done();
        });
    });

    test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
        chai.request(server)
        .post('/api/check')
        .send({ puzzle: '135762984946831257728459613694387125317524896582916347473298561861573492259641738', coordinate: 'A2', value: '10' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid value');
            done();
        });
    });

    test('Check a puzzle placement with incorrect placement: POST request to /api/check', (done) => {
        chai.request(server)
        .post('/api/check')
        .send({ puzzle: '135762984946831257728459613694387125317524896582916347473298561861573492259641738', coordinate: 'A2', value: '5' })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, false);
            assert.equal(res.body.conflict.length, 3);
            done();
        });
    });

}

)
