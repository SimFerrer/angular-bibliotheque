import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { Pagination } from '../../../core/models/pagination.model';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [
    PaginationComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent implements OnInit {

  authors: Author[] = [];
  pagination: Pagination | null = null;

  constructor (private authorService: AuthorService){}


  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(page: number = 1): void {
    this.authorService.getAllAuthors(page).subscribe((response) => {
      this.authors = response.items;
      this.pagination = response.pagination;
      console.log('Authors:', this.authors);
      console.log('Pagination:', this.pagination);
    });
  }
}
