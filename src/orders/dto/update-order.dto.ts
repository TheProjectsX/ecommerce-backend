import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsIn(['pending', 'completed', 'canceled'], {
    message:
      'Status can only be one of following: pending, completed, canceled',
  })
  status: string;
}
