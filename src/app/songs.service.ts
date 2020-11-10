import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Songs } from './songs';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  url: string;
  songs : Songs[];
  httpOptions: object;

  constructor(private http: HttpClient,private snackBar: MatSnackBar) { 
    this.songs = [];
    this.url = 'http://localhost:3000/songs';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
  }

  
  fetchSongs() {
   
    this.http.get<Songs[]>(`${this.url}`)
      .pipe(
      )
      .subscribe((songs: Songs[]) => {
        this.songs = songs;
      });
  }

  addSongs(newSongs: string,duration: string,genre: string): Observable<Songs> {

    const songs: Songs = new Songs(newSongs, duration, genre);
    return this.http.post<Songs>(this.url, {
      title: songs.title,
      duration: songs.duration,
      genre: songs.genre,
      addeddate: songs.addeddate
    }, this.httpOptions)
      .pipe(
        tap((songs: Songs) => {
          this.songs.push(songs);
          this.snackBar.open('Song Saved Successfully', '', {
            duration: 5000,
          });
        }),       
      );
  }

  deletesong(id:number) { 
    const selectedsongs = this.songs.filter(Songs=>Songs.id ===id);
    const deletesongg = selectedsongs.map(selectedsongs => this.http.delete<Songs>(`${this.url}/${selectedsongs.id}`));
    forkJoin(deletesongg).subscribe((results) => {
    this.songs.filter(Songss=>Songss.id !=id)
    });
    this.fetchSongs();
  }


}
