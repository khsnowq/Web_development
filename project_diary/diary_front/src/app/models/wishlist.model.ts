export interface WishlistItem {
  id?: number;
  name: string;  // было title, теперь name
  category: 'material' | 'travel' | 'learning';  // исправлено на корректные категории
  status: 'pending' | 'in_progress' | 'done';  // исправлено на корректные статусы
  image?: string;
  link?: string;
}