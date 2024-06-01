export interface Plant {
    id: string;
    name?: string;
    description?: string;
    // Giá trị cảm biến
    temperature?: number;
    humidity?: number;
    moisture?: number;
    light?: number;
    // Trạng thái tưới cây
    water_button_state?: boolean;
    water_mode?: number;
    // Ngưỡng độ ẩm đất
    low_threshold?: number;
    high_threshold?: number;
    // Số liệu cảm biến trong 1 ngày
    daylogs?: DayLog[];
}

export interface DayLog {
    id: string;
    date: string;
    temperature: number | null;
    humidity: number | null;
    moisture: number | null;
    light: number | null;
}