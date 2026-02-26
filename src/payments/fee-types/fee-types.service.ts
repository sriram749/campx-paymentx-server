import { Injectable } from '@nestjs/common';
import { CreateFeeTypeDto, GetFeeTypesDto, UpdateFeeTypeDto } from '@contracts/payments/fee-types.dto';

// In-memory store for POC purposes
const feeTypesStore: any[] = [];
let nextId = 1;

@Injectable()
export class FeeTypesService {
  findAll(query: GetFeeTypesDto) {
    let results = [...feeTypesStore];

    if (query.category) {
      results = results.filter((f) => f.category === query.category);
    }

    if (query.search) {
      results = results.filter((f) =>
        f.name.toLowerCase().includes(query.search.toLowerCase()),
      );
    }

    const skip = query.skip ?? 0;
    const limit = query.limit ?? 10;

    return {
      data: results.slice(skip, skip + limit),
      total: results.length,
    };
  }

  findById(id: string) {
    const feeType = feeTypesStore.find((f) => f.id === parseInt(id));
    if (!feeType) {
      throw new Error(`FeeType with id ${id} not found`);
    }
    return feeType;
  }

  create(dto: CreateFeeTypeDto) {
    const feeType = {
      id: nextId++,
      ...dto,
      isRefundable: dto.isRefundable ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    feeTypesStore.push(feeType);
    return feeType;
  }

  update(id: string, dto: UpdateFeeTypeDto) {
    const index = feeTypesStore.findIndex((f) => f.id === parseInt(id));
    if (index === -1) {
      throw new Error(`FeeType with id ${id} not found`);
    }
    feeTypesStore[index] = {
      ...feeTypesStore[index],
      ...dto,
      updatedAt: new Date(),
    };
    return feeTypesStore[index];
  }

  delete(id: string) {
    const index = feeTypesStore.findIndex((f) => f.id === parseInt(id));
    if (index === -1) {
      throw new Error(`FeeType with id ${id} not found`);
    }
    feeTypesStore.splice(index, 1);
    return { message: `FeeType ${id} deleted successfully` };
  }
}
