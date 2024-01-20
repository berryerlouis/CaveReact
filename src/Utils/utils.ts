import { Bottle } from "../types";


export const jsonserver:string = "192.168.1.1";

export type CbGetBottles = (bottles: Bottle[] | undefined) => void
export type CbSetBottle = (success: boolean) => void

export function getBottles(cbGetBottles: CbGetBottles) {
    makeFetchGet<Bottle[]>('http://'+jsonserver+':3004/bottles/')
        .then(bottles => cbGetBottles(bottles))
}

export function updateBottle(bottle: Bottle, cbSetBottle?: CbSetBottle) {
    makeFetchPut<Bottle>('http://'+jsonserver+':3004/bottles/' + bottle.id, bottle)
        .then(isTrue => cbSetBottle && cbSetBottle(isTrue))
}

export function newBottle(bottle: Bottle, cbSetBottle: CbSetBottle) {
    makeFetchPost<Bottle>('http://'+jsonserver+':3004/bottles/', bottle)
        .then(isTrue => cbSetBottle(isTrue))
}
export function removeBottle(bottle: Bottle, cbSetBottle: CbSetBottle) {
    makeFetchDelete<Bottle>('http://'+jsonserver+':3004/bottles/' + bottle.id, bottle)
        .then(isTrue => cbSetBottle(isTrue))
}


//return { ...state, count: action.value };
const makeFetchGet = <TData>(url: string): Promise<TData> => {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Erreur makeFetchGet :', error));
}
const makeFetchPut = <TData>(url: string, data: TData): Promise<boolean> => {
    return fetch(url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => { return response.status === 200 })
        .catch(error => { console.error('Erreur makeFetchPut :', error); return false; });
}

const makeFetchPost = <TData>(url: string, data: TData): Promise<boolean> => {
    return fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => { return response.status === 200 })
        .catch(error => { console.error('Erreur makeFetchPost :', error); return false; });
}


const makeFetchDelete = <TData>(url: string, data: TData): Promise<boolean> => {
    return fetch(url,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => { return response.status === 200 })
        .catch(error => { console.error('Erreur makeFetchPost :', error); return false; });
}
