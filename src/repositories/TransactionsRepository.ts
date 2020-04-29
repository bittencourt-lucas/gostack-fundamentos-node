import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public checkValidBalance(outcome: number): boolean {
    const balance = this.getBalance();

    if (balance.total < outcome) return false;
    return true;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (accumulator, currentTransaction) => {
        return currentTransaction.type === 'income'
          ? accumulator + currentTransaction.value
          : accumulator;
      },
      0,
    );

    const outcome = this.transactions.reduce(
      (accumulator, currentTransaction) => {
        return currentTransaction.type === 'outcome'
          ? accumulator + currentTransaction.value
          : accumulator;
      },
      0,
    );

    const total = income - outcome;

    const balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
