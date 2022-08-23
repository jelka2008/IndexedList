import { BaseSingleIndex } from "./BaseSingleIndex";

export class UniqIndexedList extends BaseSingleIndex {

  public rebuildIndex(): void {
    const index = new Map();
    const { indexKeyF } = this;
    this.index = index;

    for (let valueA of this.list) {
      const item = valueA[0];
      const indexValue = indexKeyF(item)
      index.set(indexValue, valueA);
    }
  }

  public  add = (item: any): void => {
    const { index, indexKeyF } = this;
    const indexValue = indexKeyF(item)

    let valueA = index.get(indexValue);

    if (valueA === undefined) {
      valueA = [item];
      this.list.$add(valueA);
      index.set(indexValue, valueA);
    } else {
      valueA[0] = item;
    }
  };

  public deleteByKey = (key: any): any => {
    const valueA = this.index.get(key);

    if (valueA === undefined) return;

    const listIndex = this.list.indexOf(valueA);
    this.list.splice(listIndex, 1);
    this.index.delete(key);
    return listIndex;
  };
}
