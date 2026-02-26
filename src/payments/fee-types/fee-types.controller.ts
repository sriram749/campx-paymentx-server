import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CreateFeeTypeDto, GetFeeTypesDto } from '@contracts/payments/fee-types.dto';
import { MessagePattern } from '../../shared.config';
import { FeeTypesService } from './fee-types.service';

@Controller()
export class FeeTypesController {
  constructor(private readonly service: FeeTypesService) {}

  /**
   * GET /fee-types
   * Pattern: { service: 'paymentx', cmd: 'fee-types', action: 'find-all' }
   */
  @MessagePattern({ cmd: 'fee-types', action: 'find-all' })
  findAll(@Payload() data: { query: GetFeeTypesDto }) {
    return this.service.findAll(data.query);
  }

  /**
   * POST /fee-types
   * Pattern: { service: 'paymentx', cmd: 'fee-types', action: 'create' }
   */
  @MessagePattern({ cmd: 'fee-types', action: 'create' })
  create(@Payload() data: { body: CreateFeeTypeDto }) {
    return this.service.create(data.body);
  }
}
