export class MarketOrder {
    account_id: number;
    duration: number;
    escrow: number;
    is_buy_order: boolean;
    is_corp: boolean;
    issued: Date;
    location_id: number;
    min_volume: number;
    order_id: number;
    price: number;
    range: string;
    region_id: number;
    state: string;
    type_id: number;
    volume_remain: number;
    volume_total: number;
}
