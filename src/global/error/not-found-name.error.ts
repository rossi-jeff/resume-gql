import { NotFoundException } from '@nestjs/common';

export const NotFoundName = (entity: any, Name: string) => {
  return new NotFoundException(
    `${entity.name || entity} not found with Name: ${Name}`,
  );
};
