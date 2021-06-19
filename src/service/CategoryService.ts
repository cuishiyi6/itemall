import { Injectable } from '@nestjs/common';
import { Category } from '../entity/Category';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from '../entity/Subcategory';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
  ) {}

  //查询分类
  async query(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  //查询列表
  // eslint-disable-next-line @typescript-eslint/ban-types
  async querySubcategory(maitKey: Object): Promise<Subcategory[]> {
    return this.subcategoryRepository.find({ where: maitKey });
  }
}
