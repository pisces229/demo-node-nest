import { ApiProperty } from '@nestjs/swagger';

export class DemoSwagger01InputModel {
  @ApiProperty({
    maxLength: 20,
    description: 'Todo 的標題',
  })
  title: string;
  @ApiProperty({
    maxLength: 200,
    description: '描述該 Todo 的細節',
  })
  description: string;
  @ApiProperty({
    description: '是否完成該 Todo',
  })
  completed: boolean;
}
export class DemoSwagger01OutputModel {
  result: string;
}
export class DemoSwagger02InputModel {
  @ApiProperty({
    maxLength: 20,
    description: 'Todo 的標題',
  })
  title: string;
  @ApiProperty({
    maxLength: 200,
    description: '描述該 Todo 的細節',
  })
  description: string;
  @ApiProperty({
    description: '是否完成該 Todo',
  })
  completed: boolean;

  @ApiProperty({
    type: [String],
    description: '賦予該 Todo 標籤',
  })
  tags: string[];
}
export class DemoSwagger02OutputModel {
  result: string;
}
