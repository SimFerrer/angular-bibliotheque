import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from '../../models/pagination.model';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() pagination: Pagination | null = null;
  @Output() pageChanged = new EventEmitter<number>();

  changePage(newPage: number): void {
    this.pageChanged.emit(newPage);
  }
}
