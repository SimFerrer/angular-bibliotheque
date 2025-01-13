import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';
import { RouterLink } from '@angular/router';
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

  constructor(private editorService :EditorService){}

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

}
