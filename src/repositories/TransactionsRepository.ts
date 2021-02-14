import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction{
  title: string;

  value: number;

  type: 'income' | 'outcome';
}



class TransactionsRepository {
  private transactions: Transaction[];
  private balance:Balance;

  constructor() {

       this.transactions = [];
       this.balance = {income:0,outcome:0,total:0}


  }

  public all(): Transaction[] | null {
    return this.transactions;
  }

  public getBalance(): Balance {
      return this.balance;
  }

  public create({title,value,type}:CreateTransaction): Transaction {
    const transaction = new Transaction({title,value,type});

      this.transactions.push(transaction);


    return transaction;
  }
}

export default TransactionsRepository;
