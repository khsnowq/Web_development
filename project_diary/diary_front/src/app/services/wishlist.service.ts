import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WishlistItem } from '../models/wishlist.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  public apiUrl = 'http://127.0.0.1:8000/api/wishlist/';
  private mediaUrl = 'http://127.0.0.1:8000/media/';
  constructor(private http: HttpClient) {}

  getWishlist(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(this.apiUrl);
  }

  addItem(item: FormData): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(this.apiUrl, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
  getFullImageUrl(path: string): string {
    if (!path) return '';
    
    if (path.startsWith('http')) {
      return path;
    }
    
 
    if (path.startsWith('media/')) {
      return `${this.mediaUrl}${path.substring(6)}`;
    }
    
    return `${this.mediaUrl}${path}`;
  }
}

