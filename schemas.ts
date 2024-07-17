export interface PlantSchema {
    id?: string;
    name: string;
    description?: string;
    image?: string;
    device_mac?: string;
    // Giá trị cảm biến
    temperature?: number;
    humidity?: number;
    moisture?: number;
    light?: number;
    // Trạng thái tưới cây
    water_button_state?: boolean;
    water_mode?: number;
    water_velocity?: number;
    water_usage?: number;
    manual_mode?: {
        server: number;
        device: number;
    }
    // Ngưỡng độ ẩm đất
    low_threshold?: number;
    high_threshold?: number;
    // Số liệu cảm biến trong 1 ngày
    daylogs?: DayLogs;
}

export interface DayLogs {
    [key: string]: DayLogSchema;
  }

export interface DayLogSchema {
    id: string;
    time: string;
    temperature: number | null;
    humidity: number | null;
    moisture: number | null;
    light: number | null;
}