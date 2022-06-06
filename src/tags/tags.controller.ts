import { Controller, Get, Param } from '@nestjs/common';
import { Article } from 'src/article/article.model';
import { TagsService } from './tags.service';
import { GetTagFilterDto } from './dto/get-tag-filter.dto';
import { Tags } from './tags.model';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getAll(): Article[] {
    console.log('tagsfound');

    return this.tagsService.getAll();
  }

  @Get('/:tagName')
  getAllTags(@Param('tagName') tag: string): Article[] {
    return this.tagsService.getAllTags(tag);
  }

  @Get('/:tagName/:tagDate')
  getAllTagsByDate(@Param() getTagFilterDto: GetTagFilterDto): Tags {
    return this.tagsService.getAllTagsByDate(getTagFilterDto);
  }
}
