/*
Problem 6: Type-Safe Builder Pattern
Task: Implement a builder for a Query object with method chaining and compile-time validation.

Requirements:
Chain methods like .select(), .where(), .limit().

Enforce order: .select() must come first; .limit() must be last.

Final .build() returns the constructed query.

*/

interface SelectPhase {
  select(...fields: string[]): WherePhase;
}

interface WherePhase {
  where(condition: string): LimitPhase;
}

interface LimitPhase {
  limit(count: number): BuildStep;
}

interface BuildStep {
  build(): string;
}

class QueryBuilder implements SelectPhase, WherePhase, LimitPhase, BuildStep {
  private query: string;

  select(...fields: string[]): WherePhase {
    let args = fields?.toString();
    if (args.length > 0) {
      this.query = 'SELECT ' + args + ' ';
    } else {
      throw new Error('No fileds passed');
    }
    return this;
  }


  where(condition: string) : LimitPhase {
    if ()
  }
}

const query = new QueryBuilder()
  .select('name', 'age') // ✅
  .where('age > 25') // ✅
  .limit(10) // ✅
  .build();

new QueryBuilder().where('age > 25').select('name'); // ❌ Type error: invalid order
