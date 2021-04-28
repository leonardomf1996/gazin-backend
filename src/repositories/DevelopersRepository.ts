import { EntityRepository, Repository } from 'typeorm';
import { Developer } from '../models/Developer';

@EntityRepository(Developer)
class DevelopersRepository extends Repository<Developer> {

}

export { DevelopersRepository };