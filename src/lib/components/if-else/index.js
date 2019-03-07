
export default ({ condition, children: [If, Else] }) =>
  condition ? If : Else