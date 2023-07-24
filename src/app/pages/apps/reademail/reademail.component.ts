import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-reademail',
  templateUrl: './reademail.component.html',
  styleUrls: ['./reademail.component.scss']
})

/**
 * ReadEmail Component
 */
export class ReademailComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public Editor = ClassicEditor;
  contactData: any = [];
  email: any = {};
  emailId: any;
  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private UserService: UserProfileService,
    private router: Router
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.emailId = params['id'];
    })
  }
  getContactData() {
    this.UserService.getSupportData().subscribe((res: any) => {
      if (res.length == 0) {
        // this.buyerData.length = 0;
      } else {
        this.contactData = res;
        this.contactData.forEach((element: any) => {
          if (element.id == this.emailId) {
            this.email = element;
          }

        });
      }

    })
  }
  ngOnInit(): void {
    /**
     * BreadCrumb Set
     */
    this.breadCrumbItems = [
      { label: 'Email' },
      { label: 'Read Email', active: true }
    ];
    this.getContactData();
  }
  removeEmail(id: any) {
    this.UserService.removeEmail(id).subscribe((res: any) => {
      if (res.length == 0) {
      } else {
        this.router.navigate(['/apps/inbox']);
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

}
