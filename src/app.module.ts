import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [ArticleModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
