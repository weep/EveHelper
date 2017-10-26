export class Transaction {
    constructor(
        public transaction_id: number,
        public date: string,
        public location_id: number,
        public type_id: number,
        public unit_price: number,
        public quantity: number,
        public client_id: number,
        public is_buy: boolean,
        public is_personal: boolean,
        public journal_ref_id: number
    ){}
}
