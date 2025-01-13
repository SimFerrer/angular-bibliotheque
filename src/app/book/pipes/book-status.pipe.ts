import { Pipe, PipeTransform } from '@angular/core';
import { BookStatus, BookStatusLabels } from '../enums/book-status.enum';

@Pipe({
    name: 'bookStatusLabel',
    standalone: true
})
export class BookStatusPipe implements PipeTransform {

    transform(value: BookStatus): string {
        return BookStatusLabels[value] || value;
    }
}