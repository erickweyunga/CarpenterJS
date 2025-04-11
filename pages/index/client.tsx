import { useState } from "react";
import { createAction } from "../../carpenter/client";

interface PlusOneInput {
  number: number;
}

interface PlusOneOutput {
  result: number;
}

const plusOneAction = createAction<PlusOneInput, PlusOneOutput>("index/plus_one");

export default function Page() {
  const [one, setOne] = useState<number>(0);

  return (
    <div>
      <p>My first App</p>

      <button
        onClick={async () => {
          try {
            const result = await plusOneAction({ number: 1 });
            if (result.status === "error") {
              console.error(result.error);
            } else {
              setOne(result.result);
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Add one {one}
      </button>
    </div>
  );
}
