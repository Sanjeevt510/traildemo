import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [ArticleModule],
  providers: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
