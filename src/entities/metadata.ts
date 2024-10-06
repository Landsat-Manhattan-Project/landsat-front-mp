export interface Metadata {
  satellite: string;
  acquisition_date: string;
  acquisition_time: string;
  latitude: number;
  longitude: number;
  wrs_path: number;
  wrs_row: number;
  cloud_coverage: number;
  image_quality: string;
  sun_elevation: number;
  sun_azimuth: number;
  ground_sampling_distance: number;
  projection: string;
  processing_level: string;
  scene_id: string;
  orbit_number?: number;
  sensor_type: string;
  cloud_mask?: string;
  distance_km: number;
}
