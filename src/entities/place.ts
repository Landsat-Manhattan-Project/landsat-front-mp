export interface Place {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  icon?: string;
  notify: boolean;
  startNotificationTime?: Date;
  endNotificationTime?: Date;
}
