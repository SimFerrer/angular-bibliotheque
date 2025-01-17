import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { BookStatusPipe } from '../../pipes/book-status.pipe';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    RouterLink,
    BookStatusPipe
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent implements OnInit {


  @Input() idBook: string = "";
  bookData !: Book;

  isAuthenticated$! : Observable<boolean>;

  constructor(private route: ActivatedRoute,private authService : AuthService,private bookService: BookService, private router :Router) { }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{
      const resolvedData = data['bookData'];
      if(resolvedData){
        this.bookData = resolvedData.book;
      }
    })
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }


  deleteBook() {
    if (this.bookData.id) {
      if (confirm(`Êtes-vous sûr de vouloir supprimer le livre "${this.bookData.title}" ?`)) {
        this.bookService.deleteBook(this.bookData.id).subscribe({
          next: () => {
            alert('Livre supprimé avec succès.');
            this.router.navigate(['/catalog'])
          },
          error: (err) => {
            alert('Erreur de dans la suppression');
          }
        })
      }
    }

  }

}
