import { Component, OnInit } from '@angular/core';
import { WishlistItem } from '../models/wishlist.model';
import { WishlistService } from '../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  imports: [CommonModule, FormsModule],
})
export class WishlistComponent implements OnInit {
  wishlist: WishlistItem[] = [];
  newItem: any = {
    name: '',
    category: 'material',
    status: 'pending',
    link: ''
  };
  selectedFile: File | null = null;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.getWishlist().subscribe(data => this.wishlist = data);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addItem() {
    if (this.newItem.name.trim() && this.newItem.category) {
      const formData = new FormData();
      formData.append('name', this.newItem.name);
      formData.append('category', this.newItem.category);
      formData.append('status', this.newItem.status);
      if (this.newItem.link) formData.append('link', this.newItem.link);
      if (this.selectedFile) formData.append('image', this.selectedFile);

      this.wishlistService.addItem(formData).subscribe(() => {
        this.newItem = { name: '', category: 'material', status: 'pending', link: '' };
        this.selectedFile = null;
        this.loadWishlist();
      });
    }
  }

  deleteItem(id: number) {
    this.wishlistService.deleteItem(id).subscribe(() => this.loadWishlist());
  }

  getImageUrl(imagePath: string): string {

    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
  
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    
    return `${this.wishlistService.apiUrl}${cleanPath}`;
  }

  imageLoadError = false;

  handleImageError(event: Event) {
    this.imageLoadError = true;
    (event.target as HTMLImageElement).style.display = 'none';
  }

  getStatusText(status: string): string {
    const statusMap: {[key: string]: string} = {
      'pending': 'Ожидание',
      'in_progress': 'В процессе',
      'done': 'Выполнено'
    };
    return statusMap[status] || status;
  }
}