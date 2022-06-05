import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import path from 'path';
import { Article } from './article.model';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticleFilterDto } from './dto/get-artilcle-filter.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  getArticles(@Query() getFilterDto: GetArticleFilterDto): Article[] {
    if (Object.keys(getFilterDto).length) {
      return this.articleService.getArticlesFilter(getFilterDto);
    } else {
      return this.articleService.getAllArticles();
    }
  }
  @Get('/:id')
  getArticleById(@Param('id') id: number): Article {
    return this.articleService.getArticleById(id);
  }
  @Post()
  createArticle(@Body() createArticleDto: CreateArticleDto): Article {
    return this.articleService.createArticle(createArticleDto);
  }
  @Delete('/:id')
  deleteArticle(@Param('id') id: number): void {
    return this.articleService.deleteArticle(id);
  }
  @Patch('/:id/title')
  updateArticleTitle(
    @Param('id') id: number,
    @Body('title') title: string,
  ): Article {
    return this.articleService.updateArticleTitle(id, title);
  }
}
