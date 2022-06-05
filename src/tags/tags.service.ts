import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Article } from 'src/article/article.model';
import { ArticleService } from 'src/article/article.service';
import * as _ from 'lodash';

@Injectable()
export class TagsService {
  @Inject(ArticleService)
  private articleService: ArticleService;

  getAll(): Article[] {
    throw new NotFoundException(`No Route for /tags`);
  }

  getAllTagsByDate(getTagFilterDto): Article[] {
    const { tagName, tagDate } = getTagFilterDto;
    let tagItem = this.getAllTags(tagName).filter(
      (value) => value['date'].replace(/-/g, '') == tagDate,
    );
    //  tagItem = tagItem.filter(
    //   (value) => value['date'].replace(/-/g, '') == tagDate,
    //  );
    console.log(tagItem);
    const tagArray = [];
    _.forEach(tagItem, (value) => {
      if (value['date'].replace(/-/g, '') == tagDate) {
        _.forEach(value['tags'], (tagValue) => {
          if (tagValue != tagItem) tagArray.push(tagValue);
        });
        //}
      } else {
        console.log(value);
        console.log(tagDate);
        tagItem = tagItem.filter(
          (value) => value['date'].replace(/-/g, '') != tagDate,
        );
        //  tagName = tagName.filter(value => value['date'] != tagDate);
      }
    });
    let abc = {
      tag: tagName,
      count: tagItem.length,
      articles: _.map(tagItem, 'id'),
      related_tags: _.pull(_.uniq(_.flatten(_.map(tagItem, 'tags'))), tagName),
    };
    console.log(abc);
    if (tagItem.length == 0) {
      throw new NotFoundException(
        `No Details found  for the request tags [${tagName}] for Dated [${tagDate}]`,
      );
    } else {
      return tagItem;
    }
  }
  getAllTags(tagItem: string): Article[] {
    const tagArrayToDisplay = [];
    const tagArray = [];
    const articleList = this.articleService.getAllArticles();

    _.forEach(articleList, (value) => {
      if (
        !_.isEmpty(
          value['tags'].filter((str) =>
            str.toLowerCase().includes(tagItem.toLowerCase()),
          ),
        )
      ) {
        // if (value['tags'].includes(tagItem)) {
        tagArrayToDisplay.push(value);
        _.forEach(value['tags'], (tagValue) => {
          if (tagValue != tagItem) tagArray.push(tagValue);
        });
      }
    });

    if (tagArrayToDisplay.length == 0) {
      throw new NotFoundException(
        `No Details found  for the request tags [${tagItem}]`,
      );
    } else {
      return tagArrayToDisplay;
    }
  }
}
