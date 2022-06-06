import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Article } from 'src/article/article.model';
import { ArticleService } from 'src/article/article.service';
import * as _ from 'lodash';
import { Tags } from './tags.model';

@Injectable()
export class TagsService {
  @Inject(ArticleService)
  private articleService: ArticleService;

  getAll(): Article[] {
    throw new NotFoundException(`No Route for /tags`);
  }
  
  getAllTagsByDate(getTagFilterDto): Tags {
    const { tagName, tagDate } = getTagFilterDto;
    let tagItem = this.getAllTags(tagName).filter(
      (value) => value['date'].replace(/-/g, '') == tagDate,
    );
    const tags: Tags = {
      tag: tagName,
      count: tagItem.length,
      articles: this.articleList(tagItem,"id"),
      related_tags: this.relatedTagList(_.flatten(_.map(tagItem, 'tags')), tagName),
    };

    if (tagItem.length == 0) {
      throw new NotFoundException(
        `No Details found  for the request tags [${tagName}] for Dated [${tagDate}]`,
      );
    } else {
      return tags;
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

  articleList(itemList,id):string[]{
    itemList = _.orderBy(itemList, [id], ['desc']);
    return _.map(_.slice(itemList,0,10),id)
  } 

  relatedTagList(tagList,tagName):string[]{
    tagList = _.uniq(tagList);

    for(let tag in tagList) {
      if(_.toLower(tagList[tag]) == _.toLower(tagName)) {
        tagList.splice(tag, 1);
    }
  }
    return tagList
  }
  
}
