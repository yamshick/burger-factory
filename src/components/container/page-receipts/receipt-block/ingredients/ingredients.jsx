export const Ingredients = ({ ingredients }) => {
  console.log({ ingredients });
  return (
    <>
      {ingredients?.map(({ id, name, weight, calories, notes }) => (
        <div
          key={id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <input type={"checkbox"} />
          <div>{name}</div>
          <div>{weight}</div>
          <div>{calories}</div>
          <div>{notes}</div>
        </div>
      ))}
    </>
  );
};
