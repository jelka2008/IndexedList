import { BaseIndexedList } from "./BaseIndexedList";

export class BaseSingleIndex extends BaseIndexedList {
  protected index: Map<any,any>;

  public getByKeyA = (key: any): Array<any> => {
    return this.index.get(key);
  };

  public getByKey(key: any): any {
    const valueA = this.index.get(key);
    return valueA && valueA[0];
  }

  public hasKey = (key: any): boolean => {
    return this.index.has(key);
  };

  public clear = (): void => {
    this.list.length = 0;
    this.index.clear();
  };
}
