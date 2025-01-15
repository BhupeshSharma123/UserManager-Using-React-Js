import { useStore } from "../Store/Store";

function Demo() {
  const { countAdded, setCountAdded } = useStore();

  return (
    <div>
      <span>{countAdded}</span>
      <button onClick={() => setCountAdded()}>Click </button>
    </div>
  );
}

export default Demo;
