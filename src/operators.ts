import { from, of } from "rxjs";
import { map, mapTo, take } from "rxjs/operators";

from([1,2,3,4,5]).pipe(
    map(val => val*2),
    take(2)
).subscribe(res => console.log(res));

of('abcdefg').pipe(
    map(val => `${val}-2`)
).subscribe(res => console.log(res));

from([1,2,3,4,5]).pipe(
    mapTo('hi')
).subscribe(res => console.log(res));