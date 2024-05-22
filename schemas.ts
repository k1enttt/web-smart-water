export interface Plant {
    id: string;
    name?: string;
    short_description?: string;
    temperature?: number;
    humidity?: number;
    moisture?: number;
    light?: number;
    is_watered?: boolean;
    is_automatic?: boolean;
    daylogs?: DayLog[];
}

export interface DayLog {
    id: string;
    time: string;
    temperature?: number;
    humidity?: number;
    moisture?: number;
    light?: number;
}