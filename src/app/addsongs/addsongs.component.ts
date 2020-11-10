import { Component, OnInit } from '@angular/core';
import { SongsService } from '../songs.service';
import { Songs } from '../songs';
import { Genre } from '../genre';
import { stringify } from 'querystring';

@Component({
  selector: 'app-addsongs',
  templateUrl: './addsongs.component.html',
  styleUrls: ['./addsongs.component.scss']
})


export class AddsongsComponent implements OnInit {

  newSongs : string;
  duration : string;
  slow : string;
  remix: string;
  romance : string;
  genre : string;

  //genre: Genre[];

  constructor(private songsService: SongsService) { 

    this.newSongs = null;
    this.duration = null;
    this.slow = null;
    this.genre = "";


  }

  ngOnInit(): void {
    //this.songsService.fetchTodos();
  }

  onSave() {
    //this.genre;
    const { newSongs } = this; 
    const { duration } = this;
    const { slow } = this;
    const { remix } = this;
    const { romance } = this;
    
    
    if(slow){
      this.genre = this.genre+" Slow";
    }
    if(remix){
      this.genre = this.genre+" Remix";
    }
    if(romance){
      this.genre = this.genre+" Romance";
    }
    //const { genre } = this;

    //debugger;
    this.songsService.addSongs(newSongs,duration,this.genre)
      .subscribe((song: Songs) => {
        if (song.title) {
          this.newSongs = null; 
          this.duration = null; 
          this.remix = null; 
          this.romance = null; 
          this.slow = null; 
          this.genre = "";
          //this.songsService.songs.push(song); 
        }
      }); 
  }

}
