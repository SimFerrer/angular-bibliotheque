import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { Pagination } from '../../../core/models/pagination.model';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router, private authorService: AuthorService) { }


  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resolvedData = data['authorsData'];
      if (resolvedData) {
        this.authors = resolvedData.items;
        this.pagination = resolvedData.pagination;
      }
    })
  }

  loadAuthors(page: number = 1): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }
}
