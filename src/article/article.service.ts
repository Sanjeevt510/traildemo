import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './article.model';
import { CreateArticleDto } from './dto/create-article.dto';
import { v4 as uuid } from 'uuid';
import { GetArticleFilterDto } from './dto/get-artilcle-filter.dto';

@Injectable()
export class ArticleService {
  private articles: Article[] = [];

  getAllArticles(): Article[] {
    return this.articles;
  }

  getArticlesFilter(getFilterDto: GetArticleFilterDto): Article[] {
    const { search } = getFilterDto;
    let articles = this.getAllArticles();

    if (search) {
      articles = articles.filter((article) => {
        if (article.title.includes(search) || article.body.includes(search)) {
          return true;
        }
        return false;
      });
    }
    if (articles.length === 0) {
      throw new NotFoundException(
        `Record for Search String ==>> [${search}] not found`,
      );
    }

    return articles;
  }

  deleteArticle(id: number): void {
    const found = this.getArticleById(id);
    this.articles = this.articles.filter((article) => article.id != id);
  }

  getArticleById(id: number): Article {
    const found = this.articles.find((article) => article.id == id);
    if (found) {
      return found;
    } else {
      throw new NotFoundException(`Article ID [${id}] not found`);
    }
  }

  createArticle(createArticleDto: CreateArticleDto): Article {
    const { id, title, date, body, tags } = createArticleDto;
    const article: Article = {
      id,
      title,
      date,
      body,
      tags,
      uuid: uuid(),
    };
    this.articles.push(article);
    return article;
  }
  updateArticleTitle(id: number, title: string) {
    const article = this.getArticleById(id);
    article.title = title;
    return article;
  }
}
