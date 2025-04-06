import { CreateNoteDto } from './create-note.dto';
import { PartialType, PickType } from '@nestjs/swagger';

export class UpdateNoteDto extends PartialType(PickType(CreateNoteDto, ['title','content'] as const)) {
}
