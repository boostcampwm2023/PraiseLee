import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';
import { MAX_NAME_LENGTH } from '../../config/constants';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @MaxLength(MAX_NAME_LENGTH)
  @ApiProperty({
    example: 'new nickname',
    description: 'Updated nickname of the profile',
    required: false,
  })
  nickname?: string;

  @ApiProperty({
    example: 'new image.png',
    description: 'Updated Profile image file',
    required: false,
  })
  image?: string;

  uuid?: string;
}
