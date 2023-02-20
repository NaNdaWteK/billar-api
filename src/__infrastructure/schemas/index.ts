import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class Healthz {
  @IsBoolean()
    status: string;
}

export class ValidationError {}

export class ValidationErrors {
  @IsString()
    message: string;
  @IsArray()
    errors: ValidationError[];
}

export class League {
  @IsOptional()
  @IsString()
    id: string;
  @IsString()
    name: string;
  @IsString()
    type: string;
  @IsOptional()
  @IsDate()
    createdAt: Date;
  @IsOptional()
  @IsDate()
    updatedAt: Date;
  @IsOptional()
  @IsDate()
    deletedAt: Date | null;
}

export class UpdateLeague {
  @IsOptional()
  @IsString()
    id: string;
  @IsOptional()
  @IsString()
    name: string;
  @IsOptional()
  @IsString()
    type: string;
  @IsOptional()
  @IsDate()
    createdAt: Date;
  @IsOptional()
  @IsDate()
    updatedAt: Date;
  @IsOptional()
  @IsDate()
    deletedAt: Date | null;
}

export class Player {
  @IsOptional()
  @IsString()
    id: string;
  @IsString()
    name: string;
  @IsString()
    email: string;
  @IsOptional()
  @IsDate()
    createdAt: Date;
  @IsOptional()
  @IsDate()
    updatedAt: Date;
  @IsOptional()
  @IsDate()
    deletedAt: Date | null;
}

export class UpdatePlayer {
  @IsOptional()
  @IsString()
    id: string;
  @IsOptional()
  @IsString()
    name: string;
  @IsOptional()
  @IsString()
    email?: string;
  @IsOptional()
  @IsDate()
    createdAt: Date;
  @IsOptional()
  @IsDate()
    updatedAt: Date;
  @IsOptional()
  @IsDate()
    deletedAt: Date | null;
}

export default validationMetadatasToSchemas({
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  classTransformerMetadataStorage: require('class-transformer/cjs/storage')
    .defaultMetadataStorage,
}) as Record<
  | 'Healthz'
  | 'League'
  | 'UpdateLeague'
  | 'Player'
  | 'UpdatePlayer'
  | 'ValidationErrors',
  import('openapi3-ts').SchemaObject
>;
