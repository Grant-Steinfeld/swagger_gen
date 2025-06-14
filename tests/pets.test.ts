import request from 'supertest';
import app from '../src/app';
import { pets } from '../src/models/pets';

describe('Pet Store API', () => {
  describe('GET /api/pets', () => {
    it('should return all pets', async () => {
      const res = await request(app).get('/api/pets');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(pets.length);
    });
    it('should filter by type', async () => {
      const res = await request(app).get('/api/pets?type=dog');
      expect(res.status).toBe(200);
      expect((res.body as any[]).every((p: any) => p.type === 'dog')).toBe(true);
    });
    it('should filter by breed', async () => {
      const res = await request(app).get('/api/pets?breed=Basenji');
      expect(res.status).toBe(200);
      expect((res.body as any[]).every((p: any) => p.breed === 'Basenji')).toBe(true);
    });
  });

  describe('POST /api/pets', () => {
    it('should add a new pet', async () => {
      const newPet = { type: 'dog', breed: 'Basenji', name: 'TestDog', age: 1 };
      const res = await request(app).post('/api/pets').send(newPet);
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('TestDog');
    });
    it('should fail validation for missing fields', async () => {
      const res = await request(app).post('/api/pets').send({});
      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/pets/:id', () => {
    it('should update a pet', async () => {
      const res = await request(app).put('/api/pets/1').send({ type: 'dog', breed: 'Basenji', name: 'Updated', age: 2 });
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Updated');
    });
    it('should return 404 for non-existent pet', async () => {
      const res = await request(app).put('/api/pets/999').send({ type: 'dog', breed: 'Basenji', name: 'Nope', age: 2 });
      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /api/pets/:id', () => {
    it('should patch a pet', async () => {
      const res = await request(app).patch('/api/pets/2').send({ name: 'Patched' });
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Patched');
    });
    it('should return 404 for non-existent pet', async () => {
      const res = await request(app).patch('/api/pets/999').send({ name: 'Nope' });
      expect(res.status).toBe(404);
    });
  });
});
