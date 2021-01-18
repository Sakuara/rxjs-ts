import { fromEvent, interval } from "rxjs";
import { map, take, tap } from "rxjs/operators";

const listEle = document.getElementById('list');
const listEle$ = fromEvent(listEle, 'click').pipe(map((e: MouseEvent) => ({ clientX: e.clientX })));
const source$ = interval(1000);
source$
    .pipe(take(5))
    .subscribe(res => console.log(res));
listEle$.subscribe(res => console.log(res));