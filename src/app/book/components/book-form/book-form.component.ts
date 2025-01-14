import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookStatus, BookStatusLabels } from '../../enums/book-status.enum';
import { AuthorService } from '../../../author/services/author.service';
import { EditorService } from '../../../editor/services/editor.service';
import { Editor } from '../../../editor/models/editor.model';
import { Author } from '../../../author/models/author.model';
import { Book } from '../../models/book.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {

  @ViewChild('formError', { static: false }) formError: ElementRef | undefined;
  @ViewChild('formStart', { static: false }) formStart: ElementRef | undefined;



  @Input() idBook: string = "";

  bookForm!: FormGroup;

  editors: Editor[] = [];
  authors: Author[] = [];

  bookStatuses = Object.keys(BookStatus).map(key => ({
    value: BookStatus[key as keyof typeof BookStatus],
    label: BookStatusLabels[BookStatus[key as keyof typeof BookStatus]]
  }));

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private editorService: EditorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadAuthorsAndEditors();
    this.loadForm();


  }

  private loadForm(): void {

    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      isbn: ['', [Validators.required, Validators.pattern(/^(?:\d{10}|\d{13})$/)]],
      cover: ['', [Validators.required, Validators.pattern(/https?:\/\/(www\.)?[^\s]+/)]],
      plot: ['', [Validators.required, Validators.minLength(20)]],
      pageNumber: ['', [Validators.required, Validators.min(1)]],
      status: ['', Validators.required],
      editor: [null, Validators.required],
      authors: [[], [Validators.required, Validators.minLength(1)]],
    })

    if (this.idBook) {
      this.loadBookData();
    }

  }

  private loadBookData() {
    this.bookService.getBookById(this.idBook).pipe(
      tap((book) => {
        console.log(book);
        this.bookForm.patchValue({
          ...book,
          editor: book.editor?.id,
          authors: book.authors?.map((author: any) => author.id)
        });
      })
    ).subscribe();
  }

  private loadAuthorsAndEditors(): void {
    this.authorService.getAllAuthors().subscribe(authors => {
      this.authors = authors.items;
    });

    this.editorService.getAllEditors().subscribe(editors => {
      this.editors = editors.items;
    });
  }

  onSubmit() {
    if (this.formError) this.formError.nativeElement.style.display = 'none';
    if (this.bookForm.valid) {
      let book: Book = {
        ...this.bookForm.value,
        editor_id: this.bookForm.value.editor,
        author_ids: this.bookForm.value.authors,
        authors: [],
        editor: null
      }
      this.saveBook(book, !!this.idBook);
    } else {
      this.bookForm.markAllAsTouched();
      if (this.formError) {
        this.formError.nativeElement.style.display = 'block';

        window.scrollTo(0, 0);
        if (this.formStart) this.formStart.nativeElement.focus();

      }
    }
  }

  private saveBook(book: Book, isUpdate: boolean): void {
    if (isUpdate) {
      this.bookService.updateBook(book, parseInt(this.idBook)).subscribe({
        next: (book: Book) => {
          alert('Livre modifié avec succès.');
          if (book.id) { // Assurez-vous que l'ID est présent
            this.router.navigate(['/catalog', book.id]);
          } else {
            this.router.navigate(['/catalog']);
          }
        },
        error: (err) => {
          alert('Erreur lors de la modification');
        }
      });
    }
    else {
      this.bookService.createBook(book).subscribe({
        next: (book: Book) => {
          alert('Livre ajouté avec succès.');
          if (book.id) { // Assurez-vous que l'ID est présent
            this.router.navigate(['/catalog', book.id]);
          } else {
            this.router.navigate(['/catalog']);
          }
        },
        error: (err) => {
          alert('Erreur lors de la création');
        }
      });
    }

  }

}
