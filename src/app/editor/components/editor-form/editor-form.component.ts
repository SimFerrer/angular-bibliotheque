import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditorService } from '../../services/editor.service';
import { tap } from 'rxjs';
import { Editor } from '../../models/editor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './editor-form.component.html',
  styleUrl: './editor-form.component.scss'
})
export class EditorFormComponent implements OnInit {


  @ViewChild('formError', { static: false }) formError: ElementRef | undefined;
  @ViewChild('formStart', { static: false }) formStart: ElementRef | undefined;

  @Input() idEditor: string = "";

  editorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private editorService: EditorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    this.editorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
    })
    if (this.idEditor) {
      this.loadEditorData();
    }
  }

  private loadEditorData(): void {

    this.editorService.getById(this.idEditor).pipe(
      tap((editor) => {
        this.editorForm.patchValue(editor)
      })
    ).subscribe();
  }

  onSubmit() {
    if (this.formError) this.formError.nativeElement.style.display = 'none';
    if (this.editorForm.valid) {
      let editor: Editor = {
        ...this.editorForm.value
      }
      this.saveEditor(editor, !!this.idEditor);
    }
    else {
      this.editorForm.markAllAsTouched();
      if (this.formError) {
        this.formError.nativeElement.style.display = 'block';

        window.scrollTo(0, 0);
        if (this.formStart) this.formStart.nativeElement.focus();
      }
    }
  }


  private saveEditor(editor: Editor, isUpdate: boolean): void {
    if (isUpdate) {
      this.editorService.update(editor, parseInt(this.idEditor)).subscribe({
        next: (editor: Editor) => {
          alert('Editeur modifié avec succès.');
          this.router.navigate(['/editor']);
        },
        error: (err) => {
          alert('Erreur lors de la modification');
        }
      });
    }
    else {
      this.editorService.create(editor).subscribe({
        next: (editor: Editor) => {
          alert('Editor ajouté avec succès.');
          this.router.navigate(['/editor']);
        },
        error: (err) => {
          alert('Erreur lors de la création');
        }
      });
    }

  }
}
