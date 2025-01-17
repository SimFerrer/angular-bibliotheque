import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Pagination } from '../../../core/models/pagination.model';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { BookStatusPipe } from '../../pipes/book-status.pipe';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  isAuthenticated$!: Observable<boolean>;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    
    this.isAuthenticated$ = this.authService.isAuthenticated();
    this.route.data.subscribe((data) => {
      const resolvedData = data['booksData'];
      if (resolvedData) {
        this.books = resolvedData.items;
        this.pagination = resolvedData.pagination;
      }
    });
  }

  loadBooks(page: number = 1): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge', 
    });

  }
}
