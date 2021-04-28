import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';
import { app } from '../app';

import '../database';

describe("Developers", async () => {
   beforeAll(async () => {
      const connection = await createConnection();
      await connection.runMigrations();
   });

   afterAll(async () => {
      const connection = getConnection();
      await connection.dropDatabase();
      await connection.close();
   });

   it("should be able to create a new dev", async () => {
      const response = await request(app).post('/developers')
         .send({
            nome: "Fulana",
            sexo: "F",
            idade: 34,
            hobby: "Dormir",
            datanascimento: 19870102
         });

      expect(response.status).toBe(201);
   });

   it('should be able to get all devs', async () => {
      const response = await request(app).get('/developers');

      expect(response.status).toBe(200);
   })

   it('should be able to get a dev from the id', async () => {

      const response = await request(app).get(`/developers/17ca0e85-897d-46ab-95db-b274da350e5d`);

      expect(response.status).toBe(200);
   });

   it('should be able to update a dev from the id', async () => {

      const response = await request(app).put(`/developers/17ca0e85-897d-46ab-95db-b274da350e5d`)
         .send({
            nome: "Fulana de Tal",
            sexo: "F",
            idade: 34,
            hobby: "Dormir até não aguentar mais",
            datanascimento: 19870102
         });

      expect(response.status).toBe(200);
   })

   it('should be able to delete a dev from the id', async () => {

      const response = await request(app).delete(`/developers/17ca0e85-897d-46ab-95db-b274da350e5d`);

      expect(response.status).toBe(204);
   })

});