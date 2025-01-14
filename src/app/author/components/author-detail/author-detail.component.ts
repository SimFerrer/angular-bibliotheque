import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    RouterLink
  ],
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.scss'
})
export class AuthorDetailComponent implements OnInit{

  @Input() idAuthor: string = "";
  authorData !: Author;

  constructor(private authorService: AuthorService, private router :Router) { }

  ngOnInit(): void {
    this.loadAuthor();
  }

  private loadAuthor(): void {
    this.authorService.getAuthorById(this.idAuthor).subscribe(
      (author) => this.authorData = author
    );
  }

  deleteAuthor() {
    if (this.authorData.id) {
      if (confirm(`Êtes-vous sûr de vouloir supprimer l'auteur' "${this.authorData.name}" ?`)) {
        this.authorService.deleteAuthor(this.authorData.id).subscribe({
          next: () => {
            alert('Auteur supprimé avec succès.');
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
