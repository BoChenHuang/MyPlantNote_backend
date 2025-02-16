import { CreateNoteDto } from './create-note.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateNoteDto extends PickType(CreateNoteDto, ['title','content'] as const) {
}
