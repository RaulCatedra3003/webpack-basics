export const arrow = () => {
  let variable = 'change let';
  console.log('arrow function ok');
  variable = 'changed let';
  console.log(variable);
};

export class Dog {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `${this.name} say wouf!`;
  }
}
