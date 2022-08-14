const copyAttributeNames = ["list", "index", "indexKeyF"];

const createIndexKey = (key: string) => (el:object) => el[key];

export class BaseIndexedList {
  protected indexKeyF: Function;
   protected list: Array<any>;


   constructor(inputList: Array<any> , idsKey: string|Function, reversed: boolean) {
    if (inputList === undefined) return;

    this.indexKeyF = typeof idsKey === "function" ? idsKey : createIndexKey(idsKey);

    const list: Array<any>  = []
    this.list = list;
    this.reversed = reversed;

    for (let i of inputList) list.$add([i]);

    this.rebuildIndex();
  }

  get reversed():boolean {
    const { list } = this;
    return list.$add === list.push;
  }

  set reversed(value:boolean) {
    const { list } = this;

    list.$add = value ? list.unshift : list.push;
  }

  public rebuildIndex(): void {
    throw new Error("this method have to be redefined");
  }


  public getByKey(key: string): object {
    throw new Error("this method have to be redefined");
  }

  public at = (idx: number): object => {
    const {list} = this;
    const newIdx = idx < 0 ? list.length + idx : idx;
    const valueA =  list[newIdx];

    return valueA && valueA[0];
  };

  public  sliceIter = function* <T>(begin: number, end: number): Iterable<T> {
    const { list } = this;
    const listLength = list.length;

    begin = begin < 0 ? listLength + begin : begin;

    end =
      end === undefined
        ? listLength
        : end < 0
        ? listLength + end
        : end > listLength
        ? listLength
        : end;

    for (let idx = begin; idx < end; idx++) yield list[idx][0];
  };

  public slice = (begin: number, end: number): Array<any>  => {
    const gen = this.sliceIter(begin, end);
    return Array.from(gen);
  };

  public  some = (callable: (arg: Array<any>, index?: number ) => boolean): boolean => {
    let index = 0;

    for (let valueA of this.list) {
      let result = callable(valueA[0], index);
      if (result) return result;
      index += 1;
    }

    return false;
  };

  public copy = () => { // interface
    // @ts-ignore
    const Copy = new this.constructor();

    for (let item of copyAttributeNames) {
      Copy[item] = this[item];
    }

    return Copy;
  };

  get length(): number {
    return this.list.length;
  }

  public mapIter = function* <T>(callable: (arg: Array<any>, index?: number ) => any): Iterable<T> {
    let index = 0;

    for (let valueA of this.list) {
      yield callable(valueA[0], index);
      index += 1;
    }
  };

  public map = (callable: (arg: Array<any> ) => any): Array<any> => {
    const gen = this.mapIter(callable);
    return Array.from(gen);
  };

  public filterIter = function* <T>(callable: (arg: Array<any>, index?: number ) => any): Iterable<T> {
    let index = 0;

    for (let valueA of this.list) {
      let value = valueA[0];
      if (callable(value, index)) yield value;
      index += 1;
    }
  };

  public filter = (callable: (arg: Array<any> ) => any): Array<any> => {
    const gen = this.filterIter(callable);
    return Array.from(gen);
  };

  public forEach = (callable:(arg: Array<any>, index?: number ) => any): void=> {
    let index = 0;

    for (let valueA of this.list) {
      callable(valueA[0], index);
      index += 1;
    }
  };
 }

