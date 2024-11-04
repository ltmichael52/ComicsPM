import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StoriesService {

  constructor(private readonly databaseService: DatabaseService) {}

  create(createStoryDto: CreateStoryDto) {
    return 'This action adds a new story';
  }

  async findAll() {
    try {
      const stories = await this.databaseService.stories.findMany({ take: 10 });
      return { message: true, data: stories };
    } catch (error) {
      return { message: false, data: error };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} story`;
  }

  update(id: number, updateStoryDto: UpdateStoryDto) {
    return `This action updates a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
