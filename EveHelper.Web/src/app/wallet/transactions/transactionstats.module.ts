import { Transaction } from "../../models/transaction";

export class Transactionstats {
    private _dailyStats;
    private _weeklyStats;
    private _monthlyStats;

    constructor(private tr: Transaction[]) {
        this.refresh();
    }

    refresh() {
        console.time("Calculating stats");
        this._dailyStats = this.gatherStats(this.tr.filter(f => new Date(Date.parse(f.date)) > this.now.day));
        this._weeklyStats = this.gatherStats(this.tr.filter(f => new Date(Date.parse(f.date)) > this.now.week));
        this._monthlyStats = this.gatherStats(this.tr.filter(f => new Date(Date.parse(f.date)) > this.now.month));
        console.timeEnd("Calculating stats");
    }

    gatherStats(transactions: Transaction[]) {
        let buy = transactions.filter(f => f.is_buy);
        let sell = transactions.filter(f => !f.is_buy);


        let ret = {
            buy: {
                transactions: buy,
                sum: buy.reduce((sum, transaction) => { let transAmount = transaction.quantity * transaction.unit_price; return sum + transAmount; }, 0) / 1000000,
                count: buy.length
            },
            sell: {
                transactions: sell,
                sum: sell.reduce((sum, transaction) => { let transAmount = transaction.quantity * transaction.unit_price; return sum + transAmount; }, 0) / 1000000,
                count: sell.length
            },
            diff: {
                sum: 0,
                percent: 0
            },
            revenue: 0,
            count: transactions.length
        };

        ret.diff.sum = ret.sell.sum - ret.buy.sum;
        ret.diff.percent = ret.sell.sum === 0 ? 0 : ret.sell.sum / ret.buy.sum;
        ret.revenue = ret.buy.sum + ret.sell.sum;
        return ret;
    }

    get revenue() {
        return this.tr.reduce((sum, transaction) => { let transAmount = transaction.quantity * transaction.unit_price; return sum + transAmount; }, 0) / 1000000;
    }

    private get now() {
        let now = new Date();
        var day = new Date(); day.setDate(now.getDate() - 1);
        var week = new Date(); week.setDate(now.getDate() - 7);
        var month = new Date(); month.setDate(now.getDate() - 30);
        return { day: day, week: week, month: month };
    }

    get Daily() {
        return this._dailyStats;
    }

    get Weekly() {
        return this._weeklyStats;
    }

    get Monthly() {
        return this._monthlyStats;
    }
}