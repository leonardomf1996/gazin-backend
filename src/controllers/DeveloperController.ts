import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { DevelopersRepository } from '../repositories/DevelopersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class DeveloperController {
   async create(request: Request, response: Response) {
      const { nome, sexo, idade, hobby, datanascimento } = request.body;

      const schema = yup.object().shape({
         nome: yup.string().required('Nome obrigatório'),
         sexo: yup.string().required('Sexo obrigatório'),
         idade: yup.number().required('Idade obrigatória'),
         hobby: yup.string().required('Hobby obrigatório'),
         datanascimento: yup.date().required('Data obrigatória')
      });

      try {
         await schema.validate(request.body, {
            abortEarly: false
         });
      } catch (error) {
         throw new AppError(error);
      }

      const developersRepository = getCustomRepository(DevelopersRepository);

      const developer = developersRepository.create({
         nome,
         sexo,
         idade,
         hobby,
         datanascimento
      });

      await developersRepository.save(developer);

      return response.status(201).json(developer);
   }

   async show(request: Request, response: Response) {
      const developersRepository = getCustomRepository(DevelopersRepository);

      const all = await developersRepository.find();

      if (!all) {
         throw new AppError('Developers not found!', 404)
      }

      return response.status(200).json(all);
   }

   async findById(request: Request, response: Response) {
      const { id } = request.params;

      const developersRepository = getCustomRepository(DevelopersRepository);

      const findDev = await developersRepository.findOne(id);

      if (!findDev) {
         throw new AppError('Developer not found!', 404)
      }

      return response.status(200).json(findDev);
   }

   async update(request: Request, response: Response) {
      const { id } = request.params;
      const { nome, sexo, idade, hobby, datanascimento } = request.body;

      const developersRepository = getCustomRepository(DevelopersRepository);

      const findDev = await developersRepository.findOne(id);

      if (!findDev) {
         throw new AppError('Developer not found!', 400)
      }

      const schema = yup.object().shape({
         nome: yup.string().required('Nome obrigatório'),
         sexo: yup.string().required('Sexo obrigatório'),
         idade: yup.number().required('Idade obrigatória'),
         hobby: yup.string().required('Hobby obrigatório'),
         datanascimento: yup.date().required('Data obrigatória')
      });

      try {
         await schema.validate(request.body, {
            abortEarly: false
         });
      } catch (error) {
         throw new AppError(error);
      }

      const developer = {
         nome,
         sexo,
         idade,
         hobby,
         datanascimento
      }

      developersRepository.update(developer, findDev);

      return response.status(200).json(developer);
   }

   async delete(request: Request, response: Response) {
      const { id } = request.params;

      const developersRepository = getCustomRepository(DevelopersRepository);

      const findDev = await developersRepository.findOne(id);

      if (!findDev) {
         throw new AppError('Developer not found!', 400)
      }

      return response.status(204);
   }
}

export { DeveloperController };