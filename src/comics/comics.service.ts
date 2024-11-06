import { Injectable } from '@nestjs/common';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ComicsService {

  constructor(private readonly databaseService: DatabaseService) {}

  create(createComicDto: CreateComicDto) {
    return 'This action adds a new comic';
  }

  async findAll() {
    try {
      const comics = await this.databaseService.comics.findMany({ take: 10 });
      return { message: true, data: comics };
    } catch (error) {
      return { message: false, data: error };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comic`;
  }

  update(id: number, updateComicDto: UpdateComicDto) {
    return `This action updates a #${id} comic`;
  }

  remove(id: number) {
    return `This action removes a #${id} comic`;
  }
}
