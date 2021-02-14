import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';


interface Request{
  title: string;

  value: number;

  type: 'income' | 'outcome';

}



class CreateTransactionService{
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}:Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    console.log(balance['total'] - value)
    if(balance['total'] - value < 0 && type === 'outcome'){
      throw Error('Cannot withdraw money');
    }
    if(type === "income"){
      balance['income'] += value;
    }else{
      balance['outcome'] += value;
    }

    balance['total'] = balance['income'] - balance['outcome'];

      const transaction = this.transactionsRepository.create({title,type,value});
      return transaction;
  }
}

export default CreateTransactionService;
