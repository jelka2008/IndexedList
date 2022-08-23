
import { UniqIndexedList } from "../src/UniqIndexedList";

const testArray = [
  { key: "q", value: 1 },
  { key: "w", value: 2 },
  { key: "e", value: 3 },
];

const newElement = { key: "r", value: 4 }
const searchElementKey = "q"
const nonExistentElementKey = "a"
const deletedElementKey = "w"
const findIndeces = [-4, -2, -1, 0, 1, 2, 5]

const findElement = (compareKey: any) => testArray.find(item => item.key === compareKey)
const verificationCallback = (item: any) => item.value > 2;

const testIndexedList = new UniqIndexedList(testArray, (item) => item["key"], false)

describe("UniqIndexedList", () => {
 
  // // ------rebuildIndex-------------
  // test("it should create new indexes for element in indexedList and return ???", () => {
  //   testIndexedList.rebuildIndex();
  
  // // @ts-ignore
  // expect(input.index).toEqual(output.index);

  // // @ts-ignore
  // expect(input.list).toEqual(output.list);
  // })

  // ----at-------
  test("it should get element by index from indexedList", () => {
    findIndeces.forEach(index => {
      const input = testIndexedList.at(index);
      const output = testArray.at(index);

      expect(input).toEqual(output);
    })
  })

  // -----getByKey----
 test("it should get element by key from indexedList", () => {
    const input = testIndexedList.getByKey(searchElementKey);
    const output = findElement(searchElementKey);

    expect(input).toEqual(output);
  })

  test("it should get non-existent element by key from indexedList", () => {
    const input = testIndexedList.getByKey(nonExistentElementKey);
    const output = findElement(nonExistentElementKey);

    expect(input).toEqual(output);
  })

// --------getByKeyA--------------
  test("it should get Array with element by key from indexedList", () => {
    const input = testIndexedList.getByKeyA(searchElementKey);
    const output = [findElement(searchElementKey)];

    expect(input).toEqual(output);
  })

  test("it should get Array with non-existent element by key from indexedList", () => {
    const input = testIndexedList.getByKeyA(nonExistentElementKey);
    const output = findElement(nonExistentElementKey);

    expect(input).toEqual(output);
  })

// ---------hasKey--------
  test("it should check if there is a key in indexedList", () => {
    const input = testIndexedList.hasKey(searchElementKey);
    const output = true;

    expect(input).toEqual(output);
  })

  test("it should check is has non-existent key in indexedList ", () => {
    const input = testIndexedList.hasKey(nonExistentElementKey);
    const output = false;

    expect(input).toEqual(output);
  })

// --------deleteByKey-------------
  test("it should delete element with key from indexedList and return it's index", () => {
    const input = testIndexedList.deleteByKey(deletedElementKey);
    const output = testArray.findIndex(item => item.key === deletedElementKey);
    testArray.splice(output, 1);

    expect(input).toEqual(output);
  })

  // -------add---------
  test("it should add element to indexedList and checking if a new element exists ", () => {
    testIndexedList.add(newElement);
    testArray.push(newElement);

    const input = testIndexedList.hasKey(newElement.key);
    const output = true;

    expect(input).toEqual(output);
  })

  // ---------filter-and-inside-filterIter----------
  test("it should return Array from indexedList's elements for which the expression in the function is true ", () => {
    const input = testIndexedList.filter(verificationCallback);
    const output = testArray.filter(verificationCallback);

    expect(input).toEqual(output);
  })

  // ----------forEach-----------
  const forEachTestFunction = (target: any) => {
    const result = [];
  
    target.forEach((item: any) => {
      // callback
      result.push(item.key);
    })
  
    return result;
  }
  
  test("it should apply callback with all element from indexedList by method 'forEach'", () => {
    const input = forEachTestFunction(testArray);
    const output = forEachTestFunction(testIndexedList);

    expect(input).toEqual(output)
  })

  // ---------map-and-inside-mapIter------
  const mapTestFunction = (target: any) => {
    const result = [];

    target.map((item: any) => {
      // callback
      result.push(item.key);
    })

    return result;
  }

  test("it should apply callback with all element from indexedList by method 'map'", () => {
    const input = mapTestFunction(testArray);
    const output = mapTestFunction(testIndexedList);

    expect(input).toEqual(output);
  })

  // ----------length---------------
  test("it should count of element in indexedList by gettter 'lenght'", () => {
    const input = testIndexedList.length;
    const output = testArray.length;

    expect(input).toEqual(output);
  })

  // -------copy-------
  test("it should get shadow copy of indexedList", () => {
    const input = testIndexedList
    const output = testIndexedList.copy();

    // @ts-ignore
    expect(input.index).toEqual(output.index);

    // @ts-ignore
    expect(input.list).toEqual(output.list);
  })

  // -----------some--------
  test("it should if at least one element from indexList passes verificationCallback", () => {
    const input = testIndexedList.some(verificationCallback);
    const output = testArray.some(verificationCallback);

    expect(input).toEqual(output);
  })

  // ------slice-and-inside-sliceIter-------
  test("it should get Array from element of indexList between given indices", () => {
    const beginIndex = 1
    const endIndex= 3
    
    const input = testIndexedList.slice(beginIndex,endIndex);
    const output = testArray.slice(beginIndex,endIndex);

    expect(input).toEqual(output);
  })

// -----clear-------
  test("it should clear indexedList and make 0 in it's lenght", () => {
    testIndexedList.clear() // return nothing but change own data
    const output = testIndexedList.length === 0;

    expect(true).toEqual(output);
  })
})

