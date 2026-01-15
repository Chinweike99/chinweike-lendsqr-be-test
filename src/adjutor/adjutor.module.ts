import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdjutorService } from './adjutor.service';

@Module({
  imports: [HttpModule],
  providers: [AdjutorService],
  exports: [AdjutorService],
})
export class AdjutorModule {}