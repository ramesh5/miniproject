import { Component, OnInit } from '@angular/core';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-songslist',
  templateUrl: './songslist.component.html',
  styleUrls: ['./songslist.component.scss']
})
export class SongslistComponent implements OnInit {

  constructor(public songsService: SongsService) { }

  ngOnInit(): void {
    this.songsService.fetchSongs();
  }

  songdelete(id:number) {

    //debugger;
      
      this.songsService.deletesong(id);
      this.songsService.fetchSongs();
       
    }

}
