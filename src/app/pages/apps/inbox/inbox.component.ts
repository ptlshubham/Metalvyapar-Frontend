import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { emailData } from './data';
import { Email } from './inbox.model';
import { UserProfileService } from 'src/app/core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})

/***
 * Inbox Component
 */
export class InboxComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public Editor = ClassicEditor;
  emailData!: Array<Email>;
  contactData: any = [];
  emailIds: number[] = [];
  totalRecords = 0;
  startIndex = 1;
  endIndex = 15;
  page = 1;
  pageSize = 15;

  constructor(
    private modalService: NgbModal,
    private UserService: UserProfileService,
    public router: Router

  ) { }

  ngOnInit(): void {
    /**
     * Inbox data fetch
     */
    // this.emailData = emailData;
    this.getContactData();

    /**
     * BreadCrumb Set
     */
    this.breadCrumbItems = [
      { label: 'Email' },
      { label: 'Inbox', active: true }
    ];
  }
  getContactData() {
    this.UserService.getSupportData().subscribe((res: any) => {
      if (res.length == 0) {
        // this.buyerData.length = 0;
      } else {
        this.contactData = res;
        this.emailData = this.contactData;
        this.totalRecords = this.contactData.length;
      }

    })
  }
  openEmail(id: any) {
    this.UserService.emailMarkAsRead(id).subscribe((res: any) => {
      if (res.length == 0) {
      } else {
        this.router.navigate(['/read/' + id]);
      }

    })
  }
  /**
   * Open modal
   * @param content content
   */
  open(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  /**
   * Confirmation mail model
   */
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.deleteMail();
        Swal.fire('Deleted!', 'Mail has been deleted.', 'success');
      }
    });
  }

  /***
   * Delete Mail
   */
  deleteMail() {
    const found = this.emailData.some(r => this.emailIds.indexOf(r.id) >= 0);
    if (found) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.emailIds.length; i++) {
        const obj: any = this.emailData.find(o => o.id === this.emailIds[i]);
        this.UserService.removeEmail(obj.id).subscribe((res: any) => {
          if (res.length == 0) {
          } else {
            this.getContactData();
          }
        })
      }
    }
    this.emailIds = [];
  }

  multipleMarkAsRead() {
    const found = this.emailData.some(r => this.emailIds.indexOf(r.id) >= 0);
    if (found) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.emailIds.length; i++) {
        const obj: any = this.emailData.find(o => o.id === this.emailIds[i]);
        this.UserService.emailMarkAsRead(obj.id).subscribe((res: any) => {
          if (res.length == 0) {
          } else {
            this.getContactData();
          }
        })
      }
    }
    this.emailIds = [];
  }
  multipleMarkAsUnread() {
    const found = this.emailData.some(r => this.emailIds.indexOf(r.id) >= 0);
    if (found) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.emailIds.length; i++) {
        const obj: any = this.emailData.find(o => o.id === this.emailIds[i]);
        this.UserService.emailMarkAsUnread(obj.id).subscribe((res: any) => {
          if (res.length == 0) {
          } else {
            this.getContactData();
          }
        })
      }
    }
    this.emailIds = [];
  }

  /***
   * send mail select multiple mail
   */
  selectMail(event: any, id: any) {
    if (event.target.checked) {
      this.emailIds.push(id);
    } else {
      this.emailIds.splice(this.emailIds.indexOf(id), 1);
    }
  }

  /**
   * Handle on page click event
   */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize + 1;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.emailData = this.contactData.slice(this.startIndex - 1, this.endIndex - 1);
  }

}
