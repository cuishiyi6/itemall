import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Category } from "../entity/Category";
import { Subcategory } from "../entity/Subcategory";
import { CategoryService } from "../service/CategoryService";

@ApiTags('分类')
@Controller("category")
export class CategoryController{
  constructor(private  readonly service:CategoryService) {
  }
  @ApiOperation({
    summary: "查询分类"
  })
  @Get()
  async query(): Promise<Category[]> {
    return this.service.query();
  }

  @ApiOperation({
    summary: "查询分类列表"
  })
  @Get('sub')
  async querySubcategory(@Query() maitKey:{}): Promise<Subcategory[]> {
    return this.service.querySubcategory(maitKey);
  }
}