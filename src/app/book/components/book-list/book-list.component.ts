import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Pagination } from '../../../core/models/pagination.model';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { BookStatusPipe } from '../../pipes/book-status.pipe';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    PaginationComponent,
    CommonModule,
    BookStatusPipe
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  pagination: Pagination | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(page: number = 1): void {
    this.bookService.getAllBooks(page).subscribe((response) => {
      this.books = response.items;
      this.pagination = response.pagination;
      console.log('Books:', this.books);
      console.log('Pagination:', this.pagination);
    });
  }
}
