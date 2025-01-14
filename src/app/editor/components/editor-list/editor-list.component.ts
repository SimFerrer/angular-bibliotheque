import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Editor } from '../../models/editor.model';
import { Pagination } from '../../../core/models/pagination.model';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'app-editor-list',
  standalone: true,
  imports: [
    PaginationComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './editor-list.component.html',
  styleUrl: './editor-list.component.scss'
})
export class EditorListComponent implements OnInit {
  editors: Editor[] = [];
  pagination: Pagination | null = null;

  constructor(private editorService: EditorService, private router: Router) { }

  ngOnInit(): void {
    this.loadEditors();
  }

  loadEditors(page: number = 1): void {
    this.editorService.getAllEditors(page).subscribe((response) => {
      this.editors = response.items;
      this.pagination = response.pagination;
      console.log('Editors:', this.editors);
      console.log('Pagination:', this.pagination);
    });
  }

  deleteEditor(editorData: Editor) {
    if (editorData.id) {
      if (confirm(`Êtes-vous sûr de vouloir supprimer l'éditeur' "${editorData.name}" ?`)) {
        this.editorService.deleteEditor(editorData.id).subscribe({
          next: () => {
            alert('Editeur supprimé avec succès.');
            window.location.reload();
          },
          error: (err) => {
            alert('Erreur de dans la suppression');
          }
        })
      }
    }

  }

}
