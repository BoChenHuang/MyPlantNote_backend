import { Body, Controller, Inject, Post, UseGuards, Request, BadRequestException, Get, Param, Delete, Patch } from '@nestjs/common';
import { PlantService } from './plant.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePlantDto } from './dto/create-plant.dto';
import { isValidObjectId } from 'mongoose';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Controller('plant')
export class PlantController {
    constructor(
        private readonly plantService: PlantService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('create')
    async create(@Body() createPlantDto: CreatePlantDto, @Request() req) {
        try {
            const userId: string = req.user.id;
            if(createPlantDto.images.length > 0) {
                for(const plantId of createPlantDto.images) {
                    if(!isValidObjectId(plantId))
                        throw new BadRequestException(`Id: ${plantId} invalid`);
                }
            }
            return await this.plantService.create(createPlantDto, userId);
        } catch (error) {
            this.logger.error(error.stack);
            throw error;
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string, @Request() req) {
        try {
            if (!isValidObjectId(id))
                throw new BadRequestException(`Id: ${id} is not valid.`);
            const userId: string = req.user.id;
            return await this.plantService.getById(id, userId);
        } catch (error) {
            this.logger.error(error.stack);
            throw error;
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatePlantDto: UpdatePlantDto, @Request() req) {
        try {
            const userId: string = req.user.id;

            if (!isValidObjectId(id) || !isValidObjectId(userId))
                throw new BadRequestException(`Id: ${id} is not valid.`);

            return await this.plantService.updateById(id, updatePlantDto, userId);
        } catch (error) {
            this.logger.error(error.stack);
            throw error;
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            if (!isValidObjectId(id))
                throw new BadRequestException(`Id: ${id} is not valid.`);

            return await this.plantService.deleteById(id);
        } catch (error) {
            this.logger.error(error.stack);
            throw error;
        }
    }
}
