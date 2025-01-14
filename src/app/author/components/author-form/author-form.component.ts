import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { Router } from '@angular/router';
import { Author } from '../../models/author.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.scss'
})
export class AuthorFormComponent implements OnInit {

  @ViewChild('formError', { static: false }) formError: ElementRef | undefined;
  @ViewChild('formStart', { static: false }) formStart: ElementRef | undefined;

  @Input() idAuthor: string = "";

  authorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    this.authorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      dateOfBirth: ['', [Validators.required]],
      dateOfDeath: [''],
      nationality: ['', [Validators.required]],
    },
      {
        validators: this.dateRangeValidator
      })

      if(this.idAuthor){
        this.loadAuthorData();
      }
  }

  private dateRangeValidator(group: AbstractControl): { [key: string]: any } | null {
    const dateOfBirth = group.get('dateOfBirth')?.value;
    const dateOfDeath = group.get('dateOfDeath')?.value;

    if (dateOfBirth && dateOfDeath && new Date(dateOfDeath) <= new Date(dateOfBirth)) {
      return { invalidDateRange: 'La date de mort ne doit pas être antérieur à la date de naissance' };
    }
    return null;
  }

  private loadAuthorData() {
    this.authorService.getAuthorById(this.idAuthor).pipe(
      tap((author) => {
        console.log(author);
        this.authorForm.patchValue({
          ...author
        });
      })
    ).subscribe();
  }

  onSubmit() {
    if (this.formError) this.formError.nativeElement.style.display = 'none';
    if (this.authorForm.valid) {
      console.log(this.authorForm.value)
      let author : Author = {
        ...this.authorForm.value
      }
      this.saveAuthor(author, !!this.idAuthor);
    } else {
      this.authorForm.markAllAsTouched();
      if (this.formError) {
        this.formError.nativeElement.style.display = 'block';

        window.scrollTo(0, 0);
        if (this.formStart) this.formStart.nativeElement.focus();

      }
    }
  }

  private saveAuthor(author: Author, isUpdate: boolean): void {
    if (isUpdate) {
      this.authorService.updateAuthor(author, parseInt(this.idAuthor)).subscribe({
        next: (author: Author) => {
          alert('Auteur modifié avec succès.');
          if (author.id) { // Assurez-vous que l'ID est présent
            this.router.navigate(['/author', author.id]);
          } else {
            this.router.navigate(['/author']);
          }
        },
        error: (err) => {
          alert('Erreur lors de la modification');
        }
      });
    }
    else {
      this.authorService.createAuthor(author).subscribe({
        next: (author: Author) => {
          alert('Auteur ajouté avec succès.');
          if (author.id) { // Assurez-vous que l'ID est présent
            this.router.navigate(['/author', author.id]);
          } else {
            this.router.navigate(['/author']);
          }
        },
        error: (err) => {
          alert('Erreur lors de la création');
        }
      });
    }

  }
}
