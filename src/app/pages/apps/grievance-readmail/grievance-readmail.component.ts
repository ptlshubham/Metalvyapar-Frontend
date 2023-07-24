import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-grievance-readmail',
  templateUrl: './grievance-readmail.component.html',
  styleUrls: ['./grievance-readmail.component.scss']
})
export class GrievanceReadmailComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  public Editor = ClassicEditor;
  constructor( private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  open(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

}
