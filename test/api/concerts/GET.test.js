const server = require('../../../server');
const Concert = require('../../../models/concert.model');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
		const testConOne = new Concert({   
      id: 1,
      performer: 'John',
      genre: 'Pop',
      price: 12,
      day: 1,
      image: 'yxz.png'
    });
		await testConOne.save();

		const testConTwo = new Concert({
      id: 2,
      performer: 'Alexa',
      genre: 'Metal',
      price: 22,
      day: 1,
      image: 'yxz.png'
    });
		await testConTwo.save();

    const testConTre = new Concert({   
      id: 3,
      performer: 'John',
      genre: 'Pop',
      price: 17,
      day: 2,
      image: 'yxz.png'
    });
		await testConTre.save();

	});
  
  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(3);
    
    after(async () => {
      await Concert.deleteMany();
    });
	});
  
  it('/concerts/performer/:performer should return all concerts of a given artist', async () => {
    const res = await request(server).get('/api/concerts/performer/John');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(2);
    
    after(async () => {
      await Concert.deleteMany();
    });
	});

  it('/concerts/genre/:genre should return all concerts of a given genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Pop');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(2);
    // console.log(res.body)
    
    after(async () => {
      await Concert.deleteMany();
    });
	});
  
  it('/concerts/price/:price_min/:price_max should return all concerts with a price in the range price min - max', async () => {
    const res = await request(server).get('/api/concerts/price/10/20');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    
    after(async () => {
      await Concert.deleteMany();
    });
  });
  
  it('/concerts/price/day/:day should return all concerts of a given day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    
    after(async () => {
      await Concert.deleteMany();
    });
  });

});