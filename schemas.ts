export interface Plant {
    id: string;
    name: string;
    short_description: string;
    temperature: number;
    humidity: number;
    moisture: number;
    is_watered: boolean;
}