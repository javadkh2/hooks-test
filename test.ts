import { withHooks } from "./lib";

function TestComponent({ start, name, hooks }: any) {
    const { setState } = hooks;
    const [counter, setCounter] = setState(start);
    console.log(name, counter);
    setTimeout(() => setCounter(counter + 1), 1000);
}
export const Test = withHooks(TestComponent)


const t1 = Test()({ name: "start", start: 0 })
const t2 = Test()({ name: "start", start: 1000 })

