import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  @ViewChild('imageViewer')
  viewer!: ImageViewerComponent;
 
  fullscreen: boolean = false;
  imageIndex: number = 0;
  url: string = "https://api.metalvyapar.com";
  // url: string = "https://api.metalvyapar.com";
 
  images: Array<string> = [
    'https://procodestore.com/wp-content/uploads/2021/03/164508084_271381191136191_654097929788476286_n.jpg',
    'https://freemediatools.com/img/profile.jpg'
  ];

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

}
