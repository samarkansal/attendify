var request = require('supertest');

describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./index');
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('responds 401 to /generateQR with wrong JWT', generateQR = async () =>  {
    const jwt = 'dummyJWT';
    const payload = {meetindId: '123', userId: 'test@test.com'}
    const response = await request(server)
      .post('/api/qr/generateQR')
      .send(payload)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(401);
  });
});