import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../entity/Category";
import { Subcategory } from "../entity/Subcategory";
import { CategoryService } from "../service/CategoryService";
import { CategoryController } from "../controller/CategoryController";

@Module({
  imports:[
    TypeOrmModule.forFeature([Category,Subcategory])
  ],
  controllers:[CategoryController],
  providers:[CategoryService]
})
export class CategoryModule {
  
}