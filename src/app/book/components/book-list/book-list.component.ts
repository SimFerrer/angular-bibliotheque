import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Pagination } from '../../../core/models/pagination.model';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { BookStatusPipe } from '../../pipes/book-status.pipe';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    PaginationComponent,
    CommonModule,
    BookStatusPipe,
    RouterLink
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  pagination: Pagination | null = null;
  isAuthenticated$! :Observable<boolean>;

  constructor(private bookService: BookService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadBooks();
    this.isAuthenticated$ = this.authService.isAuthenticated();
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
