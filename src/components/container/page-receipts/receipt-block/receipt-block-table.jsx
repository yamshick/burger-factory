import { useDrag } from 'react-dnd'
const IngredientsGroup = ({id, name}) => {
    return <div >{name}</div>

}

export const ReceiptBlockTable = ({ groups }) => (
  <div style={{ marginTop: "5px" }}>
    {groups.map(({ id, name }) => (
      <IngredientsGroup key={id} name={name} />
    ))}
  </div>
);
