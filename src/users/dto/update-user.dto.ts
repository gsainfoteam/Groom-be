import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// 사용자 정보 업데이트를 위한 DTO
// CreateUserDto의 모든 필드를 선택적(optional)으로 만듭니다.
export class UpdateUserDto extends PartialType(CreateUserDto) {} 