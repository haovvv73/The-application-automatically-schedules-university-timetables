import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-approval-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './approval-view.component.html',
  styleUrl: './approval-view.component.css'
})
export class ApprovalViewComponent {
  title = 'Thoi Khoa Bieu Lop Dai Tra'
}
