import {Component, OnInit} from '@angular/core';

import {FileService} from '../services/file.service';
import {File} from '../shared/types';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  files: File[];

  constructor(
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
    this.fileService.getAll().subscribe(files => this.files = files);
  }

  saveVideo(file: Blob): void {
    this.fileService.save(file)
      .pipe(
        switchMap(() => this.fileService.getAll())
      )
      .subscribe(files => this.files = files);
  }

  delete(id: string): void {
    this.fileService.delete(id).pipe(
      switchMap(() => this.fileService.getAll())
    ).subscribe(files => this.files = files);
  }
}
